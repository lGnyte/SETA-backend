import { Router } from 'express';
import { getWalletAmountController } from '../controllers/wallet.controller';
import {authenticate} from "../middlewares/auth.middleware";

const router = Router();

router.get('/', authenticate, getWalletAmountController);

export default router;
