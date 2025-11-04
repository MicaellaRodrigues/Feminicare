"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRoutes = void 0;
const express_1 = __importDefault(require("express"));
const adminController_1 = require("../controllers/adminController");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
// Admin routes
router.post('/', auth_1.protect, (0, auth_1.authorize)('admin'), adminController_1.AdminController.create);
router.get('/', auth_1.protect, (0, auth_1.authorize)('admin'), adminController_1.AdminController.getAll);
router.get('/:id', auth_1.protect, (0, auth_1.authorize)('admin'), adminController_1.AdminController.getById);
router.put('/:id', auth_1.protect, (0, auth_1.authorize)('admin'), adminController_1.AdminController.update);
router.delete('/:id', auth_1.protect, (0, auth_1.authorize)('admin'), adminController_1.AdminController.delete);
exports.adminRoutes = router;
