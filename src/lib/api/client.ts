"use client";

import type { RespuestaItem, ResultadoEvaluacion, DesempenoSesion, ObservacionCualitativaUI } from "@/content/types";

// Cliente del navegador para las rutas API (src/app/api/*), que a su vez usan
// src/lib/db/repositorio.ts (Prisma/PostgreSQL). Sustituye a src/lib/store/
// sesionLocal.ts ahora que hay backend real conectado — misma forma de datos,
// para minimizar cambios en las pantallas que ya lo usaban.

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

async function pedir<T>(input: string, init?: RequestInit): Promise<T> {
  const res = await fetch(input, {
    ...init,
    headers: { "Content-Type": "application/json", ...init?.headers },
  });
  if (!res.ok) {
    const cuerpo = await res.json().catch(() => ({}));
    throw new Error(cuerpo.error ?? `Error de red (${res.status}) al conectar con ${input}`);
  }
  return res.json() as Promise<T>;
}

export async function guardarEvaluacion(datos: {
  instrumentoId: string;
  version: string;
  modo: "AUTO" | "ASISTIDA";
  respuestas: RespuestaItem[];
  demografia: { edad?: number; escolaridad?: string };
  resultado: ResultadoEvaluacion;
}): Promise<EvaluacionGuardada> {
  const { evaluacion } = await pedir<{ evaluacion: EvaluacionGuardada }>("/api/evaluaciones", {
    method: "POST",
    body: JSON.stringify(datos),
  });
  return evaluacion;
}

export async function obtenerEvaluaciones(): Promise<EvaluacionGuardada[]> {
  const { evaluaciones } = await pedir<{ evaluaciones: EvaluacionGuardada[] }>("/api/evaluaciones");
  return evaluaciones;
}

export async function obtenerUltimaEvaluacion(): Promise<EvaluacionGuardada | null> {
  const evaluaciones = await obtenerEvaluaciones();
  return evaluaciones.length > 0 ? evaluaciones[evaluaciones.length - 1] : null;
}

export async function guardarSesionEjercicio(datos: {
  ejercicioId: string;
  version: string;
  nivel: number;
  desempeno: DesempenoSesion;
}): Promise<SesionGuardada> {
  const { sesion } = await pedir<{ sesion: SesionGuardada }>("/api/sesiones", {
    method: "POST",
    body: JSON.stringify(datos),
  });
  return sesion;
}

export async function obtenerTodasLasSesiones(): Promise<SesionGuardada[]> {
  const { sesiones } = await pedir<{ sesiones: SesionGuardada[] }>("/api/sesiones");
  return sesiones;
}

export async function obtenerHistorialSesiones(ejercicioId: string): Promise<SesionGuardada[]> {
  const { sesiones } = await pedir<{ sesiones: SesionGuardada[] }>(
    `/api/sesiones?ejercicioId=${encodeURIComponent(ejercicioId)}`
  );
  return sesiones;
}

export async function guardarObservacion(obs: ObservacionCualitativaUI): Promise<ObservacionCualitativaUI> {
  const { observacion } = await pedir<{ observacion: ObservacionCualitativaUI }>("/api/observaciones", {
    method: "POST",
    body: JSON.stringify(obs),
  });
  return observacion;
}

export async function obtenerObservaciones(): Promise<ObservacionCualitativaUI[]> {
  const { observaciones } = await pedir<{ observaciones: ObservacionCualitativaUI[] }>("/api/observaciones");
  return observaciones;
}
