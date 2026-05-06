import db from '../config/db.js';

export async function getDashboardMetrics() {
  const [[{ totalClientes }]] = await db.execute('SELECT COUNT(*) AS totalClientes FROM clientes');
  const [[{ totalOportunidades }]] = await db.execute('SELECT COUNT(*) AS totalOportunidades FROM oportunidades');
  const [[{ interacoesHoje }]] = await db.execute("SELECT COUNT(*) AS interacoesHoje FROM interacoes WHERE DATE(data) = CURDATE()");
  const [ultimosClientes] = await db.execute('SELECT id, nome, empresa FROM clientes ORDER BY criado_em DESC LIMIT 5');

  return {
    totalClientes,
    totalOportunidades,
    interacoesHoje,
    ultimosClientes
  };
}
