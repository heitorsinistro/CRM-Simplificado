import { Router } from 'express';
import { postOportunidade, deleteOportunidadeHandler } from '../controllers/oportunidadesController.js';

const router = Router();

router.post('/', postOportunidade);

router.post('/:id/delete', deleteOportunidadeHandler);

export default router;
