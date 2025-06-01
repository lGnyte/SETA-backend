import { Request, Response } from 'express';
import { GenreService } from '../services/genre.service';
import {sendResponse} from "../utils/response";

export const getAllGenres = async (req: Request, res: Response): Promise<void> => {
  try {
    const genres = await GenreService.getAllGenres();
    sendResponse(res, genres, true, "", 200);
  } catch (error) {
    console.error('[GET /genres]', error);
    res.status(500).json();
    sendResponse(res, null, false, 'Failed to fetch genres', 500);
  }
};

export const createGenre = async (req: Request, res: Response): Promise<void> => {
  const { name } = req.body;

  if (!name || typeof name !== 'string') {
    res.status(400).json({ error: 'Genre name is required' });
    return;
  }

  try {
    const genre = await GenreService.createGenre(name);
    res.status(201).json(genre);
  } catch (error) {
    console.error('[POST /genres]', error);
    res.status(500).json({ error: (error as Error).message || 'Failed to create genre' });
  }
};