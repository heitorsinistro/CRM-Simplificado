import { Router } from 'express';
import { postCliente, deleteClienteHandler, editClienteHandler } from '../controllers/clientesController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = Router();

router.use(verifyToken);

router.post('/', postCliente);

router.post('/:id/delete', deleteClienteHandler);
router.post('/:id/edit', editClienteHandler);

export default router;
