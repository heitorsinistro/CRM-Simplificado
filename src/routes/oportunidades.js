import { Router } from 'express';
import { postOportunidade, deleteOportunidadeHandler } from '../controllers/oportunidadesController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = Router();

router.use(verifyToken);

router.post('/', postOportunidade);

router.post('/:id/delete', deleteOportunidadeHandler);

export default router;
