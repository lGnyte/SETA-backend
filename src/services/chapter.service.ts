import {getChapterById} from '../repositories/chapter.repository';

export const getChapterByIdAsync = async (id : number) => {
    return await getChapterById(id);
};
