import { Router } from 'express';
import {
  getAllBooksController,
  getBookByIdController,
  createBookController,
  updateBookController,
  deleteBookController,
  patchBookController,
  assignTagsController,
  assignGenresController
} from '../controllers/book.controller';

const router = Router();

router.get('/', getAllBooksController);
router.get('/:id', getBookByIdController);
router.post('/', createBookController);
router.put('/:id', updateBookController);
router.delete('/:id', deleteBookController);
router.patch('/:id', patchBookController);
router.post('/:id/tags', assignTagsController);
router.post('/:id/genres', assignGenresController);

export default router;
