import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../models/User';
import { ApiError } from '../utils/ApiError';

export class UserController {
  static async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        throw new ApiError(400, 'Missing required fields');
      }

      const userRepository = getRepository(User);

      // Check if email already exists
      const existingUser = await userRepository.findOne({ where: { email } });
      if (existingUser) {
        throw new ApiError(409, 'Email already in use');
      }

      // Create new user
      const user = userRepository.create({ name, email, password });
      await userRepository.save(user);

      res.status(201).json({
        success: true,
        user: { id: user.id, name: user.name, email: user.email }
      });
    } catch (error) {
      next(error);
    }
  }

  static async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userRepository = getRepository(User);
      const users = await userRepository.find({ where: { isActive: true } });

      res.status(200).json({
        success: true,
        count: users.length,
        users
      });
    } catch (error) {
      next(error);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const userRepository = getRepository(User);
      const user = await userRepository.findOne({ where: { id, isActive: true } });

      if (!user) {
        throw new ApiError(404, 'User not found');
      }

      res.status(200).json({
        success: true,
        user
      });
    } catch (error) {
      next(error);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const { name, email } = req.body;

      const userRepository = getRepository(User);
      const user = await userRepository.findOne({ where: { id, isActive: true } });

      if (!user) {
        throw new ApiError(404, 'User not found');
      }

      // Update user
      await userRepository.update(id, {
        name: name || user.name,
        email: email || user.email
      });

      const updatedUser = await userRepository.findOne({ where: { id } });

      res.status(200).json({
        success: true,
        user: updatedUser
      });
    } catch (error) {
      next(error);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;

      const userRepository = getRepository(User);
      const user = await userRepository.findOne({ where: { id, isActive: true } });

      if (!user) {
        throw new ApiError(404, 'User not found');
      }

      // Soft delete (set isActive to false)
      await userRepository.update(id, { isActive: false });

      res.status(200).json({
        success: true,
        message: 'User deleted successfully'
      });
    } catch (error) {
      next(error);
    }
  }
}