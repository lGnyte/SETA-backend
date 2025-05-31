import { Router } from 'express';
import userRoutes from './user.routes';
import bookRoutes from './book.routes'
import genreRoutes from './genre.routes'
import tagRoutes from './tag.routes'

const router = Router();

router.use('/users', userRoutes);
router.use('/books', bookRoutes);
router.use('/genres', genreRoutes);
router.use('/tags', tagRoutes);

export default router;
