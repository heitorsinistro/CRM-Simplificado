import { listOportunidades, createOportunidade, deleteOportunidade, updateOportunidade } from '../services/oportunidadesService.js';
import { listClientes } from '../services/clientesService.js';
import { getUserMessage } from '../utils/errorUtils.js';

export async function getOportunidades(req, res) {
  try {
    const oportunidades = await listOportunidades();
    const clientes = await listClientes();
    res.render('oportunidades', { oportunidades, clientes, message: null, fieldErrors: null, values: null });
  } catch (error) {
    res.status(500).render('oportunidades', { oportunidades: [], clientes: [], message: 'Erro ao carregar oportunidades.', fieldErrors: null, values: null });
  }
}

export async function postOportunidade(req, res) {
  try {
    await createOportunidade(req.body);
    res.redirect('/oportunidades');
  } catch (error) {
    console.error('postOportunidade error:', error);
    const oportunidades = await listOportunidades();
    const clientes = await listClientes();
    // Se houver detalhes de validação, repassar por campo e manter valores
    if (error && error.validation) {
      const fieldErrors = {};
      for (const d of error.validation) fieldErrors[d.path] = d.message;
      return res.status(400).render('oportunidades', { oportunidades, clientes, message: null, fieldErrors, values: req.body });
    }

    const modalError = getUserMessage(error, 'Não foi possível criar a oportunidade. Tente novamente.');
    const fieldErrors = { _global: modalError };
    res.status(400).render('oportunidades', { oportunidades, clientes, message: null, fieldErrors, values: req.body });
  }
}

export async function deleteOportunidadeHandler(req, res) {
  try {
    await deleteOportunidade(req.params.id);
    res.redirect('/oportunidades');
  } catch (error) {
    res.status(500).redirect('/oportunidades');
  }
}

export async function editOportunidadeHandler(req, res) {
  try {
    await updateOportunidade(req.params.id, req.body);
    return res.redirect('/oportunidades');
  } catch (error) {
    console.error('editOportunidadeHandler error:', error);
    const oportunidades = await listOportunidades();
    if (error && error.validation) {
      const fieldErrors = {};
      for (const d of error.validation) fieldErrors[d.path] = d.message;
      return res.status(400).render('oportunidades', { oportunidades, clientes: await import('../services/clientesService.js').then(m=>m.listClientes()), message: null, fieldErrors, values: req.body });
    }
    return res.status(500).render('oportunidades', { oportunidades: [], clientes: [], message: 'Não foi possível atualizar.', fieldErrors: null, values: req.body });
  }
}
