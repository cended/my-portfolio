// src/lib/prisma.ts
// Prisma client singleton.
//
// WHY: In development, Next.js hot-reloads your code frequently.
// Without this pattern, you'd create hundreds of database connections.
// This ensures only ONE Prisma client exists across all requests.
//
// PHP equivalent: like a persistent PDO connection you reuse everywhere.

import { PrismaClient } from "@prisma/client";

// Declare a global variable to hold the Prisma instance
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Create or reuse the existing Prisma client
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ["query"], // logs SQL queries in development — helpful for learning!
  });

// In development, save the client to global so it survives hot reloads
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
