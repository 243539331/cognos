"use client";

// Panel del cuidador/profesional — wireframe F, "densidad permitida aquí"
// (docs/08-especificaciones-tecnicas/wireframes-accesibilidad.md; ver también
// docs/04-diseno-ux-accesibilidad.md §"Dos experiencias diferenciadas"). A
// diferencia de las pantallas de la persona evaluada, esta vista SÍ puede
// mostrar puntajes por dominio y usar tipografía normal.

import { useEffect, useState, type FormEvent } from "react";
import type { ObservacionCualitativaUI } from "@/content/types";
import {
  obtenerEvaluaciones,
  obtenerTodasLasSesiones,
  obtenerObservaciones,
  guardarObservacion,
  type EvaluacionGuardada,
  type SesionGuardada,
} from "@/lib/store/sesionLocal";
import { claseBanda } from "@/lib/instruments/engine";

const COLOR_BANDA: Record<"ok" | "watch" | "refer", string> = {
  ok: "bg-band-ok",
  watch: "bg-band-watch",
  refer: "bg-band-refer",
};

const ETIQUETA_BANDA: Record<"ok" | "watch" | "refer", string> = {
  ok: "sin alerta",
  watch: "observar",
  refer: "derivar",
};

const NIVELES = [1, 2, 3, 4, 5] as const;
type Nivel1a5 = (typeof NIVELES)[number];
const ETIQUETA_NIVEL: Record<Nivel1a5, string> = {
  1: "Muy mal",
  2: "Mal",
  3: "Regular",
  4: "Bien",
  5: "Muy bien",
};

const SIETE_DIAS_MS = 7 * 24 * 60 * 60 * 1000;

function capitalizar(texto: string): string {
  return texto.length === 0 ? texto : texto.charAt(0).toUpperCase() + texto.slice(1);
}

