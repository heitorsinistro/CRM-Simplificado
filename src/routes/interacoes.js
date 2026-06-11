import { Router } from 'express';
import { postInteracao, deleteInteracaoHandler } from '../controllers/interacoesController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = Router();

router.use(verifyToken);

router.post('/', postInteracao);

router.post('/:id/delete', deleteInteracaoHandler);

export default router;
