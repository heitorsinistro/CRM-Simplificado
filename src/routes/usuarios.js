import { Router } from 'express';
import { deleteUsuarioHandler } from '../controllers/usuariosController.js';
import { verifyToken, requireAdmin } from '../middleware/authMiddleware.js';

const router = Router();

router.use(verifyToken, requireAdmin);

router.post('/:id/delete', deleteUsuarioHandler);

export default router;
