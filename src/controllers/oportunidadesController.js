import { listOportunidades, createOportunidade, deleteOportunidade } from '../services/oportunidadesService.js';
import { listClientes } from '../services/clientesService.js';

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
    const oportunidades = await listOportunidades();
    const clientes = await listClientes();
    res.status(400).render('oportunidades', { oportunidades, clientes, message: null, modalError: error.message });
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
