import { Router } from 'express';
import pagesRouter from './pages.js';
import authRouter from './auth.js';
import clientesRouter from './clientes.js';
import oportunidadesRouter from './oportunidades.js';
import interacoesRouter from './interacoes.js';
import usuariosRouter from './usuarios.js';

const router = Router();

router.use('/', pagesRouter);
router.use('/auth', authRouter);
router.use('/clientes', clientesRouter);
router.use('/oportunidades', oportunidadesRouter);
router.use('/interacoes', interacoesRouter);
router.use('/usuarios', usuariosRouter);

export default router;
