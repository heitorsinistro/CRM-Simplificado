import { Router } from 'express';
import { getDashboardMetrics } from '../controllers/dashboardController.js';
import { listClientes } from '../controllers/clientesController.js';
import { listOportunidades } from '../controllers/oportunidadesController.js';
import { listInteracoes } from '../controllers/interacoesController.js';
import { listUsuarios } from '../controllers/usuariosController.js';

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

router.get('/clientes', async (req, res) => {
  const clientes = await listClientes();
  res.render('clientes', { clientes, message: null });
});

router.get('/oportunidades', async (req, res) => {
  const oportunidades = await listOportunidades();
  const clientes = await listClientes();
  res.render('oportunidades', { oportunidades, clientes, message: null });
});

router.get('/interacoes', async (req, res) => {
  const interacoes = await listInteracoes();
  const clientes = await listClientes();
  const oportunidades = await listOportunidades();
  res.render('interacoes', { interacoes, clientes, oportunidades, message: null });
});

router.get('/usuarios', async (req, res) => {
  const usuarios = await listUsuarios();
  res.render('usuarios', { usuarios });
});

export default router;
