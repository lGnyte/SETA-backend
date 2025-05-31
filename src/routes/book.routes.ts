import { Router } from 'express';
import {
  getAllBooksController,
  getBookByIdController,
  createBookController,
  updateBookController,
  deleteBookController,
  patchBookController,
  createBookChapterController
  assignTagsController,
  assignGenresController
} from '../controllers/book.controller';
import {
 createCharacterController
} from '../controllers/character.controller';

const router = Router();

router.get('/', getAllBooksController);
router.get('/:id', getBookByIdController);
router.post('/', createBookController);
router.put('/:id', updateBookController);
router.delete('/:id', deleteBookController);
router.patch('/:id', patchBookController);
router.post('/:bookId/characters', createCharacterController);
router.post('/:id/chapters', createBookChapterController)
router.post('/:id/tags', assignTagsController);
router.post('/:id/genres', assignGenresController);

export default router;
