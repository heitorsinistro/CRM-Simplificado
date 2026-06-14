import crypto from 'crypto';
import Joi from 'joi';
import { registerUser as registerInModel, loginUser as loginInModel } from '../models/authModel.js';

const registerSchema = Joi.object({
  nome: Joi.string().min(3).required().messages({
    'string.empty': 'Nome é obrigatório',
    'string.min': 'Nome deve ter no mínimo 3 caracteres',
    'any.required': 'Nome é obrigatório'
  }),
  email: Joi.string().email().required().messages({
    'string.empty': 'Email é obrigatório',
    'string.email': 'Email inválido',
    'any.required': 'Email é obrigatório'
  }),
  senha: Joi.string().min(6).required().messages({
    'string.empty': 'Senha é obrigatória',
    'string.min': 'Senha deve ter no mínimo 6 caracteres',
    'any.required': 'Senha é obrigatória'
  })
});

const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.empty': 'Email é obrigatório',
    'string.email': 'Email inválido',
    'any.required': 'Email é obrigatório'
  }),
  senha: Joi.string().min(6).required().messages({
    'string.empty': 'Senha é obrigatória',
    'string.min': 'Senha deve ter no mínimo 6 caracteres',
    'any.required': 'Senha é obrigatória'
  })
});

export async function registerUser(payload) {
  const { error, value } = registerSchema.validate(payload, { abortEarly: false });
  if (error) {
    const err = new Error('Validation failed');
    err.validation = error.details.map(d => ({ path: d.path.join('.'), message: d.message }));
    throw err;
  }

  await registerInModel(value);
}

export async function loginUser(payload) {
  const { error, value } = loginSchema.validate(payload, { abortEarly: false });
  if (error) {
    const err = new Error('Validation failed');
    err.validation = error.details.map(d => ({ path: d.path.join('.'), message: d.message }));
    throw err;
  }

  return await loginInModel(value);
}
