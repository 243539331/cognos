"use client";

// Pantalla de entrada — wireframe A (modo asistido),
// docs/08-especificaciones-tecnicas/wireframes-accesibilidad.md
import { useRouter } from "next/navigation";
import { EscucharBoton } from "@/components/EscucharBoton";
import { BotonGrande } from "@/components/BotonGrande";

const TEXTO_ENTRADA = "Hola. ¿Quién va a usar el portal hoy?";

export default function InicioPage() {
  const router = useRouter();

  return (
    <main className="flex min-h-[80vh] flex-col">
      <div className="flex items-center justify-between">
        <h1 className="text-persona-xl font-serif">Cognos</h1>
        <EscucharBoton texto={TEXTO_ENTRADA} />
      </div>

      <p className="mt-8 text-persona-lg">{TEXTO_ENTRADA}</p>

      <div className="mt-10 flex flex-col gap-4">
        <BotonGrande
          variante="primario"
          className="text-left"
          onClick={() => router.push("/consentimiento?modo=auto")}
        >
          Soy la persona
        </BotonGrande>
        <BotonGrande
          className="text-left"
          onClick={() => router.push("/consentimiento?modo=asistido")}
        >
          Soy quien acompaña
        </BotonGrande>
      </div>
    </main>
  );
}
