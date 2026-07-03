import { PrismaClient } from "@prisma/client";

// Patrón estándar de Next.js para evitar agotar conexiones en dev (hot-reload
// crearía un PrismaClient nuevo en cada recarga si no se reutiliza vía global).
const globalParaPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma = globalParaPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalParaPrisma.prisma = prisma;
}
