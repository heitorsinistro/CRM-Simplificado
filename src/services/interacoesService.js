import Joi from 'joi';
import { listInteracoes as listFromModel, createInteracao as createInModel, deleteInteracao as deleteFromModel, updateInteracao as updateInModel } from '../models/interacoesModel.js';

const interacaoSchema = Joi.object({
  cliente_id: Joi.number().integer().required().messages({
    'number.base': 'Cliente inválido',
    'any.required': 'Cliente é obrigatório'
  }),
  oportunidade_id: Joi.number().integer().allow(null, '').messages({
    'number.base': 'Oportunidade inválida'
  }),
  tipo: Joi.string().valid('Ligação', 'Reunião', 'WhatsApp', 'E-mail', 'Anotação', 'Outro').required().messages({
    'any.required': 'Tipo de interação é obrigatório',
    'any.only': 'Tipo de interação inválido'
  }),
  descricao: Joi.string().allow('', null),
  proxima_acao: Joi.string().allow('', null)
});

export async function listInteracoes() {
  return await listFromModel();
}

export async function createInteracao(payload) {
  const { error, value } = interacaoSchema.validate(payload, { abortEarly: false });
  if (error) {
    const err = new Error('Validation failed');
    err.validation = error.details.map(d => ({ path: d.path.join('.'), message: d.message }));
    throw err;
  }

  await createInModel(value);
}

export async function updateInteracao(id, payload) {
  const { error, value } = interacaoSchema.validate(payload, { abortEarly: false });
  if (error) {
    const err = new Error('Validation failed');
    err.validation = error.details.map(d => ({ path: d.path.join('.'), message: d.message }));
    throw err;
  }

  await updateInModel(id, value);
}

export async function deleteInteracao(id) {
  await deleteFromModel(id);
}
