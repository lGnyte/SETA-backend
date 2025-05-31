import { PrismaClient, Prisma } from '../generated/prisma';

const prisma = new PrismaClient();

export const CharacterRepository = {
  getById: (id: number) => {
    return prisma.character.findUnique({
      where: { id },
      include: {
        book: true,
        traits: true,
      },
    });
  },

  create: (bookId: number, data: Prisma.CharacterCreateInput) => {
    return prisma.character.create({
      data: {
        ...data,
        book: { connect: { id: bookId } },
      },
    });
  },

  update: (id: number, data: Prisma.CharacterUpdateInput) => {
    return prisma.character.update({
      where: { id },
      data,
    });
  },

  delete: (id: number) => {
    return prisma.character.delete({
      where: { id },
    });
  },

  ensureCharacterExists: async (characterId: number) => {
    const character = await prisma.character.findUnique({
      where: { id: characterId },
      select: { id: true },
    });

    if (!character) {
      throw new Error(`Character with ID ${characterId} not found`);
    }

    return true;
  },
};
