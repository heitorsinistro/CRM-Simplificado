import { Router } from 'express';
import { createCliente, deleteCliente } from '../controllers/clientesController.js';

const router = Router();

router.post('/', async (req, res) => {
  try {
    await createCliente(req.body);
    return res.redirect('/clientes');
  } catch (error) {
    return res.status(400).render('clientes', { clientes: [], message: error.message });
  }
});

router.post('/:id/delete', async (req, res) => {
  await deleteCliente(req.params.id);
  res.redirect('/clientes');
});

export default router;
