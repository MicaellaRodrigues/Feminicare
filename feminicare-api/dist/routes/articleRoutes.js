"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.articleRoutes = void 0;
const express_1 = __importDefault(require("express"));
const articleController_1 = require("../controllers/articleController");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
router.post('/', auth_1.protect, (0, auth_1.authorize)('admin'), articleController_1.ArticleController.create);
router.get('/', articleController_1.ArticleController.getAll);
router.get('/:id', articleController_1.ArticleController.getById);
router.put('/:id', auth_1.protect, (0, auth_1.authorize)('admin'), articleController_1.ArticleController.update);
router.delete('/:id', auth_1.protect, (0, auth_1.authorize)('admin'), articleController_1.ArticleController.delete);
router.post('/:id/rate', auth_1.protect, articleController_1.ArticleController.rateArticle);
exports.articleRoutes = router;
