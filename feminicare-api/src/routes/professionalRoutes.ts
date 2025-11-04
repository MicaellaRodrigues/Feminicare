import express from 'express';
import { ProfessionalController } from '../controllers/professionalController';
import { protect } from '../middleware/auth';

const router = express.Router();

router.post('/', ProfessionalController.create);
router.get('/', ProfessionalController.getAll);
router.get('/:id', ProfessionalController.getById);
router.put('/:id', ProfessionalController.update);
router.delete('/:id', ProfessionalController.delete);

export const professionalRoutes = router;