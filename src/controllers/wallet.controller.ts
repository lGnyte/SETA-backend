import { Request, Response } from 'express';
import { WalletService } from '../services/wallet.service';

export const getWalletAmountController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const walletId = req.params.id;

  try {
    const amount = await WalletService.getWalletAmount(walletId);
    res.json({ amount });
  } catch (error) {
    console.error(`Error fetching wallet amount:`, error);
    res.status(404).json({ message: 'Wallet not found' });
  }
};