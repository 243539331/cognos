import { NextResponse } from "next/server";
import { z } from "zod";
import { obtenerUsuarioActual } from "@/lib/db/usuarioActual";
import { crearEvaluacion, listarEvaluaciones } from "@/lib/db/repositorio";

const CuerpoEvaluacion = z.object({
  instrumentoId: z.string().min(1),
  version: z.string().min(1),
  modo: z.enum(["AUTO", "ASISTIDA"]),
  respuestas: z.array(z.object({ itemId: z.string(), valor: z.number(), tiempoMs: z.number().optional() })),
  demografia: z.object({ edad: z.number().optional(), escolaridad: z.string().optional() }),
  resultado: z.object({
    puntajeTotal: z.number(),
    puntajesPorDominio: z.array(z.object({ dominio: z.string(), puntaje: z.number() })),
    bandaId: z.string(),
    bandaEtiqueta: z.string(),
    mensajeUsuario: z.string(),
  }),
});

export async function GET() {
  const usuario = await obtenerUsuarioActual();
  const evaluaciones = await listarEvaluaciones(usuario.id);
  return NextResponse.json({ evaluaciones });
}

export async function POST(req: Request) {
  const usuario = await obtenerUsuarioActual();
  const json = await req.json().catch(() => null);
  const validacion = CuerpoEvaluacion.safeParse(json);
  if (!validacion.success) {
    return NextResponse.json({ error: "Cuerpo inválido", detalle: validacion.error.flatten() }, { status: 400 });
  }

  try {
    const evaluacion = await crearEvaluacion(usuario.id, validacion.data);
    return NextResponse.json({ evaluacion }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
