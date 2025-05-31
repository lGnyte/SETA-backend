import { Router } from 'express';
import {
  getAllBooksController,
  getBookByIdController,
  createBookController,
  updateBookController,
  deleteBookController,
  patchBookController,
  createBookChapterController
} from '../controllers/book.controller';

const router = Router();

router.get('/', getAllBooksController);
router.get('/:id', getBookByIdController);
router.post('/', createBookController);
router.put('/:id', updateBookController);
router.delete('/:id', deleteBookController);
router.patch('/:id', patchBookController);
router.post('/:id/chapters', createBookChapterController)
export default router;
