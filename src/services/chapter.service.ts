import {getChapterById, updateChapter,deleteChapter} from '../repositories/chapter.repository';
import { Prisma } from '../generated/prisma';

export const ChapterService = {
    getChapterByIdAsync: (id: number) => getChapterById(id),
    update: (id: number, data: Prisma.ChapterUpdateInput) => updateChapter(id, data),
    delete: (id: number) => deleteChapter(id),
}
