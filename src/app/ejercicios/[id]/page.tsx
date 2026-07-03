// Pantalla de sesión de ejercicio — wireframe E,
// docs/08-especificaciones-tecnicas/wireframes-accesibilidad.md
import { obtenerEjercicio } from "@/content/loader";
import { SesionEjercicioRunner } from "@/components/SesionEjercicioRunner";

export default function EjercicioPage({ params }: { params: { id: string } }) {
  const ejercicio = obtenerEjercicio(params.id);

  if (!ejercicio) {
    return (
      <main className="flex min-h-[80vh] flex-col items-center justify-center gap-4 text-center">
        <p className="text-persona-lg font-serif">No encontramos este ejercicio.</p>
        <p className="text-persona-base text-muted">
          Por favor, vuelva a la lista de ejercicios.
        </p>
      </main>
    );
  }

  return <SesionEjercicioRunner ejercicio={ejercicio} />;
}
