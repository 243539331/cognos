// Lista de ejercicios disponibles — punto de entrada al wireframe E,
// docs/08-especificaciones-tecnicas/wireframes-accesibilidad.md
import { listarEjerciciosPublicables } from "@/content/loader";
import { ListaEjercicios } from "@/components/ListaEjercicios";

export default function EjerciciosPage() {
  const ejercicios = listarEjerciciosPublicables();
  return <ListaEjercicios ejercicios={ejercicios} />;
}
