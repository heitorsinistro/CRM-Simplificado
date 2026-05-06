import { Router } from 'express';
import { createInteracao, deleteInteracao } from '../controllers/interacoesController.js';

const router = Router();

router.post('/', async (req, res) => {
  try {
    await createInteracao(req.body);
    return res.redirect('/interacoes');
  } catch (error) {
    return res.status(400).render('interacoes', { interacoes: [], clientes: [], oportunidades: [], message: error.message });
  }
});

router.post('/:id/delete', async (req, res) => {
  await deleteInteracao(req.params.id);
  res.redirect('/interacoes');
});

export default router;
