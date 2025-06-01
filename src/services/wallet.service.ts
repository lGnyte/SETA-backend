import {PrismaClient, Prisma} from '../generated/prisma';
const prisma = new PrismaClient();

export const WalletService = {
  getWalletAmount: async (userId: number): Promise<number> => {
    if (!userId) {
      throw new Error('Unauthorized');
    }
    const userWithWallet = await prisma.user.findUnique({
      where: { id: userId },
      include: { wallet: true },
    });

    if (!userWithWallet) {
      throw new Error('User not found');
    }

    if (!userWithWallet.wallet) {
      throw new Error('Wallet not found');
    }

    return userWithWallet.wallet.amount;
  },
};