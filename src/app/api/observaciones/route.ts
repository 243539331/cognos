import { NextResponse } from "next/server";
import { z } from "zod";
import { obtenerUsuarioActual } from "@/lib/db/usuarioActual";
import { crearObservacion, listarObservaciones } from "@/lib/db/repositorio";

const NivelEscala = z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5)]);

const CuerpoObservacion = z.object({
  sueno: NivelEscala,
  animo: NivelEscala,
  autonomia: NivelEscala,
  // Límite generoso pero acotado: evita cuerpos de solicitud desproporcionados.
  textoLibre: z.string().max(2000).optional(),
});

export async function GET() {
  const usuario = await obtenerUsuarioActual();
  const observaciones = await listarObservaciones(usuario.id);
  return NextResponse.json({ observaciones });
}

export async function POST(req: Request) {
  const usuario = await obtenerUsuarioActual();
  const json = await req.json().catch(() => null);
  const validacion = CuerpoObservacion.safeParse(json);
  if (!validacion.success) {
    return NextResponse.json({ error: "Cuerpo inválido", detalle: validacion.error.flatten() }, { status: 400 });
  }

  const observacion = await crearObservacion(usuario.id, validacion.data);
  return NextResponse.json({ observacion }, { status: 201 });
}
