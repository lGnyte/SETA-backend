import { Request, Response } from 'express';
import { AIService } from '../services/ai.services';


export const rewriteParagraphController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { content } = req.body;
    if (!content || typeof content !== 'string') {
      res.status(400).json({ message: 'Content is required and must be a string' });
      return;
    }

    const rewritten = await AIService.rewriteParagraph(content);
    res.json({ rewritten });
  } catch (error) {
    console.error('Error in rewriteParagraphController:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const continueWritingHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { content } = req.body;

    if (!content || typeof content !== 'string') {
      res.status(400).json({ error: 'Invalid or missing content' });
      return;
    }

    const continuation = await AIService.continueWriting(content);
    res.json({ continuation });
  } catch (error) {
    console.error('Continue writing endpoint error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const generatePlotIdeaHandler = async (req: Request, res: Response): Promise<void> =>{
  try {
    const { genre, keywords } = req.body;

    if (!genre || typeof genre !== 'string') {
      res.status(400).json({ error: 'Missing or invalid genre' });
      return;
    }

    if (!keywords || typeof keywords !== 'string') {
      res.status(400).json({ error: 'Missing or invalid keywords' });
      return;
    }

    const plotIdea = await AIService.generatePlotIdea(genre, keywords);
    res.json({ plotIdea });
  } catch (error) {
    console.error('Plot idea endpoint error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};