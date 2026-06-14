import { Router } from 'express';
import { postInteracao, deleteInteracaoHandler, editInteracaoHandler } from '../controllers/interacoesController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = Router();

router.use(verifyToken);

router.post('/', postInteracao);

router.post('/:id/delete', deleteInteracaoHandler);
router.post('/:id/edit', editInteracaoHandler);

export default router;
