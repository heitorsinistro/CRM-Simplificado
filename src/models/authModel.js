import crypto from 'crypto';
import Joi from 'joi';
import db from '../config/db.js';

const registerSchema = Joi.object({
  nome: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  senha: Joi.string().min(6).required()
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  senha: Joi.string().min(6).required()
});

function hashPassword(password) {
  return crypto.createHash('sha256').update(password).digest('hex');
}

export async function registerUser(payload) {
  const { error, value } = registerSchema.validate(payload, { abortEarly: false });
  if (error) {
    throw new Error(error.details.map(detail => detail.message).join(', '));
  }

  const [existing] = await db.execute('SELECT id FROM usuarios WHERE email = ?', [value.email]);
  if (existing.length > 0) {
    throw new Error('Já existe um usuário cadastrado com este email.');
  }

  const senhaHash = hashPassword(value.senha);
  await db.execute(
    'INSERT INTO usuarios (nome, email, senha, cargo, bloqueado, criado_em) VALUES (?, ?, ?, ?, ?, NOW())',
    [value.nome, value.email, senhaHash, 'user', 0]
  );
}

export async function loginUser(payload) {
  const { error, value } = loginSchema.validate(payload, { abortEarly: false });
  if (error) {
    throw new Error(error.details.map(detail => detail.message).join(', '));
  }

  const [rows] = await db.execute('SELECT id, nome, email, senha, bloqueado FROM usuarios WHERE email = ?', [value.email]);
  if (rows.length === 0) {
    return null;
  }

  const user = rows[0];
  if (user.bloqueado) {
    throw new Error('Usuário bloqueado. Entre em contato com o administrador.');
  }

  if (hashPassword(value.senha) !== user.senha) {
    return null;
  }

  return {
    id: user.id,
    nome: user.nome,
    email: user.email
  };
}
