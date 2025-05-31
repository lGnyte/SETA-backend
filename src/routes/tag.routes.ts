import { Router } from 'express';
import { getAllTagsController, createTagController } from '../controllers/tag.controller';

const router = Router();

router.get('/', getAllTagsController);
router.post('/tags', createTagController);

export default router;
