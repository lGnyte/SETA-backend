import {
    getChapterById,
    updateChapter,
    deleteChapter,
    requestChapterEditAccess,
    getChapterEditRequesters,
    approveChapterEditRequest,
    denyEditAccessRequest
} from '../repositories/chapter.repository';
import { Prisma } from '../generated/prisma';

export const ChapterService = {
    getChapterByIdAsync: (id: number) => getChapterById(id),
    update: (id: number, data: Prisma.ChapterUpdateInput) => updateChapter(id, data),
    delete: (id: number) => deleteChapter(id),
    requestChapterEditAccess : (chapterId: number, userId: number) => requestChapterEditAccess(chapterId, userId),
    getChapterEditRequestersController : (chapterId : number) => getChapterEditRequesters(chapterId),
    approveChapterEditRequest : (chapterId: number, userId: number) => approveChapterEditRequest(chapterId, userId),
    denyEditAccessRequest: (chapterId: number, userId: number) => denyEditAccessRequest(chapterId, userId),
}
