import { Router } from 'express';
import { deleteUsuarioHandler } from '../controllers/usuariosController.js';

const router = Router();

router.post('/:id/delete', deleteUsuarioHandler);

export default router;
