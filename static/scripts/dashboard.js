// Aguarda o DOM carregar completamente
document.addEventListener('DOMContentLoaded', () => {
  
  /* -----------------------------------------------------------
     1. GRÁFICO DE PIZZA / FUNIL DE VENDAS (Oportunidades)
     ----------------------------------------------------------- */
  const ctxPizza = document.getElementById('graficoEtapas');
  
  // Lê as variáveis diretamente do objeto window global
  if (ctxPizza && typeof window.dadosGraficoPizza !== 'undefined') {
    const dadosPizza = window.dadosGraficoPizza;
    
    // Mapeia os dados vindos do MySQL: ex. [{ etapa: 'Contato', quantidade: 3 }]
    const labelsPizza = dadosPizza.map(item => item.etapa);
    const valoresPizza = dadosPizza.map(item => item.quantidade);

    new Chart(ctxPizza, {
      type: 'pie',
      data: {
        labels: labelsPizza.length ? labelsPizza : ['Sem dados'],
        datasets: [{
          label: 'Quantidade',
          data: valoresPizza.length ? valoresPizza : [0],
          backgroundColor: [
            '#3b82f6', // Contato (Azul)
            '#eab308', // Proposta (Amarelo)
            '#a855f7', // Negociação (Roxo)
            '#22c55e', // Fechamento (Verde)
            '#ef4444'  // Perdida (Vermelho)
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'bottom' }
        }
      }
    });
  }

  /* -----------------------------------------------------------
     2. GRÁFICO DE LINHA / FLUXO DE INTERAÇÕES (Últimos 7 dias)
     ----------------------------------------------------------- */
  const ctxLinha = document.getElementById('graficoInteracoes');

  // Lê as variáveis diretamente do objeto window global
  if (ctxLinha && typeof window.dadosGraficoLinha !== 'undefined') {
    const dadosLinha = window.dadosGraficoLinha;

    // Formata a data vinda do MySQL (YYYY-MM-DD) para formato brasileiro (DD/MM)
    const labelsLinha = dadosLinha.map(item => {
      const data = new Date(item.dia);
      return data.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', timeZone: 'UTC' });
    });
    const valoresLinha = dadosLinha.map(item => item.total);

    new Chart(ctxLinha, {
      type: 'line',
      data: {
        labels: labelsLinha.length ? labelsLinha : ['Sem interações'],
        datasets: [{
          label: 'Interações',
          data: valoresLinha.length ? valoresLinha : [0],
          borderColor: '#3b82f6',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          fill: true,
          tension: 0.3, // Deixa a linha levemente curvada/suave
          pointRadius: 5,
          pointHoverRadius: 7
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            ticks: { stepSize: 1 } // Força a escala a pular de 1 em 1 inteiro
          }
        },
        plugins: {
          legend: { display: false } // Esconde a legenda para ganhar espaço
        }
      }
    });
  }
});
