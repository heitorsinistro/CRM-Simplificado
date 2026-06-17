import { Router } from 'express';
import { getDashboardMetrics } from '../controllers/dashboardController.js';
import { getClientes } from '../controllers/clientesController.js';
import { getOportunidades } from '../controllers/oportunidadesController.js';
import { getInteracoes } from '../controllers/interacoesController.js';
import { getUsuarios } from '../controllers/usuariosController.js';
import { verifyToken, requireAdmin } from '../middleware/authMiddleware.js';
import { isConnected } from '../config/db.js';

const router = Router();

router.get('/', (req, res) => {
  res.redirect('/login');
});

router.get('/login', (req, res) => {
  res.render('login', { message: null, fieldErrors: null, values: null });
});

router.get('/registro', (req, res) => {
  res.render('registro', { message: null, fieldErrors: null, values: null });
});

router.get('/health', async (req, res) => {
  const ok = await isConnected();
  res.status(ok ? 200 : 503).json({ db: ok });
});

router.get('/dashboard', verifyToken, async (req, res) => {
  const metrics = await getDashboardMetrics();
  res.render('dashboard', metrics);
});

router.get('/clientes', verifyToken, getClientes);

router.get('/oportunidades', verifyToken, getOportunidades);

router.get('/interacoes', verifyToken, getInteracoes);

router.get('/usuarios', verifyToken, requireAdmin, getUsuarios);

export default router;
