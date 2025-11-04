"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const typeorm_1 = require("typeorm");
const User_1 = require("../models/User");
const Professional_1 = require("../models/Professional");
const Administrator_1 = require("../models/Administrator");
const ApiError_1 = require("../utils/ApiError");
class AuthController {
    // Login para profissionais
    static async loginProfessional(req, res, next) {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                throw new ApiError_1.ApiError(400, 'Please provide email and password');
            }
            const professionalRepository = (0, typeorm_1.getRepository)(Professional_1.Professional);
            const professional = await professionalRepository.findOne({ where: { email } });
            if (!professional || !(await bcryptjs_1.default.compare(password, professional.password))) {
                throw new ApiError_1.ApiError(401, 'Invalid credentials');
            }
            // Gerar token JWT
            const token = jsonwebtoken_1.default.sign({ id: professional.id, role: 'professional' }, process.env.JWT_SECRET || 'your-secret-key', { expiresIn: '30d' });
            res.status(200).json({
                success: true,
                token,
                data: {
                    id: professional.id,
                    name: professional.name,
                    email: professional.email,
                    role: 'professional'
                }
            });
        }
        catch (error) {
            next(error);
        }
    }
    // Login para administradores
    static async loginAdmin(req, res, next) {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                throw new ApiError_1.ApiError(400, 'Please provide email and password');
            }
            const adminRepository = (0, typeorm_1.getRepository)(Administrator_1.Administrator);
            const admin = await adminRepository.findOne({ where: { email } });
            if (!admin || !(await bcryptjs_1.default.compare(password, admin.password))) {
                throw new ApiError_1.ApiError(401, 'Invalid credentials');
            }
            // Gerar token JWT
            const token = jsonwebtoken_1.default.sign({ id: admin.id, role: 'admin' }, process.env.JWT_SECRET || 'your-secret-key', { expiresIn: '30d' });
            res.status(200).json({
                success: true,
                token,
                data: {
                    id: admin.id,
                    name: admin.name,
                    email: admin.email,
                    role: 'admin'
                }
            });
        }
        catch (error) {
            next(error);
        }
    }
    // Esqueci minha senha
    static async forgotPassword(req, res, next) {
        try {
            const { email, userType } = req.body;
            if (!email) {
                throw new ApiError_1.ApiError(400, 'Please provide email');
            }
            // Dependendo do tipo de usuário, busque no repositório correspondente
            let repository;
            let user;
            switch (userType) {
                case 'user':
                    repository = (0, typeorm_1.getRepository)(User_1.User);
                    break;
                case 'professional':
                    repository = (0, typeorm_1.getRepository)(Professional_1.Professional);
                    break;
                case 'admin':
                    repository = (0, typeorm_1.getRepository)(Administrator_1.Administrator);
                    break;
                default:
                    throw new ApiError_1.ApiError(400, 'Invalid user type');
            }
            user = await repository.findOne({ where: { email } });
            if (!user) {
                throw new ApiError_1.ApiError(404, 'User not found');
            }
            // Aqui você implementaria o envio de email com um link para redefinir senha
            // Para esta demonstração, apenas simulamos um reset token
            const resetToken = Math.random().toString(36).substring(2, 15);
            // Em uma aplicação real, você armazenaria esse token no banco de dados
            // user.resetPasswordToken = resetToken
            // user.resetPasswordExpire = Date.now() + 10 * 60 * 1000
            // await repository.save(user)
            res.status(200).json({
                success: true,
                message: 'Password reset email sent',
                // Apenas para fins de desenvolvimento
                resetToken
            });
        }
        catch (error) {
            next(error);
        }
    }
    // Redefinir senha
    static async resetPassword(req, res, next) {
        try {
            const { resetToken, password, userType } = req.body;
            if (!resetToken || !password) {
                throw new ApiError_1.ApiError(400, 'Please provide reset token and new password');
            }
            // Implementação simulada para fins de demonstração
            // Em uma aplicação real, você buscaria o usuário pelo token de reset
            res.status(200).json({
                success: true,
                message: 'Password reset successful'
            });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.AuthController = AuthController;
