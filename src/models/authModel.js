import crypto from 'crypto';
import db from '../config/db.js';

function hashPassword(password) {
  return crypto.createHash('sha256').update(password).digest('hex');
}

export async function registerUser(value) {
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

export async function loginUser(value) {
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
