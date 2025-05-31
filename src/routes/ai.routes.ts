import { Router } from 'express';
import { rewriteParagraphController,continueWritingHandler,generatePlotIdeaHandler} from '../controllers/ai.controller';

const router = Router();

router.post('/rewrite', rewriteParagraphController);
router.post('/continue', continueWritingHandler);
router.post('/plot-idea', generatePlotIdeaHandler);

export default router;