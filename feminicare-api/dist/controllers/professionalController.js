"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfessionalController = void 0;
const typeorm_1 = require("typeorm");
const Professional_1 = require("../models/Professional");
const ApiError_1 = require("../utils/ApiError");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class ProfessionalController {
    static async create(req, res, next) {
        try {
            const { name, email, password, phone, credential, specialty, description, imageUrl, location } = req.body;
            if (!name || !email || !password || !specialty) {
                throw new ApiError_1.ApiError(400, 'Missing required fields');
            }
            const professionalRepository = (0, typeorm_1.getRepository)(Professional_1.Professional);
            // Check if email already exists
            const existingProfessional = await professionalRepository.findOne({ where: { email } });
            if (existingProfessional) {
                throw new ApiError_1.ApiError(409, 'Email already in use');
            }
            // Hash password
            const hashedPassword = await bcryptjs_1.default.hash(password, 10);
            // Create new professional
            const professional = professionalRepository.create({
                name,
                email,
                password: hashedPassword,
                phone,
                credential,
                specialty,
                description,
                imageUrl,
                location
            });
            await professionalRepository.save(professional);
            // Return created professional without password
            const { password: _, ...professionalData } = professional;
            res.status(201).json({
                success: true,
                professional: professionalData
            });
        }
        catch (error) {
            next(error);
        }
    }
    static async getAll(req, res, next) {
        try {
            const professionalRepository = (0, typeorm_1.getRepository)(Professional_1.Professional);
            // Get query parameters for filtering
            const { specialty, location } = req.query;
            // Build where clause
            const whereClause = { isActive: true };
            if (specialty)
                whereClause.specialty = specialty;
            if (location)
                whereClause.location = location;
            const professionals = await professionalRepository.find({
                where: whereClause,
                select: ['id', 'name', 'email', 'phone', 'credential', 'specialty', 'description', 'imageUrl', 'location', 'createdAt']
            });
            res.status(200).json({
                success: true,
                count: professionals.length,
                professionals
            });
        }
        catch (error) {
            next(error);
        }
    }
    static async getById(req, res, next) {
        try {
            const { id } = req.params;
            const professionalRepository = (0, typeorm_1.getRepository)(Professional_1.Professional);
            const professional = await professionalRepository.findOne({
                where: { id, isActive: true },
                select: ['id', 'name', 'email', 'phone', 'credential', 'specialty', 'description', 'imageUrl', 'location', 'createdAt']
            });
            if (!professional) {
                throw new ApiError_1.ApiError(404, 'Professional not found');
            }
            res.status(200).json({
                success: true,
                professional
            });
        }
        catch (error) {
            next(error);
        }
    }
    static async update(req, res, next) {
        try {
            const { id } = req.params;
            const { name, email, phone, credential, specialty, description, imageUrl, location } = req.body;
            const professionalRepository = (0, typeorm_1.getRepository)(Professional_1.Professional);
            const professional = await professionalRepository.findOne({ where: { id, isActive: true } });
            if (!professional) {
                throw new ApiError_1.ApiError(404, 'Professional not found');
            }
            // Check if user is authorized (either admin or the professional themselves)
            const userId = req.user.id;
            const userRole = req.user.role;
            if (userRole !== 'admin' && userId !== professional.id) {
                throw new ApiError_1.ApiError(403, 'Not authorized to update this professional');
            }
            // Check if email is being changed and if it's already in use
            if (email && email !== professional.email) {
                const existingProfessional = await professionalRepository.findOne({ where: { email } });
                if (existingProfessional) {
                    throw new ApiError_1.ApiError(409, 'Email already in use');
                }
            }
            // Update professional
            await professionalRepository.update(id, {
                name: name || professional.name,
                email: email || professional.email,
                phone: phone || professional.phone,
                credential: credential || professional.credential,
                specialty: specialty || professional.specialty,
                description: description !== undefined ? description : professional.description,
                imageUrl: imageUrl !== undefined ? imageUrl : professional.imageUrl,
                location: location !== undefined ? location : professional.location
            });
            // Get updated professional
            const updatedProfessional = await professionalRepository.findOne({
                where: { id },
                select: ['id', 'name', 'email', 'phone', 'credential', 'specialty', 'description', 'imageUrl', 'location', 'createdAt']
            });
            res.status(200).json({
                success: true,
                professional: updatedProfessional
            });
        }
        catch (error) {
            next(error);
        }
    }
    static async delete(req, res, next) {
        try {
            const { id } = req.params;
            const professionalRepository = (0, typeorm_1.getRepository)(Professional_1.Professional);
            const professional = await professionalRepository.findOne({ where: { id, isActive: true } });
            if (!professional) {
                throw new ApiError_1.ApiError(404, 'Professional not found');
            }
            // Check if user is authorized (either admin or the professional themselves)
            const userId = req.user.id;
            const userRole = req.user.role;
            if (userRole !== 'admin' && userId !== professional.id) {
                throw new ApiError_1.ApiError(403, 'Not authorized to delete this professional');
            }
            // Soft delete (set isActive to false)
            await professionalRepository.update(id, { isActive: false });
            res.status(200).json({
                success: true,
                message: 'Professional deleted successfully'
            });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.ProfessionalController = ProfessionalController;
