import Joi from 'joi';
import db from '../config/db.js';

const oportunidadeSchema = Joi.object({
  nome: Joi.string().min(2).required(),
  cliente_id: Joi.number().integer().required(),
  valor: Joi.number().precision(2).min(0).required(),
  etapa: Joi.string().valid('Contato', 'Proposta', 'Negociação', 'Fechamento', 'Perdida').required(),
  anotacoes: Joi.string().allow('', null)
});

export async function listOportunidades() {
  const [rows] = await db.execute(
    `SELECT o.id, o.nome, c.nome AS cliente, o.valor, o.etapa, o.anotacoes
     FROM oportunidades o
     LEFT JOIN clientes c ON o.cliente_id = c.id
     ORDER BY o.criado_em DESC`
  );
  return rows;
}

export async function createOportunidade(payload) {
  const { error, value } = oportunidadeSchema.validate(payload, { abortEarly: false });
  if (error) {
    throw new Error(error.details.map(detail => detail.message).join(', '));
  }

  await db.execute(
    'INSERT INTO oportunidades (nome, cliente_id, valor, etapa, anotacoes, criado_em) VALUES (?, ?, ?, ?, ?, NOW())',
    [value.nome, value.cliente_id, value.valor, value.etapa, value.anotacoes || '']
  );
}

export async function deleteOportunidade(id) {
  await db.execute('DELETE FROM oportunidades WHERE id = ?', [id]);
}
