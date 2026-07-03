import { test, expect, type Page } from "@playwright/test";

// Recorre el flujo completo del MVP (entrada → consentimiento → evaluación →
// resultado → ejercicios → sesión → panel) contra un backend real
// (PostgreSQL vía las rutas /api/*). Requiere migración + seed ya aplicados
// (ver README.md "Desarrollo local"). Cada test usa un contexto de navegador
// aislado, así que cada uno crea su propio usuario seudónimo.

async function elegirPrimeraOpcion(page: Page) {
  // Excluye el botón "🔊 Escuchar" (aria-label propio) y los de navegación.
  const opciones = page
    .locator('button:not([aria-label="Escuchar en voz alta"])')
    .filter({ hasNotText: /Continuar|Volver/i });
  await opciones.first().click();
}

// Las etiquetas visibles de las opciones de escolaridad (src/components/
// EvaluacionRunner.tsx) no repiten literalmente el código de valor del YAML
// (p. ej. ">8" se muestra como "Más de 8 años de estudio"), así que se mapean
// a un fragmento de texto distintivo real.
const ETIQUETA_ESCOLARIDAD: Record<string, RegExp> = {
  "<4 años": /Menos de 4/i,
  "4-8": /Entre 4 y 8/i,
  ">8": /Más de 8/i,
};

async function completarEvaluacion(page: Page, escolaridad: "<4 años" | "4-8" | ">8" = "4-8") {
  await page.goto("/");
  await page.getByText("Soy quien acompaña").click();
  await expect(page).toHaveURL(/\/consentimiento/);
  await expect(page.getByText(/no es un diagnóstico/i)).toBeVisible();
  await page.getByText("Entiendo y acepto").click();

  await expect(page).toHaveURL(/\/evaluacion/);
  await page.getByRole("button", { name: ETIQUETA_ESCOLARIDAD[escolaridad] }).click();
  await page.getByRole("button", { name: /continuar/i }).click();

  // Responder los 5 ítems del instrumento de demostración.
  for (let i = 0; i < 5; i++) {
    await elegirPrimeraOpcion(page);
    await page.getByRole("button", { name: /continuar/i }).click();
  }

  await expect(page).toHaveURL(/\/resultado/, { timeout: 15_000 });
}

test.describe("flujo completo del MVP", () => {
  test("entrada, consentimiento y encabezado son correctos", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Cognos/);
    await expect(page.getByText("¿Quién va a usar el portal hoy?")).toBeVisible();
    await expect(page.getByText("Soy la persona")).toBeVisible();
    await expect(page.getByText("Soy quien acompaña")).toBeVisible();
  });

  test("la evaluación llega a un resultado sin lenguaje diagnóstico ni puntajes crudos", async ({ page }) => {
    await completarEvaluacion(page);

    const texto = await page.locator("body").innerText();
    expect(texto).not.toMatch(/demencia|alzheimer/i);
    expect(texto).not.toMatch(/puntaje\s*total|\d\s*\/\s*\d+\s*puntos/i);

    await expect(page.getByText("Ver ejercicios sugeridos")).toBeVisible();
    await expect(page.getByText("Cómo buscar valoración")).toBeVisible();
  });

  test("un doble clic en el último ítem no duplica la evaluación guardada (regresión)", async ({ page }) => {
    await page.goto("/");
    await page.getByText("Soy la persona").click();
    await page.getByText("Entiendo y acepto").click();
    await page.getByRole("button", { name: /4 y 8/i }).click();
    await page.getByRole("button", { name: /continuar/i }).click();

    for (let i = 0; i < 4; i++) {
      await elegirPrimeraOpcion(page);
      await page.getByRole("button", { name: /continuar/i }).click();
    }
    // Último ítem: simula un doble toque real y casi simultáneo disparando dos
    // eventos "click" nativos en el mismo tick de JS, en vez de dos llamadas
    // .click() de Playwright (que compiten con la navegación real y no
    // reproducen la condición de carrera de un toque físico doble).
    await elegirPrimeraOpcion(page);
    await page.evaluate(() => {
      const boton = Array.from(document.querySelectorAll("button")).find((b) =>
        b.textContent?.includes("Continuar")
      ) as HTMLButtonElement | undefined;
      boton?.click();
      boton?.click();
    });

    await expect(page).toHaveURL(/\/resultado/, { timeout: 15_000 });
    await page.goto("/panel");
    await expect(page.getByText(/1 evaluación registrada en total/)).toBeVisible({ timeout: 10_000 });
  });

  test("la lista de ejercicios cubre varios dominios y una sesión se puede completar", async ({ page }) => {
    await page.goto("/ejercicios");
    await expect(page.getByText("Ejercicios")).toBeVisible();

    const tarjetas = page.locator("a[href^='/ejercicios/']");
    await expect(tarjetas).toHaveCount(3, { timeout: 10_000 });

    await tarjetas.first().click();
    // El orden de los ejercicios no está garantizado (alfabético por archivo),
    // así que no se asume cuál consigna específica aparece — solo que hay
    // una sesión interactiva cargada con dos columnas de fichas para emparejar.
    await expect(page.getByText(/⭐ Nivel 1/)).toBeVisible({ timeout: 10_000 });
    await expect(page.locator("main button:not([aria-label='Escuchar en voz alta'])")).toHaveCount(6);
  });

  test("el panel del cuidador carga tras una evaluación y acepta una observación", async ({ page }) => {
    await completarEvaluacion(page, ">8");
    await page.goto("/panel");

    await expect(page.getByText("Cognos — Panel del cuidador")).toBeVisible();
    await expect(page.getByText(/Aún no hay evaluaciones registradas\./)).toHaveCount(0);
    await expect(page.getByText(/evaluación registrada en total|evaluaciones registradas en total/)).toBeVisible();

    await page.locator("#panel-texto-libre").fill("Observación de prueba end-to-end");
    await page.getByRole("button", { name: "Guardar observación" }).click();
    await expect(page.getByText("Observación guardada.")).toBeVisible();
    await expect(page.getByText('"Observación de prueba end-to-end"')).toBeVisible();
  });
});
