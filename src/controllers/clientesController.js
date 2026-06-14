import { listClientes, createCliente, deleteCliente, updateCliente } from '../services/clientesService.js';
import { getUserMessage } from '../utils/errorUtils.js';

export async function getClientes(req, res) {
  try {
    const clientes = await listClientes();
    res.render('clientes', { clientes, message: null, fieldErrors: null, values: null });
  } catch (error) {
    res.status(500).render('clientes', { clientes: [], message: 'Erro ao carregar clientes.', fieldErrors: null, values: null });
  }
}

export async function postCliente(req, res) {
  try {
    await createCliente(req.body);
    res.redirect('/clientes');
  } catch (error) {
    console.error('postCliente error:', error);
    const clientes = await listClientes();
    // Se houver detalhes de validação, repassar por campo e manter valores
    if (error && error.validation) {
      const fieldErrors = {};
      for (const d of error.validation) fieldErrors[d.path] = d.message;
      return res.status(400).render('clientes', { clientes, message: null, fieldErrors, values: req.body });
    }

    const modalError = getUserMessage(error, 'Não foi possível criar o cliente. Tente novamente.');
    const fieldErrors = { _global: modalError };
    res.status(400).render('clientes', { clientes, message: null, fieldErrors, values: req.body });
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

export async function editClienteHandler(req, res) {
  try {
    await updateCliente(req.params.id, req.body);
    return res.redirect('/clientes');
  } catch (error) {
    console.error('editClienteHandler error:', error);
    const clientes = await listClientes();
    if (error && error.validation) {
      const fieldErrors = {};
      for (const d of error.validation) fieldErrors[d.path] = d.message;
      return res.status(400).render('clientes', { clientes, message: null, fieldErrors, values: req.body });
    }

    return res.status(500).render('clientes', { clientes, message: 'Não foi possível atualizar o cliente.', fieldErrors: null, values: req.body });
  }
}
