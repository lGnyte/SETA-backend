import { Router } from 'express';
import {
  getUsersController,
  loginController,
  registerController,
} from '../controllers/user.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

// public routes
router.get('/', getUsersController);
router.post('/register', registerController);
router.post('/login', loginController);

// protected route (requires JWT)
router.get('/profile', authenticate, (req, res) => {
  res.json({ user: (req as any).user });
});

export default router;
