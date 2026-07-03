import type { ButtonHTMLAttributes } from "react";

interface BotonGrandeProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variante?: "primario" | "secundario";
}

/// Botón táctil grande (≥44px), alto contraste — checklist de accesibilidad de
/// docs/08-especificaciones-tecnicas/wireframes-accesibilidad.md.
export function BotonGrande({ variante = "secundario", className = "", ...props }: BotonGrandeProps) {
  const base = variante === "primario" ? "btn-grande-primario" : "btn-grande";
  return <button type="button" className={`${base} ${className}`.trim()} {...props} />;
}
