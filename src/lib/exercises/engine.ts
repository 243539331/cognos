import type { Ejercicio, DesempenoSesion, ResultadoEvaluacion } from "@/content/types";

/// Ordena la biblioteca de ejercicios disponible priorizando el dominio más débil
/// del resultado de la última evaluación (ver docs/03-arquitectura.md
/// §"Motor de recomendación (especificación, no código)").
export function recomendarPlan(resultado: ResultadoEvaluacion, ejerciciosDisponibles: Ejercicio[]): Ejercicio[] {
  const dominiosPorDebilidad = [...resultado.puntajesPorDominio]
    .sort((a, b) => a.puntaje - b.puntaje)
    .map((p) => p.dominio);

  function prioridad(ejercicio: Ejercicio): number {
    const idxPrimario = dominiosPorDebilidad.indexOf(ejercicio.dominio_primario);
    if (idxPrimario !== -1) return idxPrimario;

    const idxSecundario = Math.min(
      ...ejercicio.dominios_secundarios.map((d) => {
        const idx = dominiosPorDebilidad.indexOf(d);
        return idx === -1 ? Number.POSITIVE_INFINITY : idx + dominiosPorDebilidad.length;
      })
    );
    return Number.isFinite(idxSecundario) ? idxSecundario : Number.POSITIVE_INFINITY;
  }

  return [...ejerciciosDisponibles].sort((a, b) => prioridad(a) - prioridad(b));
}

function porcentajeAciertos(sesion: DesempenoSesion): number {
  const total = sesion.aciertos + sesion.errores;
  if (total === 0) return 0;
  return (sesion.aciertos / total) * 100;
}

const PATRON_SUBIR = /^(\d+)\s+sesiones\s+consecutivas\s+con\s+aciertos\s*>=\s*(\d+)%$/i;
const PATRON_BAJAR = /^aciertos\s*<\s*(\d+)%\s+en\s+una\s+sesi[oó]n$/i;

/// Sube o baja de nivel según las reglas declarativas del ejercicio
/// (docs/08-especificaciones-tecnicas/esquema-ejercicio.md §Dificultad y adaptación).
/// `historial` incluye la sesión más reciente al final.
export function ajustarNivel(
  nivelActual: number,
  nivelMaximo: number,
  historial: DesempenoSesion[],
  adaptacion: { regla_subir: string; regla_bajar: string }
): number {
  if (historial.length === 0) return nivelActual;
  const ultima = historial[historial.length - 1];

  const bajar = PATRON_BAJAR.exec(adaptacion.regla_bajar.trim());
  if (bajar) {
    const umbral = Number(bajar[1]);
    if (porcentajeAciertos(ultima) < umbral) {
      return Math.max(1, nivelActual - 1);
    }
  }

  const subir = PATRON_SUBIR.exec(adaptacion.regla_subir.trim());
  if (subir) {
    const n = Number(subir[1]);
    const umbral = Number(subir[2]);
    const ultimasN = historial.slice(-n);
    const cumple = ultimasN.length === n && ultimasN.every((s) => porcentajeAciertos(s) >= umbral);
    if (cumple) {
      return Math.min(nivelMaximo, nivelActual + 1);
    }
  }

  return nivelActual;
}

/// Lección del iCST (ver docs/02-investigacion/02-evidencia-cientifica.md §2.5):
/// los participantes agotaron las actividades más rápido de lo previsto. Esta
/// función avisa cuando el banco de ejercicios de un dominio es escaso, para que
/// la interfaz pueda mostrarlo en vez de fallar en silencio.
export function bancoEscaso(ejerciciosDelDominio: Ejercicio[], umbralMinimo = 3): boolean {
  return ejerciciosDelDominio.length < umbralMinimo;
}
