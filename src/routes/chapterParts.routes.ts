import {Router} from 'express';
import { updateChapterPartController,deleteChapterPartController } from '../controllers/chapterPart.controller';
import{
  getChapterPartsController
} from '../controllers/chapterPart.controller'

const router = Router();


router.put('/:id', updateChapterPartController);
router.delete('/:id', deleteChapterPartController);
router.get('/:id/parts', getChapterPartsController);


export default router;
