import express from 'express';
import { UserController } from '../controllers/userController';
import { protect } from '../middleware/auth';

const router = express.Router();

// User routes
router.post('/', UserController.create);
router.get('/', protect, UserController.getAll);
router.get('/:id', protect, UserController.getById);
router.put('/:id', protect, UserController.update);
router.delete('/:id', protect, UserController.delete);

export const userRoutes = router;