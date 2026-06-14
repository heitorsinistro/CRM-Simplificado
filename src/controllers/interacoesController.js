import { listInteracoes, createInteracao, deleteInteracao, updateInteracao } from '../services/interacoesService.js';
import { listClientes } from '../services/clientesService.js';
import { listOportunidades } from '../services/oportunidadesService.js';
import { getUserMessage } from '../utils/errorUtils.js';

export async function getInteracoes(req, res) {
  try {
    const interacoes = await listInteracoes();
    const clientes = await listClientes();
    const oportunidades = await listOportunidades();
    res.render('interacoes', { interacoes, clientes, oportunidades, message: null, fieldErrors: null, values: null });
  } catch (error) {
    res.status(500).render('interacoes', { interacoes: [], clientes: [], oportunidades: [], message: 'Erro ao carregar interações.', fieldErrors: null, values: null });
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
    // Se houver detalhes de validação, repassar por campo e manter valores
    if (error && error.validation) {
      const fieldErrors = {};
      for (const d of error.validation) fieldErrors[d.path] = d.message;
      return res.status(400).render('interacoes', { interacoes, clientes, oportunidades, message: null, fieldErrors, values: req.body });
    }

    const modalError = getUserMessage(error, 'Não foi possível criar a interação. Tente novamente.');
    const fieldErrors = { _global: modalError };
    res.status(400).render('interacoes', { interacoes, clientes, oportunidades, message: null, fieldErrors, values: req.body });
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

export async function editInteracaoHandler(req, res) {
  try {
    await updateInteracao(req.params.id, req.body);
    return res.redirect('/interacoes');
  } catch (error) {
    console.error('editInteracaoHandler error:', error);
    const interacoes = await listInteracoes();
    const clientes = await listClientes();
    const oportunidades = await listOportunidades();
    if (error && error.validation) {
      const fieldErrors = {};
      for (const d of error.validation) fieldErrors[d.path] = d.message;
      return res.status(400).render('interacoes', { interacoes, clientes, oportunidades, message: null, fieldErrors, values: req.body });
    }
    const modalError = getUserMessage(error, 'Não foi possível atualizar a interação.');
    const fieldErrors = { _global: modalError };
    return res.status(500).render('interacoes', { interacoes, clientes, oportunidades, message: null, fieldErrors, values: req.body });
  }
}
