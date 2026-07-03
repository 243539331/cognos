// Sincroniza el catálogo (Instrumento/VersionInstrumento, Ejercicio/VersionEjercicio)
// en la base de datos a partir del contenido YAML validado en content/. Reutiliza
// el mismo loader que usa la aplicación (misma fuente de verdad de qué está
// publicable: estado="publicado" + licencia verificada — ver docs/08).
import { listarInstrumentosPublicables, listarEjerciciosPublicables } from "../src/content/loader";
import { prisma } from "../src/lib/db/prisma";

async function main() {
  const instrumentos = listarInstrumentosPublicables();
  for (const instrumento of instrumentos) {
    await prisma.instrumento.upsert({
      where: { id: instrumento.id },
      update: { nombre: instrumento.nombre },
      create: { id: instrumento.id, nombre: instrumento.nombre },
    });
    await prisma.versionInstrumento.upsert({
      where: { instrumentoId_version: { instrumentoId: instrumento.id, version: instrumento.version } },
      update: {
        estado: instrumento.estado === "publicado" ? "PUBLICADO" : "BORRADOR",
        idioma: instrumento.idioma,
        licencia: instrumento.licencia,
        items: instrumento.items,
        puntuacion: instrumento.puntuacion,
        resultado: instrumento.resultado,
      },
      create: {
        instrumentoId: instrumento.id,
        version: instrumento.version,
        estado: instrumento.estado === "publicado" ? "PUBLICADO" : "BORRADOR",
        idioma: instrumento.idioma,
        licencia: instrumento.licencia,
        items: instrumento.items,
        puntuacion: instrumento.puntuacion,
        resultado: instrumento.resultado,
      },
    });
    console.log(`✓ Instrumento sembrado: ${instrumento.id}@${instrumento.version}`);
  }

  const ejercicios = listarEjerciciosPublicables();
  for (const ejercicio of ejercicios) {
    await prisma.ejercicio.upsert({
      where: { id: ejercicio.id },
      update: { nombre: ejercicio.nombre },
      create: { id: ejercicio.id, nombre: ejercicio.nombre },
    });
    await prisma.versionEjercicio.upsert({
      where: { ejercicioId_version: { ejercicioId: ejercicio.id, version: ejercicio.version } },
      update: {
        estado: ejercicio.estado === "publicado" ? "PUBLICADO" : "BORRADOR",
        idioma: ejercicio.idioma,
        dominioPrimario: ejercicio.dominio_primario,
        dominiosSecundarios: ejercicio.dominios_secundarios,
        principioCst: ejercicio.principio_cst,
        niveles: ejercicio.niveles,
        adaptacion: ejercicio.adaptacion,
        accesibilidad: ejercicio.accesibilidad,
        contenido: ejercicio.contenido as unknown as object,
        licencia: ejercicio.licencia,
      },
      create: {
        ejercicioId: ejercicio.id,
        version: ejercicio.version,
        estado: ejercicio.estado === "publicado" ? "PUBLICADO" : "BORRADOR",
        idioma: ejercicio.idioma,
        dominioPrimario: ejercicio.dominio_primario,
        dominiosSecundarios: ejercicio.dominios_secundarios,
        principioCst: ejercicio.principio_cst,
        niveles: ejercicio.niveles,
        adaptacion: ejercicio.adaptacion,
        accesibilidad: ejercicio.accesibilidad,
        contenido: ejercicio.contenido as unknown as object,
        licencia: ejercicio.licencia,
      },
    });
    console.log(`✓ Ejercicio sembrado: ${ejercicio.id}@${ejercicio.version}`);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
