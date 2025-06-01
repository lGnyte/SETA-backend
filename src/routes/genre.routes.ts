import express from 'express';
import { getAllGenres,createGenre  } from '../controllers/genre.controller';

const router = express.Router();
router.get('/', getAllGenres);
router.post('/', createGenre);
export default router;
