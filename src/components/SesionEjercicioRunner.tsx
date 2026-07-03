"use client";

// Sesión de un ejercicio de tipo "emparejar" — wireframe E (sesión de ejercicio,
// offline), docs/08-especificaciones-tecnicas/wireframes-accesibilidad.md:
// una tarea, sin cronómetro visible, sin castigo por error, dificultad adaptativa.

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { Ejercicio, DesempenoSesion } from "@/content/types";
import { BotonGrande } from "@/components/BotonGrande";
import { EscucharBoton } from "@/components/EscucharBoton";
import { ajustarNivel } from "@/lib/exercises/engine";
import {
  guardarSesionEjercicio,
  obtenerHistorialSesiones,
  type SesionGuardada,
} from "@/lib/api/client";

interface ParEmparejar {
  id: string;
  a: string;
  b: string;
}

interface Ficha {
  parId: string;
  texto: string;
}

// Fisher-Yates simple — orden distinto en cada columna para que emparejar
// requiera reconocer el contenido, no la posición.
function barajar<T>(lista: T[]): T[] {
  const copia = [...lista];
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}

export function SesionEjercicioRunner({ ejercicio }: { ejercicio: Ejercicio }) {
  const [cargando, setCargando] = useState(true);
  const [completada, setCompletada] = useState(false);
  const [nivelActual, setNivelActual] = useState(1);
  const [columnaA, setColumnaA] = useState<Ficha[]>([]);
  const [columnaB, setColumnaB] = useState<Ficha[]>([]);
  const [aciertosSet, setAciertosSet] = useState<Set<string>>(new Set());
  const [seleccionA, setSeleccionA] = useState<string | null>(null);
  const [seleccionB, setSeleccionB] = useState<string | null>(null);
  const [bloqueado, setBloqueado] = useState(false);

  // Telemetría en segundo plano: nunca se muestra a la persona.
  const historialRef = useRef<SesionGuardada[]>([]);
  const inicioRef = useRef<number>(Date.now());
  const aciertosContadorRef = useRef(0);
  const erroresContadorRef = useRef(0);
  const totalParesRef = useRef(0);
  const finalizadaRef = useRef(false);

  useEffect(() => {
    let cancelado = false;

    async function iniciar() {
      // Lectura best-effort: si falla (p. ej. corte de red), se empieza igual
      // en nivel 1 en vez de bloquear la sesión (docs/08 wireframes-accesibilidad.md
      // — "tolera corte de red").
      let historial: SesionGuardada[] = [];
      try {
        historial = await obtenerHistorialSesiones(ejercicio.id);
      } catch {
        historial = [];
      }
      if (cancelado) return;
      historialRef.current = historial;

      let nivelCalculado: number;
      if (historial.length === 0) {
        nivelCalculado = 1;
      } else {
        const ultima = historial[historial.length - 1];
        const desempenos = historial.map((s) => s.desempeno);
        nivelCalculado = ajustarNivel(ultima.nivel, ejercicio.niveles.length, desempenos, ejercicio.adaptacion);
      }
      nivelCalculado = Math.min(Math.max(nivelCalculado, 1), ejercicio.niveles.length);

      const nivelInfo = ejercicio.niveles[nivelCalculado - 1];
      const elementosRaw = nivelInfo.parametros.elementos;
      const n = typeof elementosRaw === "number" ? elementosRaw : 3;

      // El esquema tipa "items" como registros genéricos; el contenido "emparejar"
      // del YAML trae { id, a, b } en cada uno (ver content/ejercicios/demo-emparejar.yaml).
      const itemsCrudos = ejercicio.contenido.items as unknown as ParEmparejar[];
      const pares = itemsCrudos.slice(0, Math.min(n, itemsCrudos.length));
      totalParesRef.current = pares.length;

      setColumnaA(barajar(pares.map((p) => ({ parId: p.id, texto: p.a }))));
      setColumnaB(barajar(pares.map((p) => ({ parId: p.id, texto: p.b }))));
      setNivelActual(nivelCalculado);
      inicioRef.current = Date.now();
      setCargando(false);
    }

    void iniciar();
    return () => {
      cancelado = true;
    };
    // Solo debe recalcularse si cambia el ejercicio mostrado.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ejercicio.id]);

  // Se dispara sola cuando todos los pares quedan acertados.
  useEffect(() => {
    if (cargando || completada || finalizadaRef.current) return;
    if (totalParesRef.current > 0 && aciertosSet.size === totalParesRef.current) {
      void finalizarSesion();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [aciertosSet, cargando, completada]);

  async function finalizarSesion() {
    if (finalizadaRef.current) return;
    finalizadaRef.current = true;

    const tiempoTotalS = Math.round((Date.now() - inicioRef.current) / 1000);
    const desempeno: DesempenoSesion = {
      aciertos: aciertosContadorRef.current,
      errores: erroresContadorRef.current,
      tiempoTotalS,
      nivelAlcanzado: nivelActual,
      completada: true,
    };
    const desempenosPrevios = historialRef.current.map((s) => s.desempeno);
    const nuevoNivel = ajustarNivel(
      nivelActual,
      ejercicio.niveles.length,
      [...desempenosPrevios, desempeno],
      ejercicio.adaptacion
    );

    // Guardado best-effort: la sesión se muestra como completada aunque el
    // guardado falle por un corte de red (docs/08 wireframes-accesibilidad.md
    // — "sin castigo", "guardado automático, tolera corte de red"). Se pierde
    // ese registro de progreso, pero no se le impide a la persona terminar.
    try {
      await guardarSesionEjercicio({
        ejercicioId: ejercicio.id,
        version: ejercicio.version,
        nivel: nuevoNivel,
        desempeno,
      });
    } catch (error) {
      console.warn("No se pudo guardar la sesión de ejercicio:", error);
    }
    setCompletada(true);
  }

  function evaluarPar(idA: string, idB: string) {
    setBloqueado(true);
    if (idA === idB) {
      window.setTimeout(() => {
        aciertosContadorRef.current += 1;
        setAciertosSet((prev) => {
          const siguiente = new Set(prev);
          siguiente.add(idA);
          return siguiente;
        });
        setSeleccionA(null);
        setSeleccionB(null);
        setBloqueado(false);
      }, 450);
    } else {
      // Sin castigo por error: no hay mensaje ni color de alarma, solo un
      // resaltado breve y neutro antes de permitir reintentar.
      erroresContadorRef.current += 1;
      window.setTimeout(() => {
        setSeleccionA(null);
        setSeleccionB(null);
        setBloqueado(false);
      }, 700);
    }
  }

  function tocarA(parId: string) {
    if (bloqueado || aciertosSet.has(parId)) return;
    if (seleccionA === parId) {
      setSeleccionA(null);
      return;
    }
    setSeleccionA(parId);
    if (seleccionB) {
      evaluarPar(parId, seleccionB);
    }
  }

  function tocarB(parId: string) {
    if (bloqueado || aciertosSet.has(parId)) return;
    if (seleccionB === parId) {
      setSeleccionB(null);
      return;
    }
    setSeleccionB(parId);
    if (seleccionA) {
      evaluarPar(seleccionA, parId);
    }
  }

  if (cargando) {
    return (
      <main className="flex min-h-[80vh] items-center justify-center">
        <p className="text-persona-base text-muted">Cargando ejercicio…</p>
      </main>
    );
  }

  if (completada) {
    return (
      <main className="flex min-h-[80vh] flex-col items-center justify-center gap-6 text-center">
        <p className="text-persona-xl font-serif">¡Listo!</p>
        <p className="text-persona-lg">Sesión completada.</p>
        <div className="mt-6 flex w-full flex-col gap-4">
          <Link href="/ejercicios">
            <BotonGrande variante="primario">Volver a ejercicios</BotonGrande>
          </Link>
          <Link href="/panel">
            <BotonGrande>Ver mi progreso</BotonGrande>
          </Link>
        </div>
      </main>
    );
  }

  function claseFicha(parId: string, seleccion: string | null) {
    const acertado = aciertosSet.has(parId);
    const seleccionado = seleccion === parId;
    if (acertado) return "border-band-ok bg-band-ok/10 text-ink";
    if (seleccionado) return "border-teal bg-teal-soft text-ink";
    return "border-line bg-white text-ink hover:bg-teal-tint";
  }

  return (
    <main className="flex min-h-[80vh] flex-col">
      <div className="flex items-center justify-between gap-3">
        <Link
          href="/ejercicios"
          className="inline-flex min-h-touch items-center text-persona-base font-medium text-teal"
        >
          ← Salir
        </Link>
        <div className="flex items-center gap-3">
          <span className="etiqueta whitespace-nowrap">⭐ Nivel {nivelActual}</span>
          <EscucharBoton texto={ejercicio.contenido.consigna} />
        </div>
      </div>

      <p className="mt-6 text-persona-lg font-serif">{ejercicio.contenido.consigna}</p>

      <div className="mt-8 grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-3">
          {columnaA.map((ficha) => (
            <button
              key={`a-${ficha.parId}`}
              type="button"
              disabled={aciertosSet.has(ficha.parId)}
              aria-pressed={seleccionA === ficha.parId}
              onClick={() => tocarA(ficha.parId)}
              className={`min-h-touch rounded-xl border-2 px-3 py-3 text-persona-base font-medium transition-colors ${claseFicha(
                ficha.parId,
                seleccionA
              )}`}
            >
              {ficha.texto}
            </button>
          ))}
        </div>
        <div className="flex flex-col gap-3">
          {columnaB.map((ficha) => (
            <button
              key={`b-${ficha.parId}`}
              type="button"
              disabled={aciertosSet.has(ficha.parId)}
              aria-pressed={seleccionB === ficha.parId}
              onClick={() => tocarB(ficha.parId)}
              className={`min-h-touch rounded-xl border-2 px-3 py-3 text-persona-base font-medium transition-colors ${claseFicha(
                ficha.parId,
                seleccionB
              )}`}
            >
              {ficha.texto}
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}
