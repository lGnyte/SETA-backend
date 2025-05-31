import { Request, Response } from 'express';
import { ChapterPartService } from "../services/chapterPart.service";

export const createChapterPartController = async (req: Request, res: Response) => {
  try {
    const chapterId = Number(req.params.id);
    if (isNaN(chapterId)) {
      res.status(400).json({ message: 'Invalid chapter ID' });
      return;
    }

    const chapterPartData = req.body;

    const newChapterPart = await ChapterPartService.createChapterPart(chapterId, chapterPartData);

    res.status(201).json(newChapterPart);
  } catch (error) {
    console.error('Failed to create chapter part:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

export const updateChapterPartController = async (req: Request, res: Response): Promise<void> => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ message: 'Invalid chapter part ID' });
    return;
  }

  const data = req.body;

  try {
    const updatedPart = await ChapterPartService.update(id, data);
    res.json(updatedPart);
  } catch (error: unknown) {
    console.error(`[PUT /chapter-parts/${id}]`, error);
    if ((error as any).code === 'P2025') {
      res.status(404).json({ message: 'Chapter part not found' });
    } else {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};

export const deleteChapterPartController = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ message: 'Invalid chapter part ID' });
    return;
  }

  try {
    await ChapterPartService.delete(id);
    res.status(204).send(); // 204 No Content on successful delete
  } catch (error: any) {
    console.error(`[DELETE /chapter-parts/${id}]`, error);
    if (error.code === 'P2025') {
      // Prisma: record not found
      res.status(404).json({ message: 'Chapter part not found' });
    } else {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}

export const getChapterPartsController = async (req: Request, res: Response): Promise<void> => {
  const chapterId = Number(req.params.id);
  if (isNaN(chapterId)) {
    res.status(400).json({ message: 'Invalid chapter ID' });
    return;
  }

  try {
    const parts = await ChapterPartService.getByChapterId(chapterId);
    res.json(parts);
  } catch (error) {
    console.error(`[GET /chapters/${chapterId}/parts]`, error);
    res.status(500).json({ message: 'Internal server error' });
  }
};