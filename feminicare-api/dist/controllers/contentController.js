"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentController = void 0;
const typeorm_1 = require("typeorm");
const Content_1 = require("../models/Content");
const ApiError_1 = require("../utils/ApiError");
class ContentController {
    static async create(req, res, next) {
        try {
            const { title, body, category, imageUrl, tags } = req.body;
            if (!title || !body || !category) {
                throw new ApiError_1.ApiError(400, 'Missing required fields');
            }
            const adminId = req.user.id;
            const contentRepository = (0, typeorm_1.getRepository)(Content_1.Content);
            const content = contentRepository.create({
                title,
                body,
                category,
                imageUrl,
                tags,
                adminId
            });
            await contentRepository.save(content);
            res.status(201).json({
                success: true,
                content
            });
        }
        catch (error) {
            next(error);
        }
    }
    static async getAll(req, res, next) {
        try {
            const contentRepository = (0, typeorm_1.getRepository)(Content_1.Content);
            const { category, tag } = req.query;
            const whereClause = { isActive: true };
            if (category) {
                whereClause.category = category;
            }
            let contents = await contentRepository.find({
                where: whereClause,
                relations: ['author'],
                order: { createdAt: 'DESC' }
            });
            if (tag) {
                contents = contents.filter(content => content.tags && content.tags.some(t => t.toLowerCase() === String(tag).toLowerCase()));
            }
            const formattedContents = contents.map(content => ({
                id: content.id,
                title: content.title,
                body: content.body,
                category: content.category,
                imageUrl: content.imageUrl,
                tags: content.tags,
                author: content.author ? {
                    id: content.author.id,
                    name: content.author.name
                } : null,
                createdAt: content.createdAt,
                updatedAt: content.updatedAt
            }));
            res.status(200).json({
                success: true,
                count: formattedContents.length,
                contents: formattedContents
            });
        }
        catch (error) {
            next(error);
        }
    }
    static async getById(req, res, next) {
        try {
            const { id } = req.params;
            const contentRepository = (0, typeorm_1.getRepository)(Content_1.Content);
            const content = await contentRepository.findOne({
                where: { id, isActive: true },
                relations: ['author']
            });
            if (!content) {
                throw new ApiError_1.ApiError(404, 'Content not found');
            }
            const formattedContent = {
                id: content.id,
                title: content.title,
                body: content.body,
                category: content.category,
                imageUrl: content.imageUrl,
                tags: content.tags,
                author: content.author ? {
                    id: content.author.id,
                    name: content.author.name
                } : null,
                createdAt: content.createdAt,
                updatedAt: content.updatedAt
            };
            res.status(200).json({
                success: true,
                content: formattedContent
            });
        }
        catch (error) {
            next(error);
        }
    }
    static async update(req, res, next) {
        try {
            const { id } = req.params;
            const { title, body, category, imageUrl, tags } = req.body;
            const contentRepository = (0, typeorm_1.getRepository)(Content_1.Content);
            const content = await contentRepository.findOne({ where: { id, isActive: true } });
            if (!content) {
                throw new ApiError_1.ApiError(404, 'Content not found');
            }
            await contentRepository.update(id, {
                title: title || content.title,
                body: body || content.body,
                category: category || content.category,
                imageUrl: imageUrl !== undefined ? imageUrl : content.imageUrl,
                tags: tags !== undefined ? tags : content.tags
            });
            const updatedContent = await contentRepository.findOne({
                where: { id },
                relations: ['author']
            });
            const formattedContent = {
                id: updatedContent.id,
                title: updatedContent.title,
                body: updatedContent.body,
                category: updatedContent.category,
                imageUrl: updatedContent.imageUrl,
                tags: updatedContent.tags,
                author: updatedContent.author ? {
                    id: updatedContent.author.id,
                    name: updatedContent.author.name
                } : null,
                createdAt: updatedContent.createdAt,
                updatedAt: updatedContent.updatedAt
            };
            res.status(200).json({
                success: true,
                content: formattedContent
            });
        }
        catch (error) {
            next(error);
        }
    }
    static async delete(req, res, next) {
        try {
            const { id } = req.params;
            const contentRepository = (0, typeorm_1.getRepository)(Content_1.Content);
            const content = await contentRepository.findOne({ where: { id, isActive: true } });
            if (!content) {
                throw new ApiError_1.ApiError(404, 'Content not found');
            }
            await contentRepository.update(id, { isActive: false });
            res.status(200).json({
                success: true,
                message: 'Content deleted successfully'
            });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.ContentController = ContentController;
