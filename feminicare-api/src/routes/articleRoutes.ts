import express from 'express';
import { ArticleController } from '../controllers/articleController';
import { protect, authorize } from '../middleware/auth';

const router = express.Router();

router.post('/', protect, authorize('admin'), ArticleController.create);
router.get('/', ArticleController.getAll);
router.get('/:id', ArticleController.getById);
router.put('/:id', protect, authorize('admin'), ArticleController.update);
router.delete('/:id', protect, authorize('admin'), ArticleController.delete);
router.post('/:id/rate', protect, ArticleController.rateArticle);

export const articleRoutes = router;