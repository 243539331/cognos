// Ruta nueva y propia (no forma parte del contrato compartido) creada para el
// panel del cuidador (src/app/panel/page.tsx): ese componente es "use client"
// y no puede importar src/content/loader.ts (usa node:fs, solo server). Este
// route handler corre en el servidor y expone solo lo necesario para escalar
// las barras de "tendencia por dominio": el máximo puntuable del instrumento.

import { NextResponse } from "next/server";
import { obtenerInstrumento } from "@/content/loader";

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const instrumento = obtenerInstrumento(params.id);
  if (!instrumento) {
    return NextResponse.json({ error: "Instrumento no encontrado" }, { status: 404 });
  }
  return NextResponse.json({
    id: instrumento.id,
    puntuacion: { rango: instrumento.puntuacion.rango },
  });
}
