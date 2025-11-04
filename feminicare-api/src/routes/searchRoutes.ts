import express from 'express';
import { SearchController } from '../controllers/searchController';

const router = express.Router();

router.get('/', SearchController.search);

export const searchRoutes = router;