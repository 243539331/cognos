import fs from "node:fs";
import path from "node:path";
import yaml from "js-yaml";
import { InstrumentoSchema, tieneLicenciaVerificada as instrumentoLicenciado, type Instrumento } from "./schema/instrumento.schema";
import { EjercicioSchema, tieneLicenciaVerificada as ejercicioLicenciado, type Ejercicio } from "./schema/ejercicio.schema";

// Los instrumentos y ejercicios reales (Fototest, Mini-Cog, CST, etc.) requieren
// permiso escrito del autor antes de digitalizarse — ver docs/02-investigacion/01-instrumentos-evaluacion.md.
// Este loader solo carga contenido de content/, que hoy contiene ÚNICAMENTE
// ejemplos de marcador de posición (placeholder) sin valor clínico real.

const CONTENT_ROOT = path.join(process.cwd(), "content");

function leerYamlDeDirectorio<T>(
  subdirectorio: string,
  schema: { safeParse: (input: unknown) => { success: boolean; data?: T; error?: unknown } }
): T[] {
  const dir = path.join(CONTENT_ROOT, subdirectorio);
  if (!fs.existsSync(dir)) return [];

  const archivos = fs.readdirSync(dir).filter((f) => f.endsWith(".yaml") || f.endsWith(".yml"));
  const resultados: T[] = [];

  for (const archivo of archivos) {
    const ruta = path.join(dir, archivo);
    const crudo = fs.readFileSync(ruta, "utf-8");
    const parseado = yaml.load(crudo);
    const validacion = schema.safeParse(parseado);
    if (!validacion.success) {
      console.error(`[content] ${archivo} no pasó la validación de esquema:`, validacion.error);
      continue;
    }
    resultados.push(validacion.data as T);
  }
  return resultados;
}

/// Publicable = estado "publicado" Y licencia verificada. Esto es lo que el
/// motor bloquea (ver docs/08 esquema-instrumento.md §Reglas de validación).
export function listarInstrumentosPublicables(): Instrumento[] {
  return leerYamlDeDirectorio<Instrumento>("instrumentos", InstrumentoSchema).filter(
    (i) => i.estado === "publicado" && instrumentoLicenciado(i)
  );
}

export function obtenerInstrumento(id: string): Instrumento | undefined {
  return listarInstrumentosPublicables().find((i) => i.id === id);
}

export function listarEjerciciosPublicables(): Ejercicio[] {
  return leerYamlDeDirectorio<Ejercicio>("ejercicios", EjercicioSchema).filter(
    (e) => e.estado === "publicado" && ejercicioLicenciado(e)
  );
}

export function obtenerEjercicio(id: string): Ejercicio | undefined {
  return listarEjerciciosPublicables().find((e) => e.id === id);
}
