import { Request, Response } from 'express';
import * as genreService from '../services/genre.service';

export async function getAllGenres(req: Request, res: Response) {
    try {
        const genres = await genreService.getAllGenres();
        res.json(genres);
    } catch {
        res.status(500).json({ error: 'Failed to fetch genres' });
    }
}
