
import { PrismaClient } from '../generated/prisma';
const prisma = new PrismaClient();

export const GenreRepository = {
  getAllGenres: async () => {
    return prisma.genre.findMany();
  },

  create: async (name: string) => {
    return prisma.genre.create({
      data: { name },
    });
  },
};