function formatearFecha(iso: string): string {
  try {
    return new Intl.DateTimeFormat("es-CO", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

export default function PanelPage() {
  const [cargando, setCargando] = useState(true);
  const [evaluaciones, setEvaluaciones] = useState<EvaluacionGuardada[]>([]);
  const [sesiones, setSesiones] = useState<SesionGuardada[]>([]);
  const [observaciones, setObservaciones] = useState<ObservacionCualitativaUI[]>([]);
  // Máximo puntuable del instrumento, para escalar las barras de dominio. Se
  // pide a una ruta de API propia (src/app/api/instrumento/[id]/route.ts)
  // porque src/content/loader.ts es solo-servidor y este componente es "use client".
  const [instrumentoMax, setInstrumentoMax] = useState<number | null>(null);

  const [sueno, setSueno] = useState<Nivel1a5>(3);
  const [animo, setAnimo] = useState<Nivel1a5>(3);
  const [autonomia, setAutonomia] = useState<Nivel1a5>(3);
  const [textoLibre, setTextoLibre] = useState("");
  const [guardando, setGuardando] = useState(false);
  const [confirmacion, setConfirmacion] = useState(false);

  useEffect(() => {
    const evals = obtenerEvaluaciones();
    setEvaluaciones(evals);
    setSesiones(obtenerTodasLasSesiones());
    setObservaciones(obtenerObservaciones());
    setCargando(false);

    const ultima = evals[evals.length - 1];
    if (ultima) {
      fetch(`/api/instrumento/${encodeURIComponent(ultima.instrumentoId)}`)
        .then((res) => (res.ok ? res.json() : null))
        .then((datos) => {
          const max = datos?.puntuacion?.rango?.max;
          if (typeof max === "number" && max > 0) setInstrumentoMax(max);
        })
        .catch(() => {
          // Sin respuesta de la API: se usa un máximo de respaldo calculado abajo.
        });
    }
  }, []);

  function manejarGuardarObservacion(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    setGuardando(true);
    guardarObservacion({
      fecha: new Date().toISOString(),
      sueno,
      animo,
      autonomia,
      textoLibre: textoLibre.trim() || undefined,
    });
    setObservaciones(obtenerObservaciones());
    setTextoLibre("");
    setSueno(3);
    setAnimo(3);
    setAutonomia(3);
    setGuardando(false);
    setConfirmacion(true);
    setTimeout(() => setConfirmacion(false), 3000);
  }

  if (cargando) {
    return (
      <main className="flex min-h-[80vh] items-center justify-center">
        <p className="text-base text-muted">Cargando panel…</p>
      </main>
    );
  }

  const ultimaEvaluacion = evaluaciones.length > 0 ? evaluaciones[evaluaciones.length - 1] : null;
  const claseUltima = ultimaEvaluacion ? claseBanda(ultimaEvaluacion.resultado.bandaId) : null;
  const maxParaBarra = ultimaEvaluacion
    ? instrumentoMax ??
      Math.max(1, ultimaEvaluacion.resultado.puntajeTotal, ...ultimaEvaluacion.resultado.puntajesPorDominio.map((p) => p.puntaje))
    : 1;

  const ahora = Date.now();
  const sesionesUltimos7Dias = sesiones.filter(
    (s) => ahora - new Date(s.fecha).getTime() <= SIETE_DIAS_MS && ahora - new Date(s.fecha).getTime() >= 0
  ).length;
  const totalSesiones = sesiones.length;

  const observacionesOrdenadas = [...observaciones].sort((a, b) => b.fecha.localeCompare(a.fecha));

  return (
    <main className="mx-auto flex max-w-3xl flex-col gap-8 pb-16">
      <div className="flex items-center justify-between gap-3 border-b border-line pb-4">
        <div>
          <h1 className="text-xl font-serif font-semibold">Cognos — Panel del cuidador</h1>
          <p className="text-sm text-muted">Persona: (alias)</p>
        </div>
        <button
          type="button"
          onClick={() => window.print()}
          className="print:hidden rounded-lg border-2 border-teal bg-teal px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-teal-deep"
        >
          Exportar PDF
        </button>
      </div>

      {/* Tendencia por dominio */}
      <section className="tarjeta">
        <h2 className="etiqueta">Tendencia por dominio</h2>
        {!ultimaEvaluacion || !claseUltima ? (
          <p className="mt-3 text-base text-muted">Aún no hay evaluaciones registradas.</p>
        ) : (
          <>
            <p className="mt-1 text-sm text-muted">
              Última evaluación: {formatearFecha(ultimaEvaluacion.fecha)} — banda: {ETIQUETA_BANDA[claseUltima]} (
              {ultimaEvaluacion.resultado.bandaEtiqueta})
            </p>
            <div className="mt-4 flex flex-col gap-3">
              {ultimaEvaluacion.resultado.puntajesPorDominio.map((p) => {
                const ancho = Math.max(4, Math.min(100, (p.puntaje / maxParaBarra) * 100));
                return (
                  <div key={p.dominio}>
                    <div className="mb-1 flex items-center justify-between text-sm">
                      <span className="font-medium">{capitalizar(p.dominio)}</span>
                      <span className="text-muted">
                        {p.puntaje} / {maxParaBarra}
                      </span>
                    </div>
                    <div className="h-3 w-full overflow-hidden rounded-full bg-line" aria-hidden="true">
                      <div
                        className={`h-full rounded-full ${COLOR_BANDA[claseUltima]}`}
                        style={{ width: `${ancho}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
            <p className="mt-4 text-xs text-muted">
              {evaluaciones.length} {evaluaciones.length === 1 ? "evaluación registrada" : "evaluaciones registradas"} en
              total.
            </p>
          </>
        )}
      </section>

      {/* Adherencia */}
      <section className="tarjeta">
        <h2 className="etiqueta">Adherencia</h2>
        <p className="mt-3 text-base">
          <span className="font-semibold">{sesionesUltimos7Dias}</span> sesion
          {sesionesUltimos7Dias === 1 ? "" : "es"} de ejercicio en los últimos 7 días, de{" "}
          <span className="font-semibold">{totalSesiones}</span> registrada{totalSesiones === 1 ? "" : "s"} en total.
        </p>
        {totalSesiones === 0 && (
          <p className="mt-1 text-sm text-muted">Aún no hay sesiones de ejercicio registradas.</p>
        )}
      </section>

      {/* Observaciones del cuidador */}
      <section className="tarjeta">
        <h2 className="etiqueta">Observaciones del cuidador</h2>

        <form onSubmit={manejarGuardarObservacion} className="mt-4 flex flex-col gap-4 print:hidden">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <label htmlFor="panel-sueno" className="mb-1 block text-sm font-medium">
                Sueño
              </label>
              <select
                id="panel-sueno"
                value={sueno}
                onChange={(e) => setSueno(Number(e.target.value) as Nivel1a5)}
                className="w-full rounded-lg border border-line bg-white p-2 text-sm"
              >
                {NIVELES.map((n) => (
                  <option key={n} value={n}>
                    {n} — {ETIQUETA_NIVEL[n]}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="panel-animo" className="mb-1 block text-sm font-medium">
                Ánimo
              </label>
              <select
                id="panel-animo"
                value={animo}
                onChange={(e) => setAnimo(Number(e.target.value) as Nivel1a5)}
                className="w-full rounded-lg border border-line bg-white p-2 text-sm"
              >
                {NIVELES.map((n) => (
                  <option key={n} value={n}>
                    {n} — {ETIQUETA_NIVEL[n]}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="panel-autonomia" className="mb-1 block text-sm font-medium">
                Autonomía
              </label>
              <select
                id="panel-autonomia"
                value={autonomia}
                onChange={(e) => setAutonomia(Number(e.target.value) as Nivel1a5)}
                className="w-full rounded-lg border border-line bg-white p-2 text-sm"
              >
                {NIVELES.map((n) => (
                  <option key={n} value={n}>
                    {n} — {ETIQUETA_NIVEL[n]}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="panel-texto-libre" className="mb-1 block text-sm font-medium">
              Notas (opcional)
            </label>
            <textarea
              id="panel-texto-libre"
              value={textoLibre}
              onChange={(e) => setTextoLibre(e.target.value)}
              rows={3}
              placeholder="Ej.: esta semana durmió mal…"
              className="w-full rounded-lg border border-line bg-white p-2 text-sm"
            />
          </div>

          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={guardando}
              className="rounded-lg border-2 border-teal bg-teal px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-teal-deep disabled:opacity-60"
            >
              Guardar observación
            </button>
            {confirmacion && <span className="text-sm text-teal-deep">Observación guardada.</span>}
          </div>
        </form>

        <div className="mt-6 flex flex-col gap-3">
          {observacionesOrdenadas.length === 0 ? (
            <p className="text-sm text-muted">Aún no hay observaciones registradas.</p>
          ) : (
            observacionesOrdenadas.map((obs, i) => (
              <div key={`${obs.fecha}-${i}`} className="rounded-lg border border-line p-3 text-sm">
                <p className="font-medium">{formatearFecha(obs.fecha)}</p>
                <p className="mt-1 text-muted">
                  Sueño: {obs.sueno}/5 ({ETIQUETA_NIVEL[obs.sueno]}) · Ánimo: {obs.animo}/5 (
                  {ETIQUETA_NIVEL[obs.animo]}) · Autonomía: {obs.autonomia}/5 ({ETIQUETA_NIVEL[obs.autonomia]})
                </p>
                {obs.textoLibre && <p className="mt-2">"{obs.textoLibre}"</p>}
              </div>
            ))
          )}
        </div>
      </section>
    </main>
  );
}
