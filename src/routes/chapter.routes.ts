import {Router} from 'express';
import {
    getChapterByIdController,
    updateChapterController,
    deleteChapterController,
    requestChapterEditAccessController,
    getChapterEditRequestersController,
    approveChapterEditRequestController,
    denyEditAccessRequestController
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

router.post('/:id/approveEdit/:userId', authenticate, approveChapterEditRequestController)
router.delete('/:id/denyAccess/:userId', authenticate, denyEditAccessRequestController)
export default router;
