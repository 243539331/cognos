"use client";

// Lista de ejercicios de la persona — si hay una evaluación guardada, se
// ordena con el motor de recomendación (dominio más débil primero); si no,
// se muestra tal cual (docs/03-arquitectura.md §"Motor de recomendación").

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Ejercicio } from "@/content/types";
import { EscucharBoton } from "@/components/EscucharBoton";
import { obtenerUltimaEvaluacion } from "@/lib/store/sesionLocal";
import { recomendarPlan } from "@/lib/exercises/engine";

const TEXTO_INTRO = "Elija un ejercicio para practicar.";

export function ListaEjercicios({ ejercicios }: { ejercicios: Ejercicio[] }) {
  const [lista, setLista] = useState<Ejercicio[]>(ejercicios);

  useEffect(() => {
    const evaluacion = obtenerUltimaEvaluacion();
    if (evaluacion) {
      setLista(recomendarPlan(evaluacion.resultado, ejercicios));
    } else {
      setLista(ejercicios);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="flex min-h-[80vh] flex-col">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-persona-xl font-serif">Ejercicios</h1>
        <EscucharBoton texto={TEXTO_INTRO} />
      </div>

      <p className="mt-2 text-persona-base text-muted">{TEXTO_INTRO}</p>

      {lista.length === 0 ? (
        <p className="mt-8 text-persona-base text-muted">
          Todavía no hay ejercicios disponibles.
        </p>
      ) : (
        <div className="mt-8 flex flex-col gap-4">
          {lista.map((ejercicio) => (
            <Link
              key={ejercicio.id}
              href={`/ejercicios/${ejercicio.id}`}
              className="tarjeta block transition-colors hover:bg-teal-tint"
            >
              <p className="etiqueta">{ejercicio.dominio_primario}</p>
              <h2 className="mt-2 text-persona-lg font-serif">{ejercicio.nombre}</h2>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
