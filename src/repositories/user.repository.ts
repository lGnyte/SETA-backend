import { PrismaClient, Prisma } from '../generated/prisma'

const prisma = new PrismaClient();

export const getAllUsers = async () => {
  return prisma.user.findMany();
};
