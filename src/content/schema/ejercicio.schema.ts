import { z } from "zod";

// Espejo tipado de docs/08-especificaciones-tecnicas/esquema-ejercicio.md.

export const LicenciaEjercicioSchema = z.object({
  tipo: z.string(),
  titular: z.string(),
  permiso_uso: z.boolean(),
  verificada_por: z.string(),
});

export const NivelEjercicioSchema = z.object({
  nivel: z.number(),
  descripcion: z.string().optional(),
  parametros: z.record(z.union([z.number(), z.boolean(), z.null()])),
});

export const AdaptacionSchema = z.object({
  regla_subir: z.string(),
  regla_bajar: z.string(),
});

export const AccesibilidadEjercicioSchema = z.object({
  instrucciones: z.object({
    texto: z.boolean(),
    audio: z.boolean(),
    ilustracion: z.boolean(),
  }),
  boton_escuchar_de_nuevo: z.boolean().default(true),
  entrada: z.array(z.enum(["toque", "voz"])).min(1),
  objetivo_tactil_min_px: z.number().min(44),
  tiempo_limite: z.string().default("ninguno"),
  lenguaje: z.enum(["lectura-facil", "lenguaje-claro"]).default("lectura-facil"),
});

export const RecursoContenidoSchema = z.object({
  tipo: z.enum(["imagen", "audio"]),
  ref: z.string(),
  alt: z.string().optional(),
});

export const ContenidoEjercicioSchema = z.object({
  tipo: z.enum(["emparejar", "ordenar", "nombrar", "recordar", "categorizar", "conversar"]),
  consigna: z.string(),
  recursos: z.array(RecursoContenidoSchema).default([]),
  offline: z.boolean().default(true),
  // Datos específicos del tipo de actividad (pares a emparejar, secuencia a ordenar, etc.)
  items: z.array(z.record(z.unknown())).default([]),
});

export const TelemetriaSchema = z.object({
  registra: z.array(z.string()).default(["aciertos", "errores", "tiempo_total_s", "nivel_alcanzado", "completada"]),
});

export const EjercicioSchema = z.object({
  id: z.string(),
  nombre: z.string(),
  version: z.string(),
  estado: z.enum(["borrador", "en-revision", "publicado", "retirado"]),
  idioma: z.string().default("es"),

  licencia: LicenciaEjercicioSchema,

  dominio_primario: z.string(),
  dominios_secundarios: z.array(z.string()).default([]),
  principio_cst: z.string().optional(),
  sin_fallo_explicito: z.boolean().default(true),

  niveles: z.array(NivelEjercicioSchema).min(1),
  adaptacion: AdaptacionSchema,
  accesibilidad: AccesibilidadEjercicioSchema,
  contenido: ContenidoEjercicioSchema,
  telemetria: TelemetriaSchema,
});

export type Ejercicio = z.infer<typeof EjercicioSchema>;
export type NivelEjercicio = z.infer<typeof NivelEjercicioSchema>;

export function tieneLicenciaVerificada(ejercicio: Ejercicio): boolean {
  return (
    ejercicio.licencia.permiso_uso === true &&
    ejercicio.licencia.verificada_por.trim().length > 0
  );
}
