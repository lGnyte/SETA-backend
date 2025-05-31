import { Request, Response } from 'express';
import { getChapterByIdAsync } from '../services/chapter.service';

export const getChapterByIdController = async (_req: Request, res: Response) => {
    try {
        const { id } = _req.params;
        if (!id || isNaN(Number(id))) {
            res.status(400).json({ message: 'Invalid or missing id parameter' });
        }
        const chapter = await getChapterByIdAsync(Number(id));
        res.json(chapter);
    } catch (err) {
        console.error('[GET /users]', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};
