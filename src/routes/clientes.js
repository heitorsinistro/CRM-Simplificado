import { Router } from 'express';
import { postCliente, deleteClienteHandler } from '../controllers/clientesController.js';

const router = Router();

router.post('/', postCliente);

router.post('/:id/delete', deleteClienteHandler);

export default router;
