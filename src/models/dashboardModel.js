import db from '../config/db.js';

export async function getDashboardMetrics() {
  const [[{ totalClientes }]] = await db.execute('SELECT COUNT(*) AS totalClientes FROM clientes');
  const [[{ totalOportunidades }]] = await db.execute('SELECT COUNT(*) AS totalOportunidades FROM oportunidades');
  const [[{ interacoesHoje }]] = await db.execute("SELECT COUNT(*) AS interacoesHoje FROM interacoes WHERE DATE(data) = CURDATE()");
  const [ultimosClientes] = await db.execute('SELECT id, nome, empresa FROM clientes ORDER BY criado_em DESC LIMIT 5');

  // Dados para gráfico de pizza / funil de vendas: contagem por etapa
  const [dadosPizzaRows] = await db.execute(
    `SELECT etapa, COUNT(*) AS quantidade
     FROM oportunidades
     GROUP BY etapa`
  );

  // Dados para gráfico de linha: interações por dia nos últimos 7 dias
  const [dadosLinhaRows] = await db.execute(
    `SELECT DATE(data) AS dia, COUNT(*) AS total
     FROM interacoes
     WHERE DATE(data) >= CURDATE() - INTERVAL 6 DAY
     GROUP BY DATE(data)
     ORDER BY DATE(data) ASC`
  );

  return {
    totalClientes,
    totalOportunidades,
    interacoesHoje,
    ultimosClientes,
    dadosPizza: dadosPizzaRows,
    dadosLinha: dadosLinhaRows
  };
}
