import { Router } from 'express';
import { AuthController } from '../controllers/authController';
import { UserController } from '../controllers/userController';
import { ProfessionalController } from '../controllers/professionalController';
import { protect, authorize } from '../middleware/auth';
import { validateArticleCreation, validateProfessionalCreation } from '../middleware/validation';

const router = Router();

// Auth Routes
router.post('/api/auth/login/professional', AuthController.loginProfessional);
router.post('/api/auth/login/admin', AuthController.loginAdmin);
router.post('/api/auth/forgot-password', AuthController.forgotPassword);
router.post('/api/auth/reset-password', AuthController.resetPassword);

// User Routes
router.post('/api/users', UserController.create);
router.get('/api/users', protect, UserController.getAll);
router.get('/api/users/:id', protect, UserController.getById);
router.put('/api/users/:id', protect, UserController.update);
router.delete('/api/users/:id', protect, UserController.delete);

// Professional Routes
router.post('/api/professionals', ProfessionalController.create); // Cadastro de profissionais (não requer autenticação)
router.get('/api/professionals', protect, ProfessionalController.getAll);
router.get('/api/professionals/:id', protect, ProfessionalController.getById);
router.put('/api/professionals/:id', protect, ProfessionalController.update);
router.delete('/api/professionals/:id', protect, ProfessionalController.delete);

export default router;