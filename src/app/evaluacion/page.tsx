// Pantalla de aplicación de la evaluación — wireframe C,
// docs/08-especificaciones-tecnicas/wireframes-accesibilidad.md
import { obtenerInstrumento } from "@/content/loader";
import { EvaluacionRunner } from "@/components/EvaluacionRunner";

export default function EvaluacionPage({
  searchParams,
}: {
  searchParams: { [clave: string]: string | string[] | undefined };
}) {
  const instrumento = obtenerInstrumento("demo-orientacion");
  const modoParam = searchParams.modo;
  const modo = Array.isArray(modoParam) ? modoParam[0] : modoParam;

  if (!instrumento) {
    return (
      <main className="flex min-h-[80vh] flex-col items-center justify-center gap-4 text-center">
        <p className="text-persona-lg font-serif">
          No pudimos cargar la evaluación en este momento.
        </p>
        <p className="text-persona-base text-muted">
          Por favor, inténtelo de nuevo más tarde.
        </p>
      </main>
    );
  }

  return <EvaluacionRunner instrumento={instrumento} modo={modo} />;
}
