import { PrismaClient } from "@prisma/client";

export const PRISMA = new PrismaClient({
    log: ["query", "error", "warn", "info"],
});