import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';
import { Administrator } from '../models/Administrator';
import { ApiError } from '../utils/ApiError';

export class AdminController {
  static async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        throw new ApiError(400, 'Missing required fields');
      }

      const adminRepository = getRepository(Administrator);

      // Check if email already exists
      const existingAdmin = await adminRepository.findOne({ where: { email } });
      if (existingAdmin) {
        throw new ApiError(409, 'Email already in use');
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
    } catch (error) {
      next(error);
    }
  }

  static async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const adminRepository = getRepository(Administrator);
      const admins = await adminRepository.find();

      res.status(200).json({
        success: true,
        count: admins.length,
        admins,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const adminRepository = getRepository(Administrator);
      const admin = await adminRepository.findOne({ where: { id } });

      if (!admin) {
        throw new ApiError(404, 'Administrator not found');
      }

      res.status(200).json({
        success: true,
        admin,
      });
    } catch (error) {
      next(error);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const { name, email, password } = req.body;

      const adminRepository = getRepository(Administrator);
      const admin = await adminRepository.findOne({ where: { id } });

      if (!admin) {
        throw new ApiError(404, 'Administrator not found');
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
    } catch (error) {
      next(error);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const adminRepository = getRepository(Administrator);
      const admin = await adminRepository.findOne({ where: { id } });

      if (!admin) {
        throw new ApiError(404, 'Administrator not found');
      }

      // Soft delete (set isActive to false)
      await adminRepository.update(id, { isActive: false });

      res.status(200).json({
        success: true,
        message: 'Administrator deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  }
}