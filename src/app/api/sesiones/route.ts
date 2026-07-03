import { NextResponse } from "next/server";
import { z } from "zod";
import { obtenerUsuarioActual } from "@/lib/db/usuarioActual";
import { crearSesionEjercicio, listarSesiones } from "@/lib/db/repositorio";

const CuerpoSesion = z.object({
  ejercicioId: z.string().min(1),
  version: z.string().min(1),
  nivel: z.number().int().min(1),
  desempeno: z.object({
    aciertos: z.number().int().min(0),
    errores: z.number().int().min(0),
    tiempoTotalS: z.number().min(0),
    nivelAlcanzado: z.number().int().min(1),
    completada: z.boolean(),
  }),
});

export async function GET(req: Request) {
  const usuario = await obtenerUsuarioActual();
  const ejercicioId = new URL(req.url).searchParams.get("ejercicioId") ?? undefined;
  const sesiones = await listarSesiones(usuario.id, ejercicioId);
  return NextResponse.json({ sesiones });
}

export async function POST(req: Request) {
  const usuario = await obtenerUsuarioActual();
  const json = await req.json().catch(() => null);
  const validacion = CuerpoSesion.safeParse(json);
  if (!validacion.success) {
    return NextResponse.json({ error: "Cuerpo inválido", detalle: validacion.error.flatten() }, { status: 400 });
  }

  try {
    const sesion = await crearSesionEjercicio(usuario.id, validacion.data);
    return NextResponse.json({ sesion }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
