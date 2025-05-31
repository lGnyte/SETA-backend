import { Request, Response } from 'express';
import {ChapterPartService} from "../services/chapterPart.service";

export const createChapterPartController = async (req: Request, res: Response) => {
    try {
        const chapterId = Number(req.params.id);
        if (isNaN(chapterId)) {
            res.status(400).json({message: 'Invalid chapter ID'});
        }

        // Assuming the request body contains chapter data except bookId
        const chapterPartData = req.body;

        const newChapterPart = await ChapterPartService.createChapterPart(chapterId, chapterPartData);

        res.status(201).json(newChapterPart);
    } catch (error) {
        console.error('Failed to create chapter part:', error);
        res.status(500).json({message: 'Internal server error'});
    }
}