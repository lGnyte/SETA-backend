import { Router } from 'express';
import {
  getAllBooksController,
  getBookByIdController,
  createBookController,
  updateBookController,
  deleteBookController,
  patchBookController,
  createBookChapterController,
  getBookChaptersController,
  getCharactersByBookIdController,
  assignTagsController,
  assignGenresController,
  uploadBookCoverController,
  getMyBooks
} from '../controllers/book.controller';
import {
 createCharacterController
} from '../controllers/character.controller';
import {authenticate} from "../middlewares/auth.middleware";

const router = Router();

router.get('/', getAllBooksController);
router.get('/:id', getBookByIdController);
router.post('/', createBookController);
router.put('/:id', updateBookController);
router.delete('/:id', deleteBookController);
router.patch('/:id', patchBookController);
router.post('/:bookId/characters', createCharacterController);
router.post('/:id/chapters', createBookChapterController)
router.get('/:id/chapters', getBookChaptersController);
router.get('/:id/characters', getCharactersByBookIdController);
router.post('/:id/tags', assignTagsController);
router.post('/:id/genres', assignGenresController);
router.post('/:id/cover', uploadBookCoverController);
router.get('/mybooks', authenticate, getMyBooks);

export default router;
