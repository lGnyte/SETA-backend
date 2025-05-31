import { Prisma } from '../generated/prisma';
import { ChapterPartRepository } from "../repositories/chapterPart.repository";
export const ChapterPartService = {
    createChapterPart : (chapterId: number, authorId: number, chapterPartData : Prisma.ChapterPartCreateInput) => ChapterPartRepository.createChapterPart(chapterId, authorId, chapterPartData),
	 update: (id: number, data: Prisma.ChapterPartUpdateInput) => {
        return ChapterPartRepository.update(id, data);
    },
    delete: (id: number) => {
        return ChapterPartRepository.delete(id);
    },

     getByChapterId: (chapterId: number) => {
    return ChapterPartRepository.getByChapterId(chapterId);
  },
}