import express from 'express';
import { ContentController } from '../controllers/contentController';
import { protect, authorize } from '../middleware/auth';

const router = express.Router();

router.post('/', protect, authorize('admin'), ContentController.create);
router.get('/', ContentController.getAll);
router.get('/:id', ContentController.getById);
router.put('/:id', protect, authorize('admin'), ContentController.update);
router.delete('/:id', protect, authorize('admin'), ContentController.delete);

export const contentRoutes = router;