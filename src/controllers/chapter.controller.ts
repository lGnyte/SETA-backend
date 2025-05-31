import { Request, Response } from 'express';
import { ChapterService } from '../services/chapter.service';
import { sendResponse } from '../utils/response';  // import your sendResponse here

export const getChapterByIdController = async (_req: Request, res: Response): Promise<void> => {
    try {
        const { id } = _req.params;
        if (!id || isNaN(Number(id))) {
            sendResponse(res, null, false, 'Invalid or missing id parameter', 400);
            return;
        }
        const chapter = await ChapterService.getChapterByIdAsync(Number(id));
        if (!chapter) {
            sendResponse(res, null, false, 'Chapter not found', 404);
            return;
        }
        sendResponse(res, chapter);
    } catch (err) {
        console.error('[GET /chapters/:id]', err);
        sendResponse(res, null, false, 'Internal server error', 500);
    }
};

export const updateChapterController = async (req: Request, res: Response): Promise<void> => {
    const id = Number(req.params.id);
    if (isNaN(id)) {
        sendResponse(res, null, false, 'Invalid chapter ID', 400);
        return;
    }

    try {
        const chapter = await ChapterService.update(id, req.body);
        sendResponse(res, chapter);
    } catch (err) {
        console.error(`[PUT /chapters/${id}]`, err);
        sendResponse(res, null, false, 'Failed to update chapter', 400);
    }
};

export const deleteChapterController = async (req: Request, res: Response): Promise<void> => {
    const id = Number(req.params.id);
    if (isNaN(id)) {
        sendResponse(res, null, false, 'Invalid chapter ID', 400);
        return;
    }

    try {
        await ChapterService.delete(id);
        // For 204 No Content, no response body
        res.status(204).send();
    } catch (err) {
        console.error(`[DELETE /chapters/${id}]`, err);
        sendResponse(res, null, false, 'Failed to delete chapter', 400);
    }
};
