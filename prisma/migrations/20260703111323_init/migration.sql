-- CreateEnum
CREATE TYPE "RolVinculo" AS ENUM ('CUIDADOR', 'PROFESIONAL');

-- CreateEnum
CREATE TYPE "EstadoVinculo" AS ENUM ('PROPUESTO', 'CONSENTIDO', 'REVOCADO');

-- CreateEnum
CREATE TYPE "ModoEvaluacion" AS ENUM ('AUTO', 'ASISTIDA');

-- CreateEnum
CREATE TYPE "EstadoContenido" AS ENUM ('BORRADOR', 'EN_REVISION', 'PUBLICADO', 'RETIRADO');

-- CreateTable
CREATE TABLE "Usuario" (
    "id" TEXT NOT NULL,
    "alias" TEXT NOT NULL,
    "anioNacimiento" INTEGER,
    "escolaridad" TEXT,
    "idioma" TEXT NOT NULL DEFAULT 'es',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vinculo" (
    "id" TEXT NOT NULL,
    "origenId" TEXT NOT NULL,
    "destinoId" TEXT NOT NULL,
    "rol" "RolVinculo" NOT NULL,
    "estado" "EstadoVinculo" NOT NULL DEFAULT 'PROPUESTO',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "revocadoEn" TIMESTAMP(3),

    CONSTRAINT "Vinculo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Consentimiento" (
    "id" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "alcance" TEXT NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "revocadoEn" TIMESTAMP(3),

    CONSTRAINT "Consentimiento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Instrumento" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "Instrumento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VersionInstrumento" (
    "id" TEXT NOT NULL,
    "instrumentoId" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "estado" "EstadoContenido" NOT NULL DEFAULT 'BORRADOR',
    "idioma" TEXT NOT NULL DEFAULT 'es',
    "licencia" JSONB NOT NULL,
    "items" JSONB NOT NULL,
    "puntuacion" JSONB NOT NULL,
    "resultado" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "VersionInstrumento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Evaluacion" (
    "id" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "versionInstrumentoId" TEXT NOT NULL,
    "modo" "ModoEvaluacion" NOT NULL,
    "vinculoAsistenteId" TEXT,
    "respuestas" JSONB NOT NULL,
    "puntajes" JSONB NOT NULL,
    "bandaResultado" TEXT NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "contexto" JSONB,

    CONSTRAINT "Evaluacion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ejercicio" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "Ejercicio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VersionEjercicio" (
    "id" TEXT NOT NULL,
    "ejercicioId" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "estado" "EstadoContenido" NOT NULL DEFAULT 'BORRADOR',
    "idioma" TEXT NOT NULL DEFAULT 'es',
    "dominioPrimario" TEXT NOT NULL,
    "dominiosSecundarios" JSONB NOT NULL,
    "principioCst" TEXT,
    "niveles" JSONB NOT NULL,
    "adaptacion" JSONB NOT NULL,
    "accesibilidad" JSONB NOT NULL,
    "contenido" JSONB NOT NULL,
    "licencia" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "VersionEjercicio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlanEstimulacion" (
    "id" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "evaluacionId" TEXT,
    "objetivos" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PlanEstimulacion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SesionEjercicio" (
    "id" TEXT NOT NULL,
    "planId" TEXT NOT NULL,
    "versionEjercicioId" TEXT NOT NULL,
    "nivel" INTEGER NOT NULL,
    "desempeno" JSONB NOT NULL,
    "completada" BOOLEAN NOT NULL DEFAULT false,
    "sincronizadaOffline" BOOLEAN NOT NULL DEFAULT false,
    "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SesionEjercicio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ObservacionCualitativa" (
    "id" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "autorId" TEXT NOT NULL,
    "escalas" JSONB NOT NULL,
    "textoLibre" TEXT,
    "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ObservacionCualitativa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AccesoAuditado" (
    "id" TEXT NOT NULL,
    "actorId" TEXT NOT NULL,
    "sobreUsuarioId" TEXT NOT NULL,
    "accion" TEXT NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AccesoAuditado_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Vinculo_origenId_idx" ON "Vinculo"("origenId");

-- CreateIndex
CREATE INDEX "Vinculo_destinoId_idx" ON "Vinculo"("destinoId");

-- CreateIndex
CREATE UNIQUE INDEX "VersionInstrumento_instrumentoId_version_key" ON "VersionInstrumento"("instrumentoId", "version");

-- CreateIndex
CREATE UNIQUE INDEX "VersionEjercicio_ejercicioId_version_key" ON "VersionEjercicio"("ejercicioId", "version");

-- AddForeignKey
ALTER TABLE "Vinculo" ADD CONSTRAINT "Vinculo_origenId_fkey" FOREIGN KEY ("origenId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vinculo" ADD CONSTRAINT "Vinculo_destinoId_fkey" FOREIGN KEY ("destinoId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Consentimiento" ADD CONSTRAINT "Consentimiento_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VersionInstrumento" ADD CONSTRAINT "VersionInstrumento_instrumentoId_fkey" FOREIGN KEY ("instrumentoId") REFERENCES "Instrumento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Evaluacion" ADD CONSTRAINT "Evaluacion_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Evaluacion" ADD CONSTRAINT "Evaluacion_versionInstrumentoId_fkey" FOREIGN KEY ("versionInstrumentoId") REFERENCES "VersionInstrumento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Evaluacion" ADD CONSTRAINT "Evaluacion_vinculoAsistenteId_fkey" FOREIGN KEY ("vinculoAsistenteId") REFERENCES "Vinculo"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VersionEjercicio" ADD CONSTRAINT "VersionEjercicio_ejercicioId_fkey" FOREIGN KEY ("ejercicioId") REFERENCES "Ejercicio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlanEstimulacion" ADD CONSTRAINT "PlanEstimulacion_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlanEstimulacion" ADD CONSTRAINT "PlanEstimulacion_evaluacionId_fkey" FOREIGN KEY ("evaluacionId") REFERENCES "Evaluacion"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SesionEjercicio" ADD CONSTRAINT "SesionEjercicio_planId_fkey" FOREIGN KEY ("planId") REFERENCES "PlanEstimulacion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SesionEjercicio" ADD CONSTRAINT "SesionEjercicio_versionEjercicioId_fkey" FOREIGN KEY ("versionEjercicioId") REFERENCES "VersionEjercicio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ObservacionCualitativa" ADD CONSTRAINT "ObservacionCualitativa_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ObservacionCualitativa" ADD CONSTRAINT "ObservacionCualitativa_autorId_fkey" FOREIGN KEY ("autorId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AccesoAuditado" ADD CONSTRAINT "AccesoAuditado_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AccesoAuditado" ADD CONSTRAINT "AccesoAuditado_sobreUsuarioId_fkey" FOREIGN KEY ("sobreUsuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
