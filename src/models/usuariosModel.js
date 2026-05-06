import db from '../config/db.js';

export async function listUsuarios() {
  const [rows] = await db.execute('SELECT id, nome, email, cargo, bloqueado, DATE_FORMAT(criado_em, "%d/%m/%Y") AS criado_em FROM usuarios ORDER BY criado_em DESC');
  return rows;
}

export async function deleteUsuario(id) {
  await db.execute('DELETE FROM usuarios WHERE id = ?', [id]);
}
