import { Request, Response, NextFunction } from 'express';
import { getRepository, Like } from 'typeorm';
import { Professional } from '../models/Professional';
import { Article } from '../models/Article';
import { Content } from '../models/Content';
import { ApiError } from '../utils/ApiError';

export class SearchController {
  static async search(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { query, type } = req.query;

      if (!query) {
        res.status(200).json({
          success: true,
          results: []
        });
        return;
      }

      const searchQuery = `%${query}%`;

      const results: {
        professionals: Professional[],
        articles: Article[],
        contents: Content[]
      } = {
        professionals: [],
        articles: [],
        contents: []
      };

      if (!type || type === 'all' || type === 'professionals') {
        const professionalRepository = getRepository(Professional);
        results.professionals = await professionalRepository.find({
          where: [
            { name: Like(searchQuery), isActive: true },
            { specialty: Like(searchQuery), isActive: true },
            { description: Like(searchQuery), isActive: true }
          ],
          select: ['id', 'name', 'specialty', 'description', 'imageUrl', 'location']
        });
      }

      if (!type || type === 'all' || type === 'articles') {
        const articleRepository = getRepository(Article);
        results.articles = await articleRepository.find({
          where: [
            { title: Like(searchQuery), isActive: true },
            { content: Like(searchQuery), isActive: true },
            { category: Like(searchQuery), isActive: true }
          ],
          select: ['id', 'title', 'category', 'imageUrl']
        });
      }

      if (!type || type === 'all' || type === 'contents') {
        const contentRepository = getRepository(Content);
        results.contents = await contentRepository.find({
          where: [
            { title: Like(searchQuery), isActive: true },
            { body: Like(searchQuery), isActive: true },
            { category: Like(searchQuery), isActive: true }
          ],
          select: ['id', 'title', 'category', 'imageUrl']
        });
      }

      res.status(200).json({
        success: true,
        results
      });
    } catch (error) {
      next(error);
    }
  }
}