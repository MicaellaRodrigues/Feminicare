"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminController = void 0;
const typeorm_1 = require("typeorm");
const Administrator_1 = require("../models/Administrator");
const ApiError_1 = require("../utils/ApiError");
class AdminController {
    static async create(req, res, next) {
        try {
            const { name, email, password } = req.body;
            if (!name || !email || !password) {
                throw new ApiError_1.ApiError(400, 'Missing required fields');
            }
            const adminRepository = (0, typeorm_1.getRepository)(Administrator_1.Administrator);
            // Check if email already exists
            const existingAdmin = await adminRepository.findOne({ where: { email } });
            if (existingAdmin) {
                throw new ApiError_1.ApiError(409, 'Email already in use');
            }
            // Create new administrator
            const admin = adminRepository.create({ name, email, password });
            await adminRepository.save(admin);
            res.status(201).json({
                success: true,
                admin: {
                    id: admin.id,
                    name: admin.name,
                    email: admin.email,
                },
            });
        }
        catch (error) {
            next(error);
        }
    }
    static async getAll(req, res, next) {
        try {
            const adminRepository = (0, typeorm_1.getRepository)(Administrator_1.Administrator);
            const admins = await adminRepository.find();
            res.status(200).json({
                success: true,
                count: admins.length,
                admins,
            });
        }
        catch (error) {
            next(error);
        }
    }
    static async getById(req, res, next) {
        try {
            const { id } = req.params;
            const adminRepository = (0, typeorm_1.getRepository)(Administrator_1.Administrator);
            const admin = await adminRepository.findOne({ where: { id } });
            if (!admin) {
                throw new ApiError_1.ApiError(404, 'Administrator not found');
            }
            res.status(200).json({
                success: true,
                admin,
            });
        }
        catch (error) {
            next(error);
        }
    }
    static async update(req, res, next) {
        try {
            const { id } = req.params;
            const { name, email, password } = req.body;
            const adminRepository = (0, typeorm_1.getRepository)(Administrator_1.Administrator);
            const admin = await adminRepository.findOne({ where: { id } });
            if (!admin) {
                throw new ApiError_1.ApiError(404, 'Administrator not found');
            }
            // Update administrator details
            await adminRepository.update(id, {
                name: name || admin.name,
                email: email || admin.email,
                password: password || admin.password,
            });
            const updatedAdmin = await adminRepository.findOne({ where: { id } });
            res.status(200).json({
                success: true,
                admin: updatedAdmin,
            });
        }
        catch (error) {
            next(error);
        }
    }
    static async delete(req, res, next) {
        try {
            const { id } = req.params;
            const adminRepository = (0, typeorm_1.getRepository)(Administrator_1.Administrator);
            const admin = await adminRepository.findOne({ where: { id } });
            if (!admin) {
                throw new ApiError_1.ApiError(404, 'Administrator not found');
            }
            // Soft delete (set isActive to false)
            await adminRepository.update(id, { isActive: false });
            res.status(200).json({
                success: true,
                message: 'Administrator deleted successfully',
            });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.AdminController = AdminController;
