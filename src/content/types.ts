// Tipos de aplicación compartidos entre el motor y las pantallas.
// Los tipos de contenido (Instrumento, Ejercicio) viven en ./schema/*.

export type { Instrumento, ItemInstrumento, BandaResultado } from "./schema/instrumento.schema";
export type { Ejercicio, NivelEjercicio } from "./schema/ejercicio.schema";

export type ModoAplicacion = "autoadministrado" | "asistido";

/// Respuesta cruda de un ítem — se guarda tal cual (ver docs/05-modelo-datos.md §2:
/// "Respuestas crudas + puntajes derivados").
export interface RespuestaItem {
  itemId: string;
  valor: number;
  tiempoMs?: number;
}

export interface PuntajePorDominio {
  dominio: string;
  puntaje: number;
}

/// Resultado de una evaluación ya puntuada — lo que consume la pantalla de resultados.
export interface ResultadoEvaluacion {
  puntajeTotal: number;
  puntajesPorDominio: PuntajePorDominio[];
  bandaId: string;
  bandaEtiqueta: string;
  mensajeUsuario: string;
}

export interface DesempenoSesion {
  aciertos: number;
  errores: number;
  tiempoTotalS: number;
  nivelAlcanzado: number;
  completada: boolean;
}

/// Punto de una serie de tiempo del tablero — banda + tendencia, no decimales
/// (ver docs/04-diseno-ux-accesibilidad.md §"El tablero de progreso").
export interface PuntoSerieTablero {
  fecha: string; // ISO
  dominio: string;
  puntaje: number;
  bandaId: "ok" | "watch" | "refer";
}

export interface ObservacionCualitativaUI {
  fecha: string;
  sueno: 1 | 2 | 3 | 4 | 5;
  animo: 1 | 2 | 3 | 4 | 5;
  autonomia: 1 | 2 | 3 | 4 | 5;
  textoLibre?: string;
}
