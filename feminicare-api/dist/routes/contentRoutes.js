"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.contentRoutes = void 0;
const express_1 = __importDefault(require("express"));
const contentController_1 = require("../controllers/contentController");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
router.post('/', auth_1.protect, (0, auth_1.authorize)('admin'), contentController_1.ContentController.create);
router.get('/', contentController_1.ContentController.getAll);
router.get('/:id', contentController_1.ContentController.getById);
router.put('/:id', auth_1.protect, (0, auth_1.authorize)('admin'), contentController_1.ContentController.update);
router.delete('/:id', auth_1.protect, (0, auth_1.authorize)('admin'), contentController_1.ContentController.delete);
exports.contentRoutes = router;
