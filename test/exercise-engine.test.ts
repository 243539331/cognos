import { describe, it, expect } from "vitest";
import { recomendarPlan, ajustarNivel, bancoEscaso } from "@/lib/exercises/engine";
import { obtenerEjercicio, listarEjerciciosPublicables } from "@/content/loader";
import type { DesempenoSesion, ResultadoEvaluacion } from "@/content/types";

const adaptacionDemo = {
  regla_subir: "2 sesiones consecutivas con aciertos >= 80%",
  regla_bajar: "aciertos < 50% en una sesión",
};

function sesion(aciertos: number, errores: number): DesempenoSesion {
  return { aciertos, errores, tiempoTotalS: 60, nivelAlcanzado: 1, completada: true };
}

describe("motor de ejercicios", () => {
  it("prioriza el dominio más débil del resultado", () => {
    const ejercicio = obtenerEjercicio("demo-emparejar-objetos");
    if (!ejercicio) throw new Error("Fixture demo-emparejar-objetos no se cargó");

    const resultadoMemoriaDebil: ResultadoEvaluacion = {
      puntajeTotal: 4,
      puntajesPorDominio: [
        { dominio: "memoria", puntaje: 0 },
        { dominio: "orientacion", puntaje: 3 },
      ],
      bandaId: "zona-atencion",
      bandaEtiqueta: "Conviene observar",
      mensajeUsuario: "",
    };

    const plan = recomendarPlan(resultadoMemoriaDebil, [ejercicio]);
    expect(plan[0].id).toBe("demo-emparejar-objetos");
  });

  it("no sube de nivel sin 2 sesiones consecutivas por encima del umbral", () => {
    const nivel = ajustarNivel(1, 3, [sesion(9, 1)], adaptacionDemo);
    expect(nivel).toBe(1);
  });

  it("sube de nivel tras 2 sesiones consecutivas >= 80%", () => {
    const nivel = ajustarNivel(1, 3, [sesion(9, 1), sesion(8, 2)], adaptacionDemo);
    expect(nivel).toBe(2);
  });

  it("no sube más allá del nivel máximo", () => {
    const nivel = ajustarNivel(3, 3, [sesion(9, 1), sesion(8, 2)], adaptacionDemo);
    expect(nivel).toBe(3);
  });

  it("baja de nivel si los aciertos caen bajo el umbral en una sesión", () => {
    const nivel = ajustarNivel(2, 3, [sesion(1, 9)], adaptacionDemo);
    expect(nivel).toBe(1);
  });

  it("no baja del nivel 1", () => {
    const nivel = ajustarNivel(1, 3, [sesion(1, 9)], adaptacionDemo);
    expect(nivel).toBe(1);
  });

  it("señala cuando el banco de ejercicios de un dominio es escaso", () => {
    expect(bancoEscaso([], 3)).toBe(true);
    expect(bancoEscaso([{} as never, {} as never, {} as never], 3)).toBe(false);
  });

  it("con varios dominios en el banco, ordena por el dominio más débil real", () => {
    // Ejercita el banco de contenido completo (memoria, atención, lenguaje) —
    // ver content/ejercicios/demo-emparejar-{objetos,rutina,categorias}.yaml.
    const ejercicios = listarEjerciciosPublicables();
    expect(ejercicios.length).toBeGreaterThanOrEqual(3);
    expect(new Set(ejercicios.map((e) => e.dominio_primario))).toEqual(
      new Set(["memoria", "atencion", "lenguaje"])
    );

    const resultadoAtencionDebil: ResultadoEvaluacion = {
      puntajeTotal: 3,
      puntajesPorDominio: [
        { dominio: "memoria", puntaje: 3 },
        { dominio: "atencion", puntaje: 0 },
      ],
      bandaId: "zona-atencion",
      bandaEtiqueta: "Conviene observar",
      mensajeUsuario: "",
    };

    const plan = recomendarPlan(resultadoAtencionDebil, ejercicios);
    expect(plan[0].dominio_primario).toBe("atencion");
  });
});
