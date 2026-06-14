import db from '../config/db.js';

export async function listClientes() {
  const [rows] = await db.execute('SELECT id, nome, empresa, email, telefone, categoria, anotacoes FROM clientes ORDER BY criado_em DESC');
  return rows;
}

export async function createCliente(value) {
  await db.execute(
    'INSERT INTO clientes (nome, empresa, email, telefone, categoria, anotacoes, criado_em) VALUES (?, ?, ?, ?, ?, ?, NOW())',
    [value.nome, value.empresa || '', value.email, value.telefone || '', value.categoria, value.anotacoes || '']
  );
}

export async function deleteCliente(id) {
  await db.execute('DELETE FROM clientes WHERE id = ?', [id]);
}

export async function updateCliente(id, value) {
  await db.execute(
    'UPDATE clientes SET nome = ?, empresa = ?, email = ?, telefone = ?, categoria = ?, anotacoes = ? WHERE id = ?',
    [value.nome, value.empresa || '', value.email, value.telefone || '', value.categoria, value.anotacoes || '', id]
  );
}
