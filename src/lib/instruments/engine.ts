import type { Instrumento, RespuestaItem, ResultadoEvaluacion, PuntajePorDominio } from "@/content/types";

export interface DatosDemograficos {
  edad?: number;
  escolaridad?: string;
}

/// Interpreta reglas de banda declarativas con la gramática documentada en
/// docs/08-especificaciones-tecnicas/esquema-instrumento.md:
///   "puntaje <op> punto_corte [<+/-> N]"   op ∈ { >=, <=, ==, <, > }
/// Esto mantiene las bandas como DATO editable por un asesor clínico, no como código.
const PATRON_REGLA = /^puntaje\s*(>=|<=|==|<|>)\s*punto_corte\s*(?:([+-])\s*(\d+))?$/;

function evaluarRegla(regla: string, puntaje: number, puntoCorte: number): boolean {
  const match = PATRON_REGLA.exec(regla.trim());
  if (!match) {
    throw new Error(
      `Regla de banda no reconocida: "${regla}". Gramática soportada: "puntaje <op> punto_corte [+/- N]".`
    );
  }
  const [, operador, signo, magnitud] = match;
  const offset = signo && magnitud ? (signo === "-" ? -Number(magnitud) : Number(magnitud)) : 0;
  const umbral = puntoCorte + offset;

  switch (operador) {
    case ">=":
      return puntaje >= umbral;
    case "<=":
      return puntaje <= umbral;
    case "==":
      return puntaje === umbral;
    case "<":
      return puntaje < umbral;
    case ">":
      return puntaje > umbral;
    default:
      return false;
  }
}

function resolverPuntoCorte(instrumento: Instrumento, demografia: DatosDemograficos): number {
  const { cortes } = instrumento.puntuacion;
  if (cortes.length === 0) {
    throw new Error(`El instrumento "${instrumento.id}" no define puntos de corte.`);
  }
  const corte = cortes.find((c) => c.escolaridad === demografia.escolaridad);
  if (corte) return corte.punto_corte;

  // Sin escolaridad conocida: usar el corte más exigente (más conservador,
  // evita falsos negativos — coherente con "primero, no dañar").
  return Math.max(...cortes.map((c) => c.punto_corte));
}

/// Puntúa una evaluación ya respondida. No decide diagnóstico: solo calcula
/// puntajes por dominio y resuelve a qué banda de ORIENTACIÓN corresponde.
export function calcularResultado(
  instrumento: Instrumento,
  respuestas: RespuestaItem[],
  demografia: DatosDemograficos = {}
): ResultadoEvaluacion {
  const valorPorItem = new Map(respuestas.map((r) => [r.itemId, r.valor]));

  const dominios = Array.from(new Set(instrumento.items.map((i) => i.dominio)));
  const puntajesPorDominio: PuntajePorDominio[] = dominios.map((dominio) => {
    const itemsDelDominio = instrumento.items.filter((i) => i.dominio === dominio);
    const puntaje = itemsDelDominio.reduce((acc, item) => acc + (valorPorItem.get(item.id) ?? 0), 0);
    return { dominio, puntaje };
  });

  const puntajeTotal = puntajesPorDominio.reduce((acc, p) => acc + p.puntaje, 0);
  const puntoCorte = resolverPuntoCorte(instrumento, demografia);

  const banda = instrumento.resultado.bandas.find((b) => evaluarRegla(b.regla, puntajeTotal, puntoCorte));
  if (!banda) {
    throw new Error(
      `Ninguna banda de resultado coincide para el instrumento "${instrumento.id}" (puntaje=${puntajeTotal}, corte=${puntoCorte}). Revisar que las reglas cubran todo el rango.`
    );
  }

  return {
    puntajeTotal,
    puntajesPorDominio,
    bandaId: banda.id,
    bandaEtiqueta: banda.etiqueta,
    mensajeUsuario: banda.mensaje_usuario,
  };
}

/// Clasificación semántica de la banda para colorear el semáforo en el tablero
/// (ver docs/08 wireframes-accesibilidad.md, Flujo D). Las bandas "conocidas" del
/// contenido de demostración se mapean por id; cualquier id nuevo cae en "watch"
/// por seguridad (ni falso verde ni alarma roja sin evidencia).
export function claseBanda(bandaId: string): "ok" | "watch" | "refer" {
  if (bandaId === "sin-alerta") return "ok";
  if (bandaId === "derivar") return "refer";
  return "watch";
}
