import { Router } from 'express';
import { getWalletAmountController } from '../controllers/wallet.controller';

const router = Router();

router.get('/:id/amount', getWalletAmountController);

export default router;
