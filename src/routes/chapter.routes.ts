import {Router} from 'express';
import {
    getChapterByIdController,
    updateChapterController,
    deleteChapterController
} from '../controllers/chapter.controller';

const router = Router();

router.get('/:id', getChapterByIdController);
router.put('/:id', updateChapterController);
router.delete('/:id', deleteChapterController);

export default router;
