import { Router } from 'express';
import userRoutes from './user.routes';
import bookRoutes from './book.routes'
import characterRoutes from './character.routes'
import chapterRoutes from './chapter.routes';
import chapterPartRoutes from './chapterParts.routes';
import authRoutes from './auth.routes';
import genreRoutes from './genre.routes'
import tagRoutes from './tag.routes'

const router = Router();

router.use('/users', userRoutes);
router.use('/books', bookRoutes);
router.use('/characters', characterRoutes);
router.use('/chapters', chapterRoutes);
router.use('/chapterParts', chapterPartRoutes);
router.use('/genres', genreRoutes);
router.use('/tags', tagRoutes);

router.use('/auth', authRoutes);

export default router;
