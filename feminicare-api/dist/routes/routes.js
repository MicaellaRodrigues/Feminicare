"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const userController_1 = require("../controllers/userController");
const professionalController_1 = require("../controllers/professionalController");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
// Auth Routes
router.post('/api/auth/login/professional', authController_1.AuthController.loginProfessional);
router.post('/api/auth/login/admin', authController_1.AuthController.loginAdmin);
router.post('/api/auth/forgot-password', authController_1.AuthController.forgotPassword);
router.post('/api/auth/reset-password', authController_1.AuthController.resetPassword);
// User Routes
router.post('/api/users', userController_1.UserController.create);
router.get('/api/users', auth_1.protect, userController_1.UserController.getAll);
router.get('/api/users/:id', auth_1.protect, userController_1.UserController.getById);
router.put('/api/users/:id', auth_1.protect, userController_1.UserController.update);
router.delete('/api/users/:id', auth_1.protect, userController_1.UserController.delete);
// Professional Routes
router.post('/api/professionals', professionalController_1.ProfessionalController.create); // Cadastro de profissionais (não requer autenticação)
router.get('/api/professionals', auth_1.protect, professionalController_1.ProfessionalController.getAll);
router.get('/api/professionals/:id', auth_1.protect, professionalController_1.ProfessionalController.getById);
router.put('/api/professionals/:id', auth_1.protect, professionalController_1.ProfessionalController.update);
router.delete('/api/professionals/:id', auth_1.protect, professionalController_1.ProfessionalController.delete);
exports.default = router;
