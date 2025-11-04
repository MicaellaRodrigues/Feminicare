"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchController = void 0;
const typeorm_1 = require("typeorm");
const Professional_1 = require("../models/Professional");
const Article_1 = require("../models/Article");
const Content_1 = require("../models/Content");
class SearchController {
    static async search(req, res, next) {
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
            const results = {
                professionals: [],
                articles: [],
                contents: []
            };
            if (!type || type === 'all' || type === 'professionals') {
                const professionalRepository = (0, typeorm_1.getRepository)(Professional_1.Professional);
                results.professionals = await professionalRepository.find({
                    where: [
                        { name: (0, typeorm_1.Like)(searchQuery), isActive: true },
                        { specialty: (0, typeorm_1.Like)(searchQuery), isActive: true },
                        { description: (0, typeorm_1.Like)(searchQuery), isActive: true }
                    ],
                    select: ['id', 'name', 'specialty', 'description', 'imageUrl', 'location']
                });
            }
            if (!type || type === 'all' || type === 'articles') {
                const articleRepository = (0, typeorm_1.getRepository)(Article_1.Article);
                results.articles = await articleRepository.find({
                    where: [
                        { title: (0, typeorm_1.Like)(searchQuery), isActive: true },
                        { content: (0, typeorm_1.Like)(searchQuery), isActive: true },
                        { category: (0, typeorm_1.Like)(searchQuery), isActive: true }
                    ],
                    select: ['id', 'title', 'category', 'imageUrl']
                });
            }
            if (!type || type === 'all' || type === 'contents') {
                const contentRepository = (0, typeorm_1.getRepository)(Content_1.Content);
                results.contents = await contentRepository.find({
                    where: [
                        { title: (0, typeorm_1.Like)(searchQuery), isActive: true },
                        { body: (0, typeorm_1.Like)(searchQuery), isActive: true },
                        { category: (0, typeorm_1.Like)(searchQuery), isActive: true }
                    ],
                    select: ['id', 'title', 'category', 'imageUrl']
                });
            }
            res.status(200).json({
                success: true,
                results
            });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.SearchController = SearchController;
