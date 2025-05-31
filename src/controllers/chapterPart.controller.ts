import { Request, Response } from 'express';
import { ChapterPartService } from "../services/chapterPart.service";
import { sendResponse } from '../utils/response';

export const createChapterPartController = async (req: Request, res: Response): Promise<void> => {
    try {
        const chapterId = Number(req.params.id);
        if (isNaN(chapterId)) {
            sendResponse(res, null, false, 'Invalid chapter ID', 400);
            return;
        }

        const chapterPartData = req.body;
        const newChapterPart = await ChapterPartService.createChapterPart(chapterId, chapterPartData);

        sendResponse(res, newChapterPart, true, null, 201);
    } catch (error) {
        console.error('Failed to create chapter part:', error);
        sendResponse(res, null, false, 'Internal server error', 500);
    }
};
