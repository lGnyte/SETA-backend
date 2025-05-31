import { Request, Response } from 'express';
import {ChapterService} from '../services/chapter.service';

export const getChapterByIdController = async (_req: Request, res: Response) => {
    try {
        const { id } = _req.params;
        if (!id || isNaN(Number(id))) {
            res.status(400).json({ message: 'Invalid or missing id parameter' });
        }
        const chapter = await ChapterService.getChapterByIdAsync(Number(id));
        res.json(chapter);
    } catch (err) {
        console.error('[GET /users]', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const updateChapterController = async (req: Request, res: Response): Promise<void> => {
    const id = Number(req.params.id);
    if (isNaN(id)) {
        res.status(400).json({ message: 'Invalid chapter ID' });
        return;
    }

    try {
        const chapter = await ChapterService.update(id, req.body);
        res.json(chapter);
    } catch (err) {
        console.error(`[PUT /chapters/${id}]`, err);
        res.status(400).json({ message: 'Failed to update chapter', error: err });
    }
};

export const deleteChapterController = async (req: Request, res: Response): Promise<void> => {
    const id = Number(req.params.id);
    if (isNaN(id)) {
        res.status(400).json({ message: 'Invalid chapter ID' });
        return;
    }

    try {
        await ChapterService.delete(id);
        res.status(204).send(); // 204 No Content on successful delete
    } catch (err) {
        console.error(`[DELETE /chapters/${id}]`, err);
        res.status(400).json({ message: 'Failed to delete chapter', error: err });
    }
};