import { describe, it, expect } from "vitest";
import { calcularResultado, claseBanda } from "@/lib/instruments/engine";
import { obtenerInstrumento } from "@/content/loader";

describe("motor de instrumentos", () => {
  const instrumento = obtenerInstrumento("demo-orientacion");
  if (!instrumento) throw new Error("Fixture demo-orientacion no se cargó — revisar content/instrumentos/");

  it("puntúa todo correcto como 'sin-alerta'", () => {
    const resultado = calcularResultado(
      instrumento,
      [
        { itemId: "dia-semana", valor: 1 },
        { itemId: "estacion-ano", valor: 1 },
        { itemId: "lugar-actual", valor: 1 },
        { itemId: "recuerdo-tres-palabras", valor: 3 },
        { itemId: "informador-cambios", valor: 0 },
      ],
      { escolaridad: "4-8" }
    );
    expect(resultado.puntajeTotal).toBe(6);
    expect(resultado.bandaId).toBe("sin-alerta");
    expect(claseBanda(resultado.bandaId)).toBe("ok");
  });

  it("puntúa un desempeño bajo como 'derivar'", () => {
    const resultado = calcularResultado(
      instrumento,
      [
        { itemId: "dia-semana", valor: 0 },
        { itemId: "estacion-ano", valor: 0 },
        { itemId: "lugar-actual", valor: 1 },
        { itemId: "recuerdo-tres-palabras", valor: 0 },
        { itemId: "informador-cambios", valor: 1 },
      ],
      { escolaridad: "4-8" }
    );
    expect(resultado.puntajeTotal).toBe(2);
    expect(resultado.bandaId).toBe("derivar");
    expect(claseBanda(resultado.bandaId)).toBe("refer");
  });

  it("calcula subpuntajes por dominio", () => {
    const resultado = calcularResultado(
      instrumento,
      [
        { itemId: "dia-semana", valor: 1 },
        { itemId: "estacion-ano", valor: 1 },
        { itemId: "lugar-actual", valor: 1 },
        { itemId: "recuerdo-tres-palabras", valor: 2 },
        { itemId: "informador-cambios", valor: 0 },
      ],
      { escolaridad: ">8" }
    );
    const orientacion = resultado.puntajesPorDominio.find((p) => p.dominio === "orientacion");
    const memoria = resultado.puntajesPorDominio.find((p) => p.dominio === "memoria");
    expect(orientacion?.puntaje).toBe(3);
    expect(memoria?.puntaje).toBe(2);
  });

  it("usa el corte más conservador si no hay escolaridad", () => {
    const resultado = calcularResultado(instrumento, [
      { itemId: "dia-semana", valor: 1 },
      { itemId: "estacion-ano", valor: 1 },
      { itemId: "lugar-actual", valor: 1 },
      { itemId: "recuerdo-tres-palabras", valor: 2 },
      { itemId: "informador-cambios", valor: 0 },
    ]);
    // puntaje=5, corte más exigente=5 -> banda "sin-alerta" (5 >= 5)
    expect(resultado.bandaId).toBe("sin-alerta");
  });
});
