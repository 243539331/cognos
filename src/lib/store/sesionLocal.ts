"use client";

import type { DesempenoSesion, ObservacionCualitativaUI, ResultadoEvaluacion, RespuestaItem } from "@/content/types";

// Store local mínimo para conectar el flujo de demostración (evaluación → resultado
// → ejercicios → tablero) SIN backend todavía (ver docs/03-arquitectura.md: la
// aplicación real persiste esto en PostgreSQL vía Prisma — prisma/schema.prisma ya
// modela estas entidades). Guardar en localStorage también satisface el criterio de
// "guardado automático, tolera corte de red" del checklist de accesibilidad mientras
// no hay backend.

const CLAVE = "cognos-demo-state-v1";

export interface EvaluacionGuardada {
  instrumentoId: string;
  fecha: string;
  respuestas: RespuestaItem[];
  demografia: { edad?: number; escolaridad?: string };
  resultado: ResultadoEvaluacion;
}

export interface SesionGuardada {
  ejercicioId: string;
  fecha: string;
  nivel: number;
  desempeno: DesempenoSesion;
}

interface EstadoDemo {
  evaluaciones: EvaluacionGuardada[];
  sesiones: SesionGuardada[];
  observaciones: ObservacionCualitativaUI[];
}

function leerEstado(): EstadoDemo {
  if (typeof window === "undefined") return { evaluaciones: [], sesiones: [], observaciones: [] };
  try {
    const crudo = window.localStorage.getItem(CLAVE);
    if (!crudo) return { evaluaciones: [], sesiones: [], observaciones: [] };
    return JSON.parse(crudo) as EstadoDemo;
  } catch {
    return { evaluaciones: [], sesiones: [], observaciones: [] };
  }
}

function escribirEstado(estado: EstadoDemo) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(CLAVE, JSON.stringify(estado));
}

export function guardarEvaluacion(evaluacion: EvaluacionGuardada) {
  const estado = leerEstado();
  estado.evaluaciones.push(evaluacion);
  escribirEstado(estado);
}

export function obtenerUltimaEvaluacion(): EvaluacionGuardada | null {
  const { evaluaciones } = leerEstado();
  return evaluaciones.length > 0 ? evaluaciones[evaluaciones.length - 1] : null;
}

export function obtenerEvaluaciones(): EvaluacionGuardada[] {
  return leerEstado().evaluaciones;
}

export function guardarSesionEjercicio(sesion: SesionGuardada) {
  const estado = leerEstado();
  estado.sesiones.push(sesion);
  escribirEstado(estado);
}

export function obtenerHistorialSesiones(ejercicioId: string): SesionGuardada[] {
  return leerEstado().sesiones.filter((s) => s.ejercicioId === ejercicioId);
}

export function obtenerTodasLasSesiones(): SesionGuardada[] {
  return leerEstado().sesiones;
}

export function guardarObservacion(obs: ObservacionCualitativaUI) {
  const estado = leerEstado();
  estado.observaciones.push(obs);
  escribirEstado(estado);
}

export function obtenerObservaciones(): ObservacionCualitativaUI[] {
  return leerEstado().observaciones;
}

export function limpiarEstadoDemo() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(CLAVE);
}
