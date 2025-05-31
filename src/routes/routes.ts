import { Router } from 'express';
import userRoutes from './user.routes';
import bookRoutes from './book.routes'
import characterRoutes from './character.routes'
import chapterRoutes from './chapter.routes';

const router = Router();

router.use('/users', userRoutes);
router.use('/books', bookRoutes);
router.use('/characters', characterRoutes);
router.use('/chapters', chapterRoutes);

export default router;
