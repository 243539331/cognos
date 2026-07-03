import { describe, it, expect } from "vitest";
import { listarInstrumentosPublicables, listarEjerciciosPublicables } from "@/content/loader";

describe("loader de contenido (smoke test del andamiaje)", () => {
  it("carga el instrumento de demostración y pasa el esquema", () => {
    const instrumentos = listarInstrumentosPublicables();
    expect(instrumentos.length).toBeGreaterThanOrEqual(1);
    expect(instrumentos[0].id).toBe("demo-orientacion");
  });

  it("carga los ejercicios de demostración y pasan el esquema", () => {
    // El orden de listarEjerciciosPublicables() no está garantizado (depende
    // del listado del sistema de archivos), así que se verifica presencia,
    // no posición — ver también test/exercise-engine.test.ts y e2e/.
    const ejercicios = listarEjerciciosPublicables();
    const ids = ejercicios.map((e) => e.id);
    expect(ids).toEqual(
      expect.arrayContaining(["demo-emparejar-objetos", "demo-emparejar-rutina", "demo-emparejar-categorias"])
    );
  });
});
