import { Prisma } from '../generated/prisma';
import {ChapterPartRepository} from "../repositories/chapterPart.repository";
export const ChapterPartService = {
    createChapterPart : (chapterId: number, chapterPartData : Prisma.ChapterPartCreateInput) => ChapterPartRepository.createChapterPart(chapterId, chapterPartData),
}