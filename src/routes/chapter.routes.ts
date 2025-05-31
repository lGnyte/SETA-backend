import { Router } from 'express';
import { getChapterByIdController } from '../controllers/chapter.controller';

const router = Router();

router.get('/:id', getChapterByIdController); // Or .get('/', ...) if using query param

export default router;
