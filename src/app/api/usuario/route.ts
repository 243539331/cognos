import { NextResponse } from "next/server";
import { obtenerUsuarioActual } from "@/lib/db/usuarioActual";

// Crea (si hace falta) y devuelve el usuario seudónimo asociado a la cookie de
// sesión — ver src/lib/db/usuarioActual.ts. Sustituto mínimo mientras no hay
// autenticación OTP real (docs/07-plan-maestro-fase-0.md).
export async function GET() {
  const usuario = await obtenerUsuarioActual();
  return NextResponse.json({ id: usuario.id, alias: usuario.alias });
}
