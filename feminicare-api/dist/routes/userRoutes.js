"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
// User routes
router.post('/', userController_1.UserController.create);
router.get('/', auth_1.protect, userController_1.UserController.getAll);
router.get('/:id', auth_1.protect, userController_1.UserController.getById);
router.put('/:id', auth_1.protect, userController_1.UserController.update);
router.delete('/:id', auth_1.protect, userController_1.UserController.delete);
exports.userRoutes = router;
