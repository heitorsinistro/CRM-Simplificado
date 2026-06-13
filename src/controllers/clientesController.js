import { listClientes, createCliente, deleteCliente } from '../services/clientesService.js';
import { getUserMessage } from '../utils/errorUtils.js';

export async function getClientes(req, res) {
  try {
    const clientes = await listClientes();
    res.render('clientes', { clientes, message: null, modalError: null });
  } catch (error) {
    res.status(500).render('clientes', { clientes: [], message: 'Erro ao carregar clientes.', modalError: null });
  }
}

export async function postCliente(req, res) {
  try {
    await createCliente(req.body);
    res.redirect('/clientes');
  } catch (error) {
    console.error('postCliente error:', error);
    const clientes = await listClientes();
    const modalError = getUserMessage(error, 'Não foi possível criar o cliente. Tente novamente.');
    res.status(400).render('clientes', { clientes, message: null, modalError });
  }
}

export async function deleteClienteHandler(req, res) {
  try {
    await deleteCliente(req.params.id);
    res.redirect('/clientes');
  } catch (error) {
    res.status(500).redirect('/clientes');
  }
}
