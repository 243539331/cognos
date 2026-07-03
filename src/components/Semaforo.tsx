const ESTILOS: Record<"ok" | "watch" | "refer", { dot: string; fondo: string }> = {
  ok: { dot: "bg-band-ok", fondo: "bg-band-ok/10" },
  watch: { dot: "bg-band-watch", fondo: "bg-band-watch/10" },
  refer: { dot: "bg-band-refer", fondo: "bg-band-refer/10" },
};

/// Semáforo de resultado — nunca puntajes crudos de cara a la persona (wireframe D,
/// docs/08-especificaciones-tecnicas/wireframes-accesibilidad.md).
export function Semaforo({
  clase,
  etiqueta,
  mensaje,
}: {
  clase: "ok" | "watch" | "refer";
  etiqueta: string;
  mensaje: string;
}) {
  const estilo = ESTILOS[clase];
  return (
    <div className={`rounded-2xl p-6 ${estilo.fondo}`}>
      <div className="flex items-center gap-3">
        <span className={`h-5 w-5 flex-none rounded-full ${estilo.dot}`} aria-hidden="true" />
        <h2 className="text-persona-lg font-serif">{etiqueta}</h2>
      </div>
      <p className="mt-3 text-persona-base">{mensaje}</p>
    </div>
  );
}
