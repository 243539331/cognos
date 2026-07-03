"use client";

// Pantalla de resultado — wireframe D, "orientación, nunca diagnóstico"
// (docs/08-especificaciones-tecnicas/wireframes-accesibilidad.md). Vista de la
// PERSONA evaluada: sin puntajes crudos, solo banda/semáforo y acción concreta.

import { useEffect, useState } from "react";
import Link from "next/link";
import { EscucharBoton } from "@/components/EscucharBoton";
import { BotonGrande } from "@/components/BotonGrande";
import { Semaforo } from "@/components/Semaforo";
import { claseBanda } from "@/lib/instruments/engine";
import { obtenerUltimaEvaluacion, type EvaluacionGuardada } from "@/lib/store/sesionLocal";

const TEXTO_ORIENTACION_VALORACION =
  "Puede acercarse al centro de salud o a su EPS más cercana y pedir una cita con su médico de cabecera. Cuéntele estos resultados y pida una valoración de la memoria.";

export default function ResultadoPage() {
  const [evaluacion, setEvaluacion] = useState<EvaluacionGuardada | null>(null);
  const [cargando, setCargando] = useState(true);
  const [mostrarValoracion, setMostrarValoracion] = useState(false);

  useEffect(() => {
    setEvaluacion(obtenerUltimaEvaluacion());
    setCargando(false);
  }, []);

  if (cargando) {
    return (
      <main className="flex min-h-[80vh] items-center justify-center">
        <p className="text-persona-base text-muted">Cargando resultado…</p>
      </main>
    );
  }

  if (!evaluacion) {
    return (
      <main className="flex min-h-[80vh] flex-col items-center justify-center gap-6 text-center">
        <p className="text-persona-lg font-serif">Todavía no hay un resultado guardado.</p>
        <Link href="/evaluacion">
          <BotonGrande variante="primario">Hacer la evaluación</BotonGrande>
        </Link>
      </main>
    );
  }

  const clase = claseBanda(evaluacion.resultado.bandaId);

  return (
    <main className="flex min-h-[80vh] flex-col">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-persona-xl font-serif">Cognos</h1>
        <EscucharBoton
          texto={`${evaluacion.resultado.bandaEtiqueta}. ${evaluacion.resultado.mensajeUsuario}`}
        />
      </div>

      <p className="mt-2 text-persona-base text-muted">Resultado de hoy</p>

      <div className="mt-6">
        <Semaforo
          clase={clase}
          etiqueta={evaluacion.resultado.bandaEtiqueta}
          mensaje={evaluacion.resultado.mensajeUsuario}
        />
      </div>

      <div className="mt-10 flex flex-col gap-4 print:hidden">
        <Link href="/ejercicios">
          <BotonGrande variante="primario" className="text-left">
            Ver ejercicios sugeridos
          </BotonGrande>
        </Link>

        <BotonGrande
          className="text-left"
          aria-expanded={mostrarValoracion}
          onClick={() => setMostrarValoracion((valor) => !valor)}
        >
          Cómo buscar valoración
        </BotonGrande>
        {mostrarValoracion && (
          <div className="tarjeta text-persona-base">
            <p>{TEXTO_ORIENTACION_VALORACION}</p>
          </div>
        )}

        <BotonGrande className="text-left" onClick={() => window.print()}>
          Guardar / imprimir informe
        </BotonGrande>
      </div>
    </main>
  );
}
