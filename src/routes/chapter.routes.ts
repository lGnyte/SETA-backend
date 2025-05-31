import {Router} from 'express';
import {
    getChapterByIdController,
    updateChapterController,
    deleteChapterController
} from '../controllers/chapter.controller';

import {createChapterPartController} from '../controllers/chapterPart.controller';

const router = Router();

router.get('/:id', getChapterByIdController);
router.put('/:id', updateChapterController);
router.delete('/:id', deleteChapterController);

router.post('/:id/parts', createChapterPartController)

export default router;
