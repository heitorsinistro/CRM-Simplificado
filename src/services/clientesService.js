import Joi from 'joi';
import { listClientes as listFromModel, createCliente as createInModel, deleteCliente as deleteFromModel } from '../models/clientesModel.js';

const clienteSchema = Joi.object({
  nome: Joi.string().min(2).required().messages({
    'string.empty': 'Nome é obrigatório',
    'string.min': 'Nome deve ter no mínimo 2 caracteres',
    'any.required': 'Nome é obrigatório'
  }),
  empresa: Joi.string().required().messages({
    'string.empty': 'Empresa é obrigatória',
    'any.required': 'Empresa é obrigatória'
  }),
  email: Joi.string().email().required().messages({
    'string.empty': 'Email é obrigatório',
    'string.email': 'Email inválido',
    'any.required': 'Email é obrigatório'
  }),
  telefone: Joi.string().required().messages({
    'string.empty': 'Telefone é obrigatório',
    'any.required': 'Telefone é obrigatório'
  }),
  categoria: Joi.string().valid('lead', 'contato', 'qualificado', 'cliente_ativo', 'cliente_inativo', 'cliente_perdido').required().messages({
    'any.required': 'Categoria é obrigatória'
  }),
  anotacoes: Joi.string().allow('', null)
});

export async function listClientes() {
  return await listFromModel();
}

export async function createCliente(payload) {
  const { error, value } = clienteSchema.validate(payload, { abortEarly: false });
  if (error) {
    throw new Error(error.details.map(detail => detail.message).join(', '));
  }

  await createInModel(value);
}

export async function deleteCliente(id) {
  await deleteFromModel(id);
}