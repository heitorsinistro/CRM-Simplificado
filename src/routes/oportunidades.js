import { Router } from 'express';
import { createOportunidade, deleteOportunidade } from '../controllers/oportunidadesController.js';

const router = Router();

router.post('/', async (req, res) => {
  try {
    await createOportunidade(req.body);
    return res.redirect('/oportunidades');
  } catch (error) {
    return res.status(400).render('oportunidades', { oportunidades: [], clientes: [], message: error.message });
  }
});

router.post('/:id/delete', async (req, res) => {
  await deleteOportunidade(req.params.id);
  res.redirect('/oportunidades');
});

export default router;
