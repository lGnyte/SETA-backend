import {Request, Response} from 'express';
import {ChapterService} from '../services/chapter.service';
import {sendResponse} from '../utils/response';

export const getChapterByIdController = async (_req: Request, res: Response): Promise<void> => {
    try {
        const {id} = _req.params;
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
        sendResponse(res, null, false, `Internal server error. Reason: ${err instanceof Error ? err.message : String(err)}`, 500);
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
        sendResponse(res, null, false, `Failed to update chapter. Reason: ${err instanceof Error ? err.message : String(err)}`, 400);
    }
};

export const finishChapterController = async (req: Request, res: Response): Promise<void> => {
    const id = Number(req.params.id);
    if (isNaN(id)) {
        sendResponse(res, null, false, 'Invalid chapter ID', 400);
        return;
    }

    try {
        const chapter = await ChapterService.finishChapter(id);
        sendResponse(res, chapter);
    } catch (err) {
        console.error(`[PUT /chapters/${id}]`, err);
        sendResponse(res, null, false, `Failed to update chapter. Reason: ${err instanceof Error ? err.message : String(err)}`, 400);
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
        res.status(204).send();
    } catch (err) {
        console.error(`[DELETE /chapters/${id}]`, err);
        sendResponse(res, null, false, `Failed to delete chapter. Reason: ${err instanceof Error ? err.message : String(err)}`, 400);
    }
};

export const requestChapterEditAccessController = async (req: Request, res: Response): Promise<void> => {
    const userId = (req as any).user?.id;

    if (!userId) {
        sendResponse(res, null, false, 'Unauthorized', 401);
        return;
    }

    const chapterId = Number(req.params.id);
    if (isNaN(chapterId)) {
        res.status(400).json({message: 'Invalid chapter ID'});
        return;
    }

    try {
        await ChapterService.requestChapterEditAccess(chapterId, userId);
        res.status(204).send();
    } catch (err) {
        console.error(`[GET /chapters/${chapterId}/requestEdit]`, err);
        sendResponse(res, null, false, `Failed to request edit access to chapter. Reason: ${err instanceof Error ? err.message : String(err)}`, 400);
    }
};

export const getChapterEditRequestersController = async (req: Request, res: Response): Promise<void> => {
    const userId = (req as any).user?.id;

    if (!userId) {
        sendResponse(res, null, false, 'Unauthorized', 401);
        return;
    }

    const chapterId = Number(req.params.id);
    if (isNaN(chapterId)) {
        sendResponse(res, null, false, 'Invalid chapter ID', 400);
        return;
    }

    try {
        const result = await ChapterService.getChapterEditRequestersController(chapterId);
        sendResponse(res, result);
    } catch (err) {
        console.error(`[GET /chapters/${chapterId}/editRequesters]`, err);
        sendResponse(res, null, false, `Failed to get edit requesters from chapter. Reason: ${err instanceof Error ? err.message : String(err)}`, 400);
    }
};

export const approveChapterEditRequestController = async (req: Request, res: Response): Promise<void> => {
    const chapterId = Number(req.params.id);
    const userId = Number(req.params.userId);

    if (isNaN(chapterId) || isNaN(userId)) {
        sendResponse(res, null, false, 'Invalid chapter ID or user ID', 400);
        return;
    }

    try {
        const result = await ChapterService.approveChapterEditRequest(chapterId, userId);
        sendResponse(res, result);
    } catch (err) {
        console.error(`[POST /chapters/${chapterId}/approveEdit/${userId}]`, err);
        sendResponse(res, null, false, `Failed to approve edit access to chapter. Reason: ${err instanceof Error ? err.message : String(err)}`, 500);
    }
};

export const denyEditAccessRequestController = async (req: Request, res: Response): Promise<void> => {
    const chapterId = Number(req.params.id);
    const userId = Number(req.params.userId);

    if (isNaN(chapterId) || isNaN(userId)) {
        sendResponse(res, null, false, 'Invalid chapter ID or user ID', 400);
        return;
    }

    try {
        const result = await ChapterService.denyEditAccessRequest(chapterId, userId);
        sendResponse(res, result);
    } catch (err) {
        console.error(`[Delete /chapters/${chapterId}/denyAccess/${userId}]`, err);
        sendResponse(res, null, false, `Failed to deny edit access to chapter. Reason: ${err instanceof Error ? err.message : String(err)}`, 500);
    }
}

export const connectPartsController = async (req: Request, res: Response) => {
    const chapterId = Number(req.params.id);
    if (isNaN(chapterId)) {
        sendResponse(res, null, false, 'Invalid chapter ID', 400);
        return;
    }

    try {
        const result = await ChapterService.connectParts(chapterId);
        sendResponse(res, result);
    } catch (err) {
        console.error(`[Get /chapters/${chapterId}/connectParts}]`, err);
        sendResponse(res, null, false, `Failed to connect chapter parts. Reason: ${err instanceof Error ? err.message : String(err)}`, 500);
    }
}