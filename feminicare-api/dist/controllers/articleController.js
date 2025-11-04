"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticleController = void 0;
const typeorm_1 = require("typeorm");
const Article_1 = require("../models/Article");
const ApiError_1 = require("../utils/ApiError");
class ArticleController {
    static async create(req, res, next) {
        try {
            const { title, content, category, imageUrl, tags } = req.body;
            if (!title || !content || !category) {
                throw new ApiError_1.ApiError(400, 'Missing required fields');
            }
            // Only admins can create articles
            const userRole = req.user.role;
            if (userRole !== 'admin') {
                throw new ApiError_1.ApiError(403, 'Only administrators can create articles');
            }
            const adminId = req.user.id;
            const articleRepository = (0, typeorm_1.getRepository)(Article_1.Article);
            const article = articleRepository.create({
                title,
                content,
                category,
                imageUrl,
                tags,
                adminId
            });
            await articleRepository.save(article);
            res.status(201).json({
                success: true,
                article
            });
        }
        catch (error) {
            next(error);
        }
    }
    static async getAll(req, res, next) {
        try {
            const articleRepository = (0, typeorm_1.getRepository)(Article_1.Article);
            const { category, tag } = req.query;
            const whereClause = { isActive: true };
            if (category) {
                whereClause.category = category;
            }
            let articles = await articleRepository.find({
                where: whereClause,
                relations: ['author'],
                order: { createdAt: 'DESC' }
            });
            // Filter by tags if provided
            if (tag) {
                articles = articles.filter(article => article.tags && article.tags.some(t => t.toLowerCase() === String(tag).toLowerCase()));
            }
            // Format the response to exclude sensitive information
            const formattedArticles = articles.map(article => ({
                id: article.id,
                title: article.title,
                content: article.content,
                category: article.category,
                imageUrl: article.imageUrl,
                tags: article.tags,
                rating: article.rating,
                ratingCount: article.ratingCount,
                author: article.author ? {
                    id: article.author.id,
                    name: article.author.name
                } : null,
                createdAt: article.createdAt,
                updatedAt: article.updatedAt
            }));
            res.status(200).json({
                success: true,
                count: formattedArticles.length,
                articles: formattedArticles
            });
        }
        catch (error) {
            next(error);
        }
    }
    static async getById(req, res, next) {
        try {
            const { id } = req.params;
            const articleRepository = (0, typeorm_1.getRepository)(Article_1.Article);
            const article = await articleRepository.findOne({
                where: { id, isActive: true },
                relations: ['author']
            });
            if (!article) {
                throw new ApiError_1.ApiError(404, 'Article not found');
            }
            // Format response to exclude sensitive information
            const formattedArticle = {
                id: article.id,
                title: article.title,
                content: article.content,
                category: article.category,
                imageUrl: article.imageUrl,
                tags: article.tags,
                rating: article.rating,
                ratingCount: article.ratingCount,
                author: article.author ? {
                    id: article.author.id,
                    name: article.author.name
                } : null,
                createdAt: article.createdAt,
                updatedAt: article.updatedAt
            };
            res.status(200).json({
                success: true,
                article: formattedArticle
            });
        }
        catch (error) {
            next(error);
        }
    }
    static async update(req, res, next) {
        try {
            const { id } = req.params;
            const { title, content, category, imageUrl, tags } = req.body;
            // Only admins can update articles
            const userRole = req.user.role;
            if (userRole !== 'admin') {
                throw new ApiError_1.ApiError(403, 'Only administrators can update articles');
            }
            const articleRepository = (0, typeorm_1.getRepository)(Article_1.Article);
            const article = await articleRepository.findOne({ where: { id, isActive: true } });
            if (!article) {
                throw new ApiError_1.ApiError(404, 'Article not found');
            }
            // Update article
            await articleRepository.update(id, {
                title: title || article.title,
                content: content || article.content,
                category: category || article.category,
                imageUrl: imageUrl !== undefined ? imageUrl : article.imageUrl,
                tags: tags !== undefined ? tags : article.tags
            });
            // Get updated article
            const updatedArticle = await articleRepository.findOne({
                where: { id },
                relations: ['author']
            });
            // Format response
            const formattedArticle = {
                id: updatedArticle.id,
                title: updatedArticle.title,
                content: updatedArticle.content,
                category: updatedArticle.category,
                imageUrl: updatedArticle.imageUrl,
                tags: updatedArticle.tags,
                rating: updatedArticle.rating,
                ratingCount: updatedArticle.ratingCount,
                author: updatedArticle.author ? {
                    id: updatedArticle.author.id,
                    name: updatedArticle.author.name
                } : null,
                createdAt: updatedArticle.createdAt,
                updatedAt: updatedArticle.updatedAt
            };
            res.status(200).json({
                success: true,
                article: formattedArticle
            });
        }
        catch (error) {
            next(error);
        }
    }
    static async delete(req, res, next) {
        try {
            const { id } = req.params;
            // Only admins can delete articles
            const userRole = req.user.role;
            if (userRole !== 'admin') {
                throw new ApiError_1.ApiError(403, 'Only administrators can delete articles');
            }
            const articleRepository = (0, typeorm_1.getRepository)(Article_1.Article);
            const article = await articleRepository.findOne({ where: { id, isActive: true } });
            if (!article) {
                throw new ApiError_1.ApiError(404, 'Article not found');
            }
            // Soft delete
            await articleRepository.update(id, { isActive: false });
            res.status(200).json({
                success: true,
                message: 'Article deleted successfully'
            });
        }
        catch (error) {
            next(error);
        }
    }
    static async rateArticle(req, res, next) {
        try {
            const { id } = req.params;
            const { rating } = req.body;
            if (!rating || rating < 1 || rating > 5) {
                throw new ApiError_1.ApiError(400, 'Rating must be between 1 and 5');
            }
            const articleRepository = (0, typeorm_1.getRepository)(Article_1.Article);
            const article = await articleRepository.findOne({ where: { id, isActive: true } });
            if (!article) {
                throw new ApiError_1.ApiError(404, 'Article not found');
            }
            // Calculate new rating
            const newRatingCount = article.ratingCount + 1;
            const newRating = ((article.rating * article.ratingCount) + rating) / newRatingCount;
            // Update article with new rating
            await articleRepository.update(id, {
                rating: parseFloat(newRating.toFixed(1)),
                ratingCount: newRatingCount
            });
            res.status(200).json({
                success: true,
                message: 'Article rated successfully'
            });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.ArticleController = ArticleController;
