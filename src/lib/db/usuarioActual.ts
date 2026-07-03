import "server-only";
import { cookies } from "next/headers";
import { prisma } from "./prisma";

// Sustituto MÍNIMO de autenticación mientras no hay OTP real (ver
// docs/07-plan-maestro-fase-0.md — la autenticación por código al teléfono es
// trabajo pendiente). Identifica al usuario con una cookie httpOnly que guarda
// un id de Usuario seudónimo (alias generado, sin datos identificables) — ver
// docs/05-modelo-datos.md §"Seudonimización". Solo debe llamarse desde Route
// Handlers o Server Actions (únicos contextos donde Next.js permite escribir
// cookies).

const COOKIE_USUARIO = "cognos_uid";
const UN_ANIO_SEGUNDOS = 60 * 60 * 24 * 365;

function generarAlias(): string {
  const sufijo = Math.random().toString(36).slice(2, 8);
  return `persona-${sufijo}`;
}

export async function obtenerUsuarioActual() {
  const almacenCookies = cookies();
  const usuarioId = almacenCookies.get(COOKIE_USUARIO)?.value;

  if (usuarioId) {
    const usuario = await prisma.usuario.findUnique({ where: { id: usuarioId } });
    if (usuario) return usuario;
  }

  const nuevoUsuario = await prisma.usuario.create({
    data: { alias: generarAlias() },
  });

  almacenCookies.set(COOKIE_USUARIO, nuevoUsuario.id, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: UN_ANIO_SEGUNDOS,
  });

  return nuevoUsuario;
}
