import { PrismaClient, Prisma } from '../generated/prisma';
import { CharacterRepository } from '../repositories/character.repository';

export const CharacterService = {
  getById: (id: number) => CharacterRepository.getById(id),

  create: (bookId: number, data: Prisma.CharacterCreateInput) => {
    return CharacterRepository.create(bookId, data);
  },

  update: (id: number, data: Prisma.CharacterUpdateInput) => {
    return CharacterRepository.update(id, data);
  },

  delete: (id: number) => {
    return CharacterRepository.delete(id);
  },
};
