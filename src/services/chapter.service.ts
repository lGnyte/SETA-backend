import {
    getChapterById,
    updateChapter,
    deleteChapter,
    requestChapterEditAccess,
    getChapterEditRequesters,
    approveChapterEditRequest,
    denyEditAccessRequest, ensureChapterExists,
    finishChapter
} from '../repositories/chapter.repository';
import { Prisma } from '../generated/prisma';
import {ChapterPartRepository} from "../repositories/chapterPart.repository";
import {AIService} from "./ai.services";

export const ChapterService = {
    getChapterByIdAsync: (id: number) => getChapterById(id),
    update: (id: number, data: Prisma.ChapterUpdateInput) => updateChapter(id, data),
    delete: (id: number) => deleteChapter(id),
    requestChapterEditAccess : (chapterId: number, userId: number) => requestChapterEditAccess(chapterId, userId),
    getChapterEditRequestersController : (chapterId : number) => getChapterEditRequesters(chapterId),
    approveChapterEditRequest : (chapterId: number, userId: number) => approveChapterEditRequest(chapterId, userId),
    denyEditAccessRequest: (chapterId: number, userId: number) => denyEditAccessRequest(chapterId, userId),
    async connectParts(chapterId : number) {
        await ensureChapterExists(chapterId);
        const parts = await ChapterPartRepository.getByChapterId(chapterId);
        const contents = parts.map(part => part.content);
        let chapterContent = await AIService.bindChapterParts(contents);

        await updateChapter(chapterId, { content: chapterContent });
    },
    finishChapter : (chapterId:number) => finishChapter(chapterId)
}
