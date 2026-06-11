import { Router } from 'express';
import { postCliente, deleteClienteHandler } from '../controllers/clientesController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = Router();

router.use(verifyToken);

router.post('/', postCliente);

router.post('/:id/delete', deleteClienteHandler);

export default router;
