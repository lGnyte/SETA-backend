import { PrismaClient } from '../generated/prisma';
const prisma = new PrismaClient();

export async function getAllGenres() {
    return prisma.genre.findMany();
}
