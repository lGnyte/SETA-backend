import { Request, Response } from 'express';
import { WalletService } from '../services/wallet.service';
import {sendResponse} from "../utils/response";

export const getWalletAmountController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId = (req as any).user?.id;

  if (!userId) {
    sendResponse(res, null, false, 'Unauthorized', 401);
  }

  try {
    const amount = await WalletService.getWalletAmount(userId);
    res.json({ amount });
  } catch (error) {
    console.error(`Error fetching wallet amount:`, error);
    res.status(404).json({ message: 'Wallet not found' });
  }
};