import Joi from 'joi';
import db from '../config/db.js';

const interacaoSchema = Joi.object({
  cliente_id: Joi.number().integer().required(),
  oportunidade_id: Joi.number().integer().allow(null, ''),
  tipo: Joi.string().valid('Ligação', 'Reunião', 'WhatsApp', 'E-mail', 'Anotação', 'Outro').required(),
  descricao: Joi.string().allow('', null),
  proxima_acao: Joi.string().allow('', null)
});

export async function listInteracoes() {
  const [rows] = await db.execute(
    `SELECT i.id, c.nome AS cliente, o.nome AS oportunidade, i.tipo, i.descricao, i.proxima_acao, DATE_FORMAT(i.data, '%d/%m/%Y') AS data
     FROM interacoes i
     LEFT JOIN clientes c ON i.cliente_id = c.id
     LEFT JOIN oportunidades o ON i.oportunidade_id = o.id
     ORDER BY i.data DESC`
  );
  return rows;
}

export async function createInteracao(payload) {
  const { error, value } = interacaoSchema.validate(payload, { abortEarly: false });
  if (error) {
    throw new Error(error.details.map(detail => detail.message).join(', '));
  }

  const oportunidadeId = value.oportunidade_id || null;

  await db.execute(
    'INSERT INTO interacoes (cliente_id, oportunidade_id, tipo, descricao, proxima_acao, data, criado_em) VALUES (?, ?, ?, ?, ?, NOW(), NOW())',
    [value.cliente_id, oportunidadeId, value.tipo, value.descricao || '', value.proxima_acao || '']
  );
}

export async function deleteInteracao(id) {
  await db.execute('DELETE FROM interacoes WHERE id = ?', [id]);
}
