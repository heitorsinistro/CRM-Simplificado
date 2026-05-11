import db from '../config/db.js';

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

export async function createInteracao(value) {
  const oportunidadeId = value.oportunidade_id || null;

  // arrumar usuario_id
  await db.execute(
    'INSERT INTO interacoes (cliente_id, oportunidade_id, tipo, descricao, proxima_acao, data) VALUES (?, ?, ?, ?, ?, NOW())',
    [value.cliente_id, oportunidadeId, value.tipo, value.descricao || '', value.proxima_acao || '']
  );
}

export async function deleteInteracao(id) {
  await db.execute('DELETE FROM interacoes WHERE id = ?', [id]);
}
