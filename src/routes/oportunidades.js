import { Router } from 'express';
import { postOportunidade, deleteOportunidadeHandler, editOportunidadeHandler } from '../controllers/oportunidadesController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = Router();

router.use(verifyToken);

router.post('/', postOportunidade);

router.post('/:id/delete', deleteOportunidadeHandler);
router.post('/:id/edit', editOportunidadeHandler);

export default router;
