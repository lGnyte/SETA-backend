import {Router} from 'express';
import {
    getChapterByIdController,
    updateChapterController,
    deleteChapterController,
    requestChapterEditAccessController,
    getChapterEditRequestersController,
    approveChapterEditRequestController,
    denyEditAccessRequestController,
    connectPartsController,
    finishChapterController
} from '../controllers/chapter.controller';

import {getChapterPartsController,createChapterPartController} from '../controllers/chapterPart.controller';
import {authenticate} from "../middlewares/auth.middleware";

const router = Router();

router.get('/:id', getChapterByIdController);
router.put('/:id', updateChapterController);
router.get('/:id/finish', finishChapterController);
router.delete('/:id', deleteChapterController);

router.post('/:id/parts', authenticate, createChapterPartController)
router.get('/:id/parts', getChapterPartsController);

// request edit
router.post('/:id/requestEdit', authenticate, requestChapterEditAccessController)
router.get('/:id/editRequesters', authenticate, getChapterEditRequestersController)

router.post('/:id/approveEdit/:userId', authenticate, approveChapterEditRequestController)
router.delete('/:id/denyAccess/:userId', authenticate, denyEditAccessRequestController)

//
router.get('/:id/connectParts', connectPartsController)
export default router;
