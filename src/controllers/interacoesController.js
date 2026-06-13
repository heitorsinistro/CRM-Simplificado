import { listInteracoes, createInteracao, deleteInteracao } from '../services/interacoesService.js';
import { listClientes } from '../services/clientesService.js';
import { listOportunidades } from '../services/oportunidadesService.js';
import { getUserMessage } from '../utils/errorUtils.js';

export async function getInteracoes(req, res) {
  try {
    const interacoes = await listInteracoes();
    const clientes = await listClientes();
    const oportunidades = await listOportunidades();
    res.render('interacoes', { interacoes, clientes, oportunidades, message: null, modalError: null });
  } catch (error) {
    res.status(500).render('interacoes', { interacoes: [], clientes: [], oportunidades: [], message: 'Erro ao carregar interações.', modalError: null });
  }
}

export async function postInteracao(req, res) {
  try {
    await createInteracao(req.body);
    res.redirect('/interacoes');
  } catch (error) {
    console.error('postInteracao error:', error);
    const interacoes = await listInteracoes();
    const clientes = await listClientes();
    const oportunidades = await listOportunidades();
    const modalError = getUserMessage(error, 'Não foi possível criar a interação. Tente novamente.');
    res.status(400).render('interacoes', { interacoes, clientes, oportunidades, message: null, modalError });
  }
}

export async function deleteInteracaoHandler(req, res) {
  try {
    await deleteInteracao(req.params.id);
    res.redirect('/interacoes');
  } catch (error) {
    res.status(500).redirect('/interacoes');
  }
}
