"use client";

// Pantalla de consentimiento informado — wireframe B,
// docs/08-especificaciones-tecnicas/wireframes-accesibilidad.md
import { useRouter } from "next/navigation";
import { useState } from "react";
import { EscucharBoton } from "@/components/EscucharBoton";
import { BotonGrande } from "@/components/BotonGrande";

const PUNTOS = [
  "Vamos a hacer unas preguntas para conocer la memoria.",
  "Esto NO es un diagnóstico.",
  "Sus datos están protegidos.",
  "Puede parar cuando quiera.",
];

const TEXTO_DUDAS =
  "Estas preguntas nos ayudan a saber cómo está la memoria hoy. " +
  "No son un examen y no hay respuestas malas. Un profesional de la salud " +
  "es quien puede dar un diagnóstico, nunca este portal. " +
  "Guardamos sus datos de forma segura y solo las personas autorizadas pueden verlos. " +
  "En cualquier momento puede parar, sin ningún problema.";

const TEXTO_CONSENTIMIENTO = `Antes de empezar. ${PUNTOS.join(" ")}`;

export default function ConsentimientoPage({
  searchParams,
}: {
  searchParams: { modo?: string | string[] };
}) {
  const router = useRouter();
  const [mostrarDudas, setMostrarDudas] = useState(false);
  const modo = searchParams.modo === "auto" ? "auto" : "asistido";

  return (
    <main className="flex min-h-[80vh] flex-col">
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => router.push("/")}
          className="inline-flex min-h-touch items-center gap-1 text-persona-base font-medium text-teal hover:underline"
        >
          ← Volver
        </button>
        <EscucharBoton texto={TEXTO_CONSENTIMIENTO} />
      </div>

      <h1 className="mt-6 text-persona-xl font-serif">Antes de empezar</h1>

      <ul className="mt-6 flex flex-col gap-3 text-persona-base">
        {PUNTOS.map((punto) => (
          <li key={punto} className="flex gap-3">
            <span aria-hidden="true" className="text-teal">
              •
            </span>
            <span>{punto}</span>
          </li>
        ))}
      </ul>

      {mostrarDudas && (
        <div className="tarjeta mt-6">
          <p className="text-persona-base">{TEXTO_DUDAS}</p>
        </div>
      )}

      <div className="mt-10 flex flex-col gap-4">
        <BotonGrande
          variante="primario"
          onClick={() => router.push(`/evaluacion?modo=${modo}`)}
        >
          Entiendo y acepto
        </BotonGrande>
        <BotonGrande
          aria-expanded={mostrarDudas}
          onClick={() => setMostrarDudas((valor) => !valor)}
        >
          {mostrarDudas ? "Ocultar explicación" : "Tengo dudas"}
        </BotonGrande>
      </div>
    </main>
  );
}
