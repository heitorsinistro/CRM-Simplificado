import db from '../config/db.js';

export async function listOportunidades() {
  const [rows] = await db.execute(
    `SELECT o.id, o.nome, o.cliente_id, c.nome AS cliente, o.valor, o.etapa, o.anotacoes
     FROM oportunidades o
     LEFT JOIN clientes c ON o.cliente_id = c.id
     ORDER BY o.criado_em DESC`
  );
  return rows.map(row => ({
    ...row,
    valor: parseFloat(row.valor) || 0
  }));
}

export async function createOportunidade(value) {
  await db.execute(
    'INSERT INTO oportunidades (nome, cliente_id, valor, etapa, anotacoes, criado_em) VALUES (?, ?, ?, ?, ?, NOW())',
    [value.nome, value.cliente_id, value.valor, value.etapa, value.anotacoes || '']
  );
}

export async function updateOportunidade(id, value) {
  await db.execute(
    'UPDATE oportunidades SET nome = ?, cliente_id = ?, valor = ?, etapa = ?, anotacoes = ? WHERE id = ?',
    [value.nome, value.cliente_id || null, value.valor, value.etapa, value.anotacoes || '', id]
  );
}

export async function deleteOportunidade(id) {
  await db.execute('DELETE FROM oportunidades WHERE id = ?', [id]);
}
