import { Router } from 'express';
import { listUsuarios, deleteUsuario } from '../controllers/usuariosController.js';

const router = Router();

router.post('/:id/delete', async (req, res) => {
  await deleteUsuario(req.params.id);
  res.redirect('/usuarios');
});

router.get('/', async (req, res) => {
  const usuarios = await listUsuarios();
  res.render('usuarios', { usuarios });
});

export default router;
