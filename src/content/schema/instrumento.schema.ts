import { z } from "zod";

// Espejo tipado de docs/08-especificaciones-tecnicas/esquema-instrumento.md.
// Si el YAML no valida contra este esquema, el contenido no se carga —
// eso es intencional: un profesional clínico revisa el YAML, no el código.

export const LicenciaInstrumentoSchema = z.object({
  tipo: z.string(),
  titular: z.string(),
  permiso_digitalizacion: z.boolean(),
  verificada_por: z.string(),
  fecha_verificacion: z.string(),
  url_referencia: z.string().optional().default(""),
  atribucion_obligatoria: z.string().optional().default(""),
});

export const OpcionItemSchema = z.object({
  valor: z.number(),
  etiqueta: z.string(),
});

export const TipoItemSchema = z.enum([
  "opcion-multiple",
  "registro-verbal",
  "dibujo",
  "temporizado",
  "informador",
]);

export const ItemInstrumentoSchema = z.object({
  id: z.string(),
  tipo: TipoItemSchema,
  dominio: z.string(),
  enunciado: z.string(),
  audio: z.string().optional(),
  opciones: z.array(OpcionItemSchema).optional(),
  limite_tiempo_s: z.number().nullable().optional().default(null),
});

export const CortePuntuacionSchema = z.object({
  escolaridad: z.string(),
  punto_corte: z.number(),
});

export const PuntuacionSchema = z.object({
  metodo: z.enum(["suma", "ponderada", "algoritmo-nombrado"]),
  rango: z.object({ min: z.number(), max: z.number() }),
  por_dominio: z.boolean().default(true),
  cortes: z.array(CortePuntuacionSchema),
});

export const BandaResultadoSchema = z.object({
  id: z.string(),
  etiqueta: z.string(),
  regla: z.string(),
  mensaje_usuario: z.string(),
});

export const ResultadoSchema = z.object({
  bandas: z.array(BandaResultadoSchema).min(1),
});

export const InstrumentoSchema = z.object({
  id: z.string(),
  nombre: z.string(),
  version: z.string(),
  estado: z.enum(["borrador", "en-revision", "publicado", "retirado"]),
  idioma: z.string().default("es"),
  adaptacion_cultural: z.string().optional(),

  licencia: LicenciaInstrumentoSchema,

  modo: z.array(z.enum(["autoadministrado", "asistido"])).min(1),
  dominios: z.array(z.string()).min(1),
  duracion_estimada_min: z.number().optional(),
  requiere_materiales: z.boolean().default(false),
  independiente_de_lectoescritura: z.boolean().default(false),

  demografia_requerida: z.array(z.enum(["edad", "escolaridad"])).default([]),

  items: z.array(ItemInstrumentoSchema).min(1),
  puntuacion: PuntuacionSchema,
  resultado: ResultadoSchema,
});

export type Instrumento = z.infer<typeof InstrumentoSchema>;
export type ItemInstrumento = z.infer<typeof ItemInstrumentoSchema>;
export type BandaResultado = z.infer<typeof BandaResultadoSchema>;

/// Regla bloqueante (ver docs/08 esquema-instrumento.md §Reglas de validación #2):
/// sin licencia verificada, un instrumento no puede estar "publicado".
export function tieneLicenciaVerificada(instrumento: Instrumento): boolean {
  return (
    instrumento.licencia.permiso_digitalizacion === true &&
    instrumento.licencia.verificada_por.trim().length > 0
  );
}
