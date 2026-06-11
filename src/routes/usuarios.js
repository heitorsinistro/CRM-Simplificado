import { Router } from 'express';
import { deleteUsuarioHandler } from '../controllers/usuariosController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = Router();

router.use(verifyToken);

router.post('/:id/delete', deleteUsuarioHandler);

export default router;
