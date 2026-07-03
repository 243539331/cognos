"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { Instrumento, RespuestaItem } from "@/content/types";
import { BotonGrande } from "@/components/BotonGrande";
import { EscucharBoton } from "@/components/EscucharBoton";
import { BarraProgreso } from "@/components/BarraProgreso";
import { calcularResultado } from "@/lib/instruments/engine";
import { guardarEvaluacion } from "@/lib/store/sesionLocal";

// Flujo de aplicación de un instrumento — wireframe C,
// docs/08-especificaciones-tecnicas/wireframes-accesibilidad.md:
// 1) un paso demográfico simple, 2) un ítem a la vez, sin límite de tiempo,
// con "Volver" y "Continuar" siempre en el mismo lugar.

const TEXTO_DEMOGRAFIA =
  "Antes de empezar, cuéntenos su edad y cuántos años estudió. Las dos preguntas son opcionales.";

// Los valores deben coincidir EXACTAMENTE con los cortes de escolaridad del
// instrumento (content/instrumentos/demo-orientacion.yaml).
const OPCIONES_ESCOLARIDAD: { valor: string; etiqueta: string }[] = [
  { valor: "<4 años", etiqueta: "Menos de 4 años de estudio" },
  { valor: "4-8", etiqueta: "Entre 4 y 8 años de estudio" },
  { valor: ">8", etiqueta: "Más de 8 años de estudio" },
];

type Paso = "demografia" | number;

export function EvaluacionRunner({
  instrumento,
  modo,
}: {
  instrumento: Instrumento;
  modo?: string;
}) {
  const router = useRouter();
  const [paso, setPaso] = useState<Paso>("demografia");
  const [edad, setEdad] = useState("");
  const [escolaridad, setEscolaridad] = useState("");
  const [respuestas, setRespuestas] = useState<Record<string, number>>({});

  // Evita un doble envío si el botón "Continuar" recibe dos toques seguidos
  // antes de navegar — relevante para la población objetivo, que puede tener
  // temblor (ver docs/04-diseno-ux-accesibilidad.md).
  const enviadoRef = useRef(false);

  // El modo asistido cambia la voz para los ítems dirigidos a quien acompaña
  // (docs/04-diseno-ux-accesibilidad.md §"Modo asistido de primera clase").
  const esAsistido = modo === "asistido" || modo === "asistida";
  const items = instrumento.items;

  function finalizar(respuestasFinales: Record<string, number>) {
    if (enviadoRef.current) return;
    enviadoRef.current = true;
    const respuestasArray: RespuestaItem[] = items.map((item) => ({
      itemId: item.id,
      valor: respuestasFinales[item.id] ?? 0,
    }));
    const demografia = {
      edad: edad.trim() === "" ? undefined : Number(edad),
      escolaridad: escolaridad === "" ? undefined : escolaridad,
    };
    const resultado = calcularResultado(instrumento, respuestasArray, demografia);
    guardarEvaluacion({
      instrumentoId: instrumento.id,
      fecha: new Date().toISOString(),
      respuestas: respuestasArray,
      demografia,
      resultado,
    });
    router.push("/resultado");
  }

  if (paso === "demografia") {
    return (
      <main className="flex min-h-[80vh] flex-col">
        <div className="flex items-center justify-between gap-3">
          <h1 className="text-persona-lg font-serif">Antes de empezar</h1>
          <EscucharBoton texto={TEXTO_DEMOGRAFIA} />
        </div>

        <p className="mt-4 text-persona-base">{TEXTO_DEMOGRAFIA}</p>

        <div className="mt-8 flex flex-col gap-8">
          <div>
            <label htmlFor="edad-input" className="mb-2 block text-persona-base font-medium">
              Edad (opcional)
            </label>
            <input
              id="edad-input"
              type="number"
              inputMode="numeric"
              min={0}
              max={120}
              value={edad}
              onChange={(e) => setEdad(e.target.value)}
              placeholder="Ejemplo: 72"
              className="min-h-touch w-full rounded-xl border-2 border-line bg-white px-4 text-persona-base text-ink"
            />
          </div>

          <div>
            <p className="mb-2 text-persona-base font-medium">Años de estudio (opcional)</p>
            <div className="flex flex-col gap-3">
              {OPCIONES_ESCOLARIDAD.map((op) => (
                <BotonGrande
                  key={op.valor}
                  variante={escolaridad === op.valor ? "primario" : "secundario"}
                  aria-pressed={escolaridad === op.valor}
                  className="text-left"
                  onClick={() => setEscolaridad(op.valor)}
                >
                  {op.etiqueta}
                </BotonGrande>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10">
          <BotonGrande variante="primario" onClick={() => setPaso(0)}>
            Continuar
          </BotonGrande>
        </div>
      </main>
    );
  }

  const idx = paso;
  const item = items[idx];
  const total = items.length;
  const opciones = item.opciones ?? [];
  const valorSeleccionado = respuestas[item.id] ?? null;
  const esUltimo = idx === total - 1;
  const mostrarEtiquetaInformador = esAsistido && item.tipo === "informador";

  function volver() {
    if (idx === 0) {
      setPaso("demografia");
    } else {
      setPaso(idx - 1);
    }
  }

  function elegir(valor: number) {
    setRespuestas((prev) => ({ ...prev, [item.id]: valor }));
  }

  function continuar() {
    if (valorSeleccionado === null) return;
    if (esUltimo) {
      finalizar(respuestas);
    } else {
      setPaso(idx + 1);
    }
  }

  return (
    <main className="flex min-h-[80vh] flex-col">
      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={volver}
          className="min-h-touch text-persona-base font-medium text-teal"
        >
          ← Volver
        </button>
        <EscucharBoton texto={item.enunciado} />
      </div>

      <div className="mt-4">
        <BarraProgreso actual={idx + 1} total={total} />
      </div>

      <div className="mt-8">
        {mostrarEtiquetaInformador && <p className="etiqueta mb-2">Para quien acompaña:</p>}
        <p className="text-persona-lg font-serif">{item.enunciado}</p>
      </div>

      <div className="mt-8 flex flex-col gap-3">
        {opciones.map((opcion) => (
          <BotonGrande
            key={opcion.valor}
            variante={valorSeleccionado === opcion.valor ? "primario" : "secundario"}
            aria-pressed={valorSeleccionado === opcion.valor}
            className="text-left"
            onClick={() => elegir(opcion.valor)}
          >
            {opcion.etiqueta}
          </BotonGrande>
        ))}
      </div>

      <div className="mt-10">
        <BotonGrande
          variante="primario"
          disabled={valorSeleccionado === null}
          className={valorSeleccionado === null ? "cursor-not-allowed opacity-50" : ""}
          onClick={continuar}
        >
          Continuar
        </BotonGrande>
      </div>
    </main>
  );
}
