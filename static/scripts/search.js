// Client-side table search/filtering for Clientes, Oportunidades, Interações
document.addEventListener('DOMContentLoaded', () => {
  function setupSearch(inputId, tableSelector, columnIndex) {
    const input = document.getElementById(inputId);
    const table = document.querySelector(tableSelector);
    if (!input || !table) return;

    const tbody = table.tBodies[0];
    if (!tbody) return;

    // Ensure a "no results" row exists for this table
    function ensureNoResultsRow() {
      let noRow = tbody.querySelector('.no-results-row');
      const colspan = table.tHead && table.tHead.rows[0] ? table.tHead.rows[0].cells.length : 1;
      if (!noRow) {
        noRow = document.createElement('tr');
        noRow.className = 'no-results-row';
        const td = document.createElement('td');
        td.colSpan = colspan;
        td.className = 'empty-msg';
        td.textContent = 'Nenhum resultado encontrado.';
        noRow.appendChild(td);
        noRow.style.display = 'none';
        tbody.appendChild(noRow);
      }
      return noRow;
    }
    const noResultsRow = ensureNoResultsRow();

    input.addEventListener('input', () => {
      const q = input.value.trim().toLowerCase();
      Array.from(tbody.rows).forEach(row => {
        // keep rows that are header-like or empty-message hidden if they have colspan
        if (row.classList.contains('no-results-row')) return; // skip our special row
        const cell = row.cells[columnIndex];
        if (!cell) {
          row.style.display = q === '' ? '' : 'none';
          return;
        }
        const text = cell.textContent.trim().toLowerCase();
        row.style.display = q === '' || text.includes(q) ? '' : 'none';
      });

      // show/hide no-results row depending on visible data rows
      const visibleDataRows = Array.from(tbody.rows).filter(r => r.style.display !== 'none' && !r.classList.contains('no-results-row'));
      noResultsRow.style.display = visibleDataRows.length === 0 ? '' : 'none';
    });
  }

  // Clientes: filtrar pelo nome (primeira coluna)
  setupSearch('searchNome', 'table', 0);
  // Oportunidades: filtrar pelo nome da oportunidade (primeira coluna)
  setupSearch('searchOportunidade', 'table', 0);
  // Interações: filtrar pelo nome do cliente (primeira coluna)
  setupSearch('searchCliente', 'table', 0);
});
