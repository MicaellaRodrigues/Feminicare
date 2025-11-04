"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const router = express_1.default.Router();
router.post('/login/professional', authController_1.AuthController.loginProfessional);
router.post('/login/admin', authController_1.AuthController.loginAdmin);
router.post('/forgot-password', authController_1.AuthController.forgotPassword);
router.post('/reset-password', authController_1.AuthController.resetPassword);
exports.authRoutes = router;
