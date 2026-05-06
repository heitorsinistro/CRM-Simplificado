import Joi from 'joi';
import db from '../config/db.js';

const clienteSchema = Joi.object({
  nome: Joi.string().min(2).required(),
  empresa: Joi.string().allow('', null),
  email: Joi.string().email().required(),
  telefone: Joi.string().allow('', null),
  categoria: Joi.string().valid('lead', 'contato', 'qualificado', 'cliente_ativo', 'cliente_inativo', 'cliente_perdido').required(),
  anotacoes: Joi.string().allow('', null)
});

export async function listClientes() {
  const [rows] = await db.execute('SELECT id, nome, empresa, email, telefone, categoria, anotacoes FROM clientes ORDER BY criado_em DESC');
  return rows;
}

export async function createCliente(payload) {
  const { error, value } = clienteSchema.validate(payload, { abortEarly: false });
  if (error) {
    throw new Error(error.details.map(detail => detail.message).join(', '));
  }

  await db.execute(
    'INSERT INTO clientes (nome, empresa, email, telefone, categoria, anotacoes, criado_em) VALUES (?, ?, ?, ?, ?, ?, NOW())',
    [value.nome, value.empresa || '', value.email, value.telefone || '', value.categoria, value.anotacoes || '']
  );
}

export async function deleteCliente(id) {
  await db.execute('DELETE FROM clientes WHERE id = ?', [id]);
}
