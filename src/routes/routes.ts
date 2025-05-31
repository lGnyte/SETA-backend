import { Router } from 'express';
import userRoutes from './user.routes';
import chapterRoutes from './chapter.routes';

const router = Router();

router.use('/users', userRoutes);
router.use('/chapters', chapterRoutes);

export default router;
