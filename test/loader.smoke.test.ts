import { describe, it, expect } from "vitest";
import { listarInstrumentosPublicables, listarEjerciciosPublicables } from "@/content/loader";

describe("loader de contenido (smoke test del andamiaje)", () => {
  it("carga el instrumento de demostración y pasa el esquema", () => {
    const instrumentos = listarInstrumentosPublicables();
    expect(instrumentos.length).toBeGreaterThanOrEqual(1);
    expect(instrumentos[0].id).toBe("demo-orientacion");
  });

  it("carga el ejercicio de demostración y pasa el esquema", () => {
    const ejercicios = listarEjerciciosPublicables();
    expect(ejercicios.length).toBeGreaterThanOrEqual(1);
    expect(ejercicios[0].id).toBe("demo-emparejar-objetos");
  });
});
