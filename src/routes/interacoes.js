import { Router } from 'express';
import { postInteracao, deleteInteracaoHandler } from '../controllers/interacoesController.js';

const router = Router();

router.post('/', postInteracao);

router.post('/:id/delete', deleteInteracaoHandler);

export default router;
