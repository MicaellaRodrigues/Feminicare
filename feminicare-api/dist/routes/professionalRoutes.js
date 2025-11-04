"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.professionalRoutes = void 0;
const express_1 = __importDefault(require("express"));
const professionalController_1 = require("../controllers/professionalController");
const router = express_1.default.Router();
router.post('/', professionalController_1.ProfessionalController.create);
router.get('/', professionalController_1.ProfessionalController.getAll);
router.get('/:id', professionalController_1.ProfessionalController.getById);
router.put('/:id', professionalController_1.ProfessionalController.update);
router.delete('/:id', professionalController_1.ProfessionalController.delete);
exports.professionalRoutes = router;
