import { Router } from 'express';
import {
  getUsersController,
  loginController,
  registerController,
  getMeController
} from '../controllers/user.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

// public routes
router.get('/', getUsersController);
router.post('/register', registerController);
router.post('/login', loginController);
router.get('/me', authenticate, getMeController);

export default router;
