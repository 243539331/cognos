/// Indicador de progreso simple ("pregunta 3 de 10") — wireframe C de
/// docs/08-especificaciones-tecnicas/wireframes-accesibilidad.md.
export function BarraProgreso({ actual, total }: { actual: number; total: number }) {
  return (
    <div role="progressbar" aria-valuenow={actual} aria-valuemin={1} aria-valuemax={total}>
      <p className="mb-2 text-sm font-medium text-muted">
        Pregunta {actual} de {total}
      </p>
      <div className="flex gap-1.5">
        {Array.from({ length: total }, (_, i) => (
          <span
            key={i}
            className={`h-2 flex-1 rounded-full ${i < actual ? "bg-teal" : "bg-line"}`}
          />
        ))}
      </div>
    </div>
  );
}
