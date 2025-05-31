import {Router} from 'express';
import {
    getChapterByIdController,
    updateChapterController,
    deleteChapterController,
    requestChapterEditAccessController,
    getChapterEditRequestersController,
    approveChapterEditRequestController
} from '../controllers/chapter.controller';

import {getChapterPartsController,createChapterPartController} from '../controllers/chapterPart.controller';
import {authenticate} from "../middlewares/auth.middleware";

const router = Router();

router.get('/:id', getChapterByIdController);
router.put('/:id', updateChapterController);
router.delete('/:id', deleteChapterController);

router.post('/:id/parts', authenticate, createChapterPartController)
router.get('/:id/parts', getChapterPartsController);

// request edit
router.get('/:id/requestEdit', authenticate, requestChapterEditAccessController)
router.get('/:id/editRequesters', authenticate, getChapterEditRequestersController)

//POST /chapters/:chapterId/approve-edit/:userId
router.post('/:id/approveEdit/:userId', authenticate, approveChapterEditRequestController)
export default router;
