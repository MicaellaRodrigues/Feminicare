import express from 'express';
import { AdminController } from '../controllers/adminController';
import { protect, authorize } from '../middleware/auth';

const router = express.Router();

// Admin routes
router.post('/', protect, authorize('admin'), AdminController.create);
router.get('/', protect, authorize('admin'), AdminController.getAll);
router.get('/:id', protect, authorize('admin'), AdminController.getById);
router.put('/:id', protect, authorize('admin'), AdminController.update);
router.delete('/:id', protect, authorize('admin'), AdminController.delete);

export const adminRoutes = router;