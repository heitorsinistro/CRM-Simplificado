import { listClientes, createCliente, deleteCliente } from '../services/clientesService.js';

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
    const clientes = await listClientes();
    res.status(400).render('clientes', { clientes, message: null, modalError: error.message });
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
