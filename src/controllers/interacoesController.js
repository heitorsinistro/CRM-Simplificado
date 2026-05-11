import { listInteracoes, createInteracao, deleteInteracao } from '../services/interacoesService.js';
import { listClientes } from '../services/clientesService.js';
import { listOportunidades } from '../services/oportunidadesService.js';

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
    const interacoes = await listInteracoes();
    const clientes = await listClientes();
    const oportunidades = await listOportunidades();
    res.status(400).render('interacoes', { interacoes, clientes, oportunidades, message: null, modalError: error.message });
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
