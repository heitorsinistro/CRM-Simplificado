import { Router } from 'express';
import { getDashboardMetrics } from '../controllers/dashboardController.js';
import { getClientes } from '../controllers/clientesController.js';
import { getOportunidades } from '../controllers/oportunidadesController.js';
import { getInteracoes } from '../controllers/interacoesController.js';
import { getUsuarios } from '../controllers/usuariosController.js';

const router = Router();

router.get('/', (req, res) => {
  res.redirect('/login');
});

router.get('/login', (req, res) => {
  res.render('login', { message: null });
});

router.get('/registro', (req, res) => {
  res.render('registro', { message: null });
});

router.get('/dashboard', async (req, res) => {
  const metrics = await getDashboardMetrics();
  res.render('dashboard', metrics);
});

router.get('/clientes', getClientes);

router.get('/oportunidades', getOportunidades);

router.get('/interacoes', getInteracoes);

router.get('/usuarios', getUsuarios);

export default router;
