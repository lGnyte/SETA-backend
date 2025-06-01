import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export const AIService = {
  rewriteParagraph: async (content: string): Promise<string> => {
    const promptText = `Automatically detect the language of the text below (Romanian or English) and rewrite it while preserving the original tone, voice, and meaning.

Enhance the clarity, flow, and naturalness of the expression. Where appropriate, subtly expand or enrich the ideas to make the text more engaging, expressive, and well-written — without significantly altering its message or style.

Return only the rewritten text. Do not include any explanations, comments, or formatting.
\n\n${content}`;

    try {
      const model = genAI.getGenerativeModel({ 
        model: 'gemini-1.5-flash',
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 256,
          candidateCount: 1
        }
      });
      
      const result = await model.generateContent(promptText);
      const response = result.response;
      const text = response.text();

      if (!text || text.trim().length === 0) {
        throw new Error('No response from AI');
      }

      return text.trim();

    } catch (error) {
      console.error('Error calling AI service:', error);
      throw new Error('Failed to rewrite paragraph');
    }
  },

    continueWriting: async (content: string): Promise<string> => {
    const promptText = `Continue writing the following text naturally and coherently, preserving the style and tone:\n\n${content}`;

    try {
      const model = genAI.getGenerativeModel({ 
        model: 'gemini-1.5-flash',
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 256,
          candidateCount: 1
        }
      });

      const result = await model.generateContent(promptText);
      const response = result.response;
      const text = response.text();

      if (!text || text.trim().length === 0) {
        throw new Error('No response from AI');
      }

      return text.trim();

    } catch (error) {
      console.error('Error calling AI continue service:', error);
      throw new Error('Failed to continue writing');
    }
  },
  generatePlotIdea: async (keywords: string): Promise<string> => {
    const promptText = `Generate an original and engaging plot idea based on the following input:

Keywords/Theme: ${keywords}

The plot idea should be creative, concise, and inspiring for a story writer.
Return only the plot idea text.`;

    try {
      const model = genAI.getGenerativeModel({ 
        model: 'gemini-1.5-flash',
        generationConfig: {
          temperature: 0.8,
          maxOutputTokens: 500,
          candidateCount: 1
        }
      });

      const result = await model.generateContent(promptText);
      const response = result.response;
      const text = response.text();

      if (!text || text.trim().length === 0) {
        throw new Error('No response from AI');
      }

      return text.trim();

    } catch (error) {
      console.error('Error generating plot idea:', error);
      throw new Error('Failed to generate plot idea');
    }
  },

  bindChapterParts: async (chapterParts: string[]): Promise<string> => {
    const promptText = `Automatically detect the language of the following paragraphs (Romanian or English) and seamlessly combine them into a single coherent chapter, preserving the original order.

Enhance the clarity, flow, and naturalness of the text. Subtly expand or enrich ideas where necessary to improve coherence and engagement, while maintaining the original tone, voice, and meaning.

Return only the rewritten chapter as continuous text, without any explanations, comments, or special formatting.
\n\n${chapterParts.join('\n\n')}`;

    try {
      const model = genAI.getGenerativeModel({
        model: 'gemini-1.5-flash',
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 256,
          candidateCount: 1
        }
      });

      const result = await model.generateContent(promptText);
      const response = result.response;
      const text = response.text();

      if (!text || text.trim().length === 0) {
        throw new Error('No response from AI');
      }

      return text.trim();

    } catch (error) {
      console.error('Error calling AI service:', error);
      throw new Error('Failed to rewrite paragraph');
    }
  },

};