import {Router} from 'express';
import {
    getChapterByIdController,
    updateChapterController,
    deleteChapterController
} from '../controllers/chapter.controller';

import {createChapterPartController} from '../controllers/chapterPart.controller';
import {authenticate} from "../middlewares/auth.middleware";

const router = Router();

router.get('/:id', getChapterByIdController);
router.put('/:id', updateChapterController);
router.delete('/:id', deleteChapterController);

router.post('/:id/parts', authenticate, createChapterPartController)

export default router;
