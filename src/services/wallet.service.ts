import { WalletRepository } from '../repositories/wallet.repository';

export const WalletService = {
  getWalletAmount: async (id: string): Promise<number> => {
    const amount = await WalletRepository.getAmountById(id);
    if (amount === null) {
      throw new Error('Wallet not found');
    }
    return amount;
  },
};