import { Router } from 'express';
import { getMeController } from '../controllers/auth.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

router.get('/me', authenticate, getMeController);

export default router;
