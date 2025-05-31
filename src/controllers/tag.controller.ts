import * as tagService from '../services/tag.service';
import { Request, Response } from 'express';

export async function getAllTagsController(req: Request, res: Response) {
    try {
        const tags = await tagService.getAllTags();
        res.json(tags);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch tags' });
    }
}

export async function createTagController(req: Request, res: Response) {
    const { name } = req.body;
    try {
        const tag = await tagService.createTag(name);
        res.status(201).json(tag);
    } catch (err) {
        res.status(500).json({ error: 'Failed to create tag' });
    }
}
