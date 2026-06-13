import { listOportunidades, createOportunidade, deleteOportunidade } from '../services/oportunidadesService.js';
import { listClientes } from '../services/clientesService.js';
import { getUserMessage } from '../utils/errorUtils.js';

export async function getOportunidades(req, res) {
  try {
    const oportunidades = await listOportunidades();
    const clientes = await listClientes();
    res.render('oportunidades', { oportunidades, clientes, message: null, modalError: null });
  } catch (error) {
    res.status(500).render('oportunidades', { oportunidades: [], clientes: [], message: 'Erro ao carregar oportunidades.', modalError: null });
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
    const modalError = getUserMessage(error, 'Não foi possível criar a oportunidade. Tente novamente.');
    res.status(400).render('oportunidades', { oportunidades, clientes, message: null, modalError });
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
