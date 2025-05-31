import * as tagRepository from '../repositories/tag.repository';

export function getAllTags() {
    return tagRepository.getAllTags();
}

export function createTag(name: string) {
    return tagRepository.createTag(name);
}
