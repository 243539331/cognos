import "server-only";
import { prisma } from "./prisma";
import type { RespuestaItem, ResultadoEvaluacion, DesempenoSesion, ObservacionCualitativaUI } from "@/content/types";

// Capa de acceso a datos sobre Prisma/PostgreSQL — reemplaza el store de
// localStorage (src/lib/store/sesionLocal.ts, retirado) ahora que el backend
// está conectado. Cada evaluación/sesión referencia instrumento@version o
// ejercicio@version de forma INMUTABLE (ver docs/05-modelo-datos.md), resuelto
// contra el catálogo sembrado por prisma/seed.ts.

export interface EvaluacionGuardada {
  id: string;
  instrumentoId: string;
  fecha: string;
  respuestas: RespuestaItem[];
  demografia: { edad?: number; escolaridad?: string };
  resultado: ResultadoEvaluacion;
}

export interface SesionGuardada {
  id: string;
  ejercicioId: string;
  fecha: string;
  nivel: number;
  desempeno: DesempenoSesion;
}

async function versionInstrumento(instrumentoId: string, version: string) {
  const v = await prisma.versionInstrumento.findUnique({
    where: { instrumentoId_version: { instrumentoId, version } },
  });
  if (!v) {
    throw new Error(
      `No se encontró ${instrumentoId}@${version} en el catálogo. ¿Falta correr "npm run db:seed"?`
    );
  }
  return v;
}

async function versionEjercicio(ejercicioId: string, version: string) {
  const v = await prisma.versionEjercicio.findUnique({
    where: { ejercicioId_version: { ejercicioId, version } },
  });
  if (!v) {
    throw new Error(
      `No se encontró ${ejercicioId}@${version} en el catálogo. ¿Falta correr "npm run db:seed"?`
    );
  }
  return v;
}

async function obtenerOCrearPlan(usuarioId: string, evaluacionId?: string) {
  const existente = await prisma.planEstimulacion.findFirst({
    where: { usuarioId },
    orderBy: { createdAt: "desc" },
  });
  if (existente) return existente;

  return prisma.planEstimulacion.create({
    data: { usuarioId, evaluacionId, objetivos: {} },
  });
}

export async function crearEvaluacion(
  usuarioId: string,
  datos: {
    instrumentoId: string;
    version: string;
    modo: "AUTO" | "ASISTIDA";
    respuestas: RespuestaItem[];
    demografia: { edad?: number; escolaridad?: string };
    resultado: ResultadoEvaluacion;
  }
): Promise<EvaluacionGuardada> {
  const v = await versionInstrumento(datos.instrumentoId, datos.version);

  const creada = await prisma.evaluacion.create({
    data: {
      usuarioId,
      versionInstrumentoId: v.id,
      modo: datos.modo,
      respuestas: datos.respuestas as unknown as object,
      puntajes: datos.resultado as unknown as object,
      bandaResultado: datos.resultado.bandaId,
      contexto: { demografia: datos.demografia },
    },
  });

  // Asegura que exista un plan de estimulación asociado (ver
  // docs/05-modelo-datos.md — PlanEstimulacion agrupa las sesiones de ejercicio).
  await obtenerOCrearPlan(usuarioId, creada.id);

  return {
    id: creada.id,
    instrumentoId: datos.instrumentoId,
    fecha: creada.fecha.toISOString(),
    respuestas: datos.respuestas,
    demografia: datos.demografia,
    resultado: datos.resultado,
  };
}

export async function listarEvaluaciones(usuarioId: string): Promise<EvaluacionGuardada[]> {
  const filas = await prisma.evaluacion.findMany({
    where: { usuarioId },
    include: { versionInstrumento: { include: { instrumento: true } } },
    orderBy: { fecha: "asc" },
  });

  return filas.map((fila) => ({
    id: fila.id,
    instrumentoId: fila.versionInstrumento.instrumentoId,
    fecha: fila.fecha.toISOString(),
    respuestas: fila.respuestas as unknown as RespuestaItem[],
    demografia: (fila.contexto as { demografia?: { edad?: number; escolaridad?: string } } | null)?.demografia ?? {},
    resultado: fila.puntajes as unknown as ResultadoEvaluacion,
  }));
}

export async function crearSesionEjercicio(
  usuarioId: string,
  datos: { ejercicioId: string; version: string; nivel: number; desempeno: DesempenoSesion }
): Promise<SesionGuardada> {
  const v = await versionEjercicio(datos.ejercicioId, datos.version);
  const plan = await obtenerOCrearPlan(usuarioId);

  const creada = await prisma.sesionEjercicio.create({
    data: {
      planId: plan.id,
      versionEjercicioId: v.id,
      nivel: datos.nivel,
      desempeno: datos.desempeno as unknown as object,
      completada: datos.desempeno.completada,
    },
  });

  return {
    id: creada.id,
    ejercicioId: datos.ejercicioId,
    fecha: creada.fecha.toISOString(),
    nivel: datos.nivel,
    desempeno: datos.desempeno,
  };
}

export async function listarSesiones(usuarioId: string, ejercicioId?: string): Promise<SesionGuardada[]> {
  const filas = await prisma.sesionEjercicio.findMany({
    where: {
      plan: { usuarioId },
      ...(ejercicioId ? { versionEjercicio: { ejercicioId } } : {}),
    },
    include: { versionEjercicio: true },
    orderBy: { fecha: "asc" },
  });

  return filas.map((fila) => ({
    id: fila.id,
    ejercicioId: fila.versionEjercicio.ejercicioId,
    fecha: fila.fecha.toISOString(),
    nivel: fila.nivel,
    desempeno: fila.desempeno as unknown as DesempenoSesion,
  }));
}

export async function crearObservacion(
  usuarioId: string,
  datos: Omit<ObservacionCualitativaUI, "fecha"> & { fecha?: string }
): Promise<ObservacionCualitativaUI> {
  // MVP sin vínculos multiusuario reales aún: la persona autoreporta
  // (usuarioId === autorId). Cuando exista el modelo de Vinculo conectado,
  // autorId pasará a ser el cuidador que efectivamente escribe la observación.
  const creada = await prisma.observacionCualitativa.create({
    data: {
      usuarioId,
      autorId: usuarioId,
      escalas: { sueno: datos.sueno, animo: datos.animo, autonomia: datos.autonomia },
      textoLibre: datos.textoLibre,
    },
  });

  return {
    fecha: creada.fecha.toISOString(),
    sueno: datos.sueno,
    animo: datos.animo,
    autonomia: datos.autonomia,
    textoLibre: datos.textoLibre,
  };
}

export async function listarObservaciones(usuarioId: string): Promise<ObservacionCualitativaUI[]> {
  const filas = await prisma.observacionCualitativa.findMany({
    where: { usuarioId },
    orderBy: { fecha: "asc" },
  });

  return filas.map((fila) => {
    const escalas = fila.escalas as { sueno: number; animo: number; autonomia: number };
    return {
      fecha: fila.fecha.toISOString(),
      sueno: escalas.sueno as ObservacionCualitativaUI["sueno"],
      animo: escalas.animo as ObservacionCualitativaUI["animo"],
      autonomia: escalas.autonomia as ObservacionCualitativaUI["autonomia"],
      textoLibre: fila.textoLibre ?? undefined,
    };
  });
}
