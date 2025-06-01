import { PrismaClient, Prisma } from '../generated/prisma';

const prisma = new PrismaClient();
export const WalletRepository = {
  getAmountById: async (id: string): Promise<number | null> => {
    const wallet = await prisma.wallet.findUnique({
      where: { id },
      select: { amount: true },
    });

    return wallet?.amount ?? null;
  },
};