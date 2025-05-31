import express from 'express';
import { getAllGenres } from '../controllers/genre.controller';

const router = express.Router();
router.get('/', getAllGenres);
export default router;
