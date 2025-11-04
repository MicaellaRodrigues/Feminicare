import express from 'express';
import { AuthController } from '../controllers/authController';

const router = express.Router();

router.post('/login/professional', AuthController.loginProfessional);
router.post('/login/admin', AuthController.loginAdmin);
router.post('/forgot-password', AuthController.forgotPassword);
router.post('/reset-password', AuthController.resetPassword);

export const authRoutes = router;