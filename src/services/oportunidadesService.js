import Joi from 'joi';
import { listOportunidades as listFromModel, createOportunidade as createInModel, deleteOportunidade as deleteFromModel, updateOportunidade as updateInModel } from '../models/oportunidadesModel.js';

const oportunidadeSchema = Joi.object({
  nome: Joi.string().min(2).required().messages({
    'string.empty': 'Nome é obrigatório',
    'string.min': 'Nome deve ter no mínimo 2 caracteres',
    'any.required': 'Nome é obrigatório'
  }),
  cliente_id: Joi.number().integer().allow(null).messages({
    'number.base': 'Cliente inválido'
  }),
  valor: Joi.number().precision(2).min(0).required().messages({
    'number.empty': 'Valor é obrigatório',
    'number.base': 'Valor deve ser um número',
    'number.min': 'Valor deve ser maior que 0',
    'any.required': 'Valor é obrigatório'
  }),
  etapa: Joi.string().valid('Contato', 'Proposta', 'Negociação', 'Fechamento', 'Perdida').required().messages({
    'any.required': 'Etapa é obrigatória',
    'any.only': 'Etapa inválida'
  }),
  anotacoes: Joi.string().allow('', null)
});

export async function listOportunidades() {
  return await listFromModel();
}

export async function createOportunidade(payload) {
  // Converter valor para number se for string
  const processedPayload = {
    ...payload,
    valor: typeof payload.valor === 'string' ? parseFloat(payload.valor) : payload.valor,
    cliente_id: payload.cliente_id ? parseInt(payload.cliente_id) : null
  };

  const { error, value } = oportunidadeSchema.validate(processedPayload, { abortEarly: false });
  if (error) {
    const err = new Error('Validation failed');
    err.validation = error.details.map(d => ({ path: d.path.join('.'), message: d.message }));
    throw err;
  }

  await createInModel(value);
}

export async function updateOportunidade(id, payload) {
  const processedPayload = {
    ...payload,
    valor: typeof payload.valor === 'string' ? parseFloat(payload.valor) : payload.valor,
    cliente_id: payload.cliente_id ? parseInt(payload.cliente_id) : null
  };

  const { error, value } = oportunidadeSchema.validate(processedPayload, { abortEarly: false });
  if (error) {
    const err = new Error('Validation failed');
    err.validation = error.details.map(d => ({ path: d.path.join('.'), message: d.message }));
    throw err;
  }

  await updateInModel(id, value);
}

export async function deleteOportunidade(id) {
  await deleteFromModel(id);
}