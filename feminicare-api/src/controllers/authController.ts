import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
import { getRepository } from 'typeorm';
import { User } from '../models/User';
import { Professional } from '../models/Professional';
import { Administrator } from '../models/Administrator';
import { ApiError } from '../utils/ApiError';

export class AuthController {
  // Login para profissionais
  static async loginProfessional(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, password } = req.body;
      
      if (!email || !password) {
        throw new ApiError(400, 'Please provide email and password');
      }
      
      const professionalRepository = getRepository(Professional);
      const professional = await professionalRepository.findOne({ where: { email } });
      
      if (!professional || !(await bcryptjs.compare(password, professional.password))) {
        throw new ApiError(401, 'Invalid credentials');
      }
      
      // Gerar token JWT
      const token = jwt.sign(
        { id: professional.id, role: 'professional' },
        process.env.JWT_SECRET || 'your-secret-key',
        { expiresIn: '30d' }
      );
      
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
    } catch (error) {
      next(error);
    }
  }
  
  // Login para administradores
  static async loginAdmin(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, password } = req.body;
      
      if (!email || !password) {
        throw new ApiError(400, 'Please provide email and password');
      }
      
      const adminRepository = getRepository(Administrator);
      const admin = await adminRepository.findOne({ where: { email } });
      
      if (!admin || !(await bcryptjs.compare(password, admin.password))) {
        throw new ApiError(401, 'Invalid credentials');
      }
      
      // Gerar token JWT
      const token = jwt.sign(
        { id: admin.id, role: 'admin' },
        process.env.JWT_SECRET || 'your-secret-key',
        { expiresIn: '30d' }
      );
      
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
    } catch (error) {
      next(error);
    }
  }
  
  // Esqueci minha senha
  static async forgotPassword(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, userType } = req.body;
      
      if (!email) {
        throw new ApiError(400, 'Please provide email');
      }
      
      // Dependendo do tipo de usuário, busque no repositório correspondente
      let repository;
      let user;
      
      switch (userType) {
        case 'user':
          repository = getRepository(User);
          break;
        case 'professional':
          repository = getRepository(Professional);
          break;
        case 'admin':
          repository = getRepository(Administrator);
          break;
        default:
          throw new ApiError(400, 'Invalid user type');
      }
      
      user = await (repository as any).findOne({ where: { email } });
      
      if (!user) {
        throw new ApiError(404, 'User not found');
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
    } catch (error) {
      next(error);
    }
  }
  
  // Redefinir senha
  static async resetPassword(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { resetToken, password, userType } = req.body;
      
      if (!resetToken || !password) {
        throw new ApiError(400, 'Please provide reset token and new password');
      }
      
      // Implementação simulada para fins de demonstração
      // Em uma aplicação real, você buscaria o usuário pelo token de reset
      res.status(200).json({
        success: true,
        message: 'Password reset successful'
      });
    } catch (error) {
      next(error);
    }
  }
}