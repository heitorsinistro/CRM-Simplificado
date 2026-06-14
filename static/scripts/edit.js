document.addEventListener('DOMContentLoaded', () => {
  function wireEditButtons() {
    document.querySelectorAll('button.action.edit').forEach(btn => {
      btn.addEventListener('click', () => {
        // Determine which modal/form exists on the page
        const clienteForm = document.getElementById('clienteForm');
        const oportunidadeForm = document.getElementById('oportunidadeForm');
        const interacaoForm = document.getElementById('interacaoForm');

        if (clienteForm) {
          const modal = document.getElementById('modalCliente');
          modal.classList.remove('hidden');
          // fill values
          clienteForm.nome.value = btn.dataset.nome || '';
          clienteForm.empresa.value = btn.dataset.empresa || '';
          clienteForm.email.value = btn.dataset.email || '';
          clienteForm.telefone.value = btn.dataset.telefone || '';
          clienteForm.categoria.value = btn.dataset.categoria || '';
          clienteForm.anotacoes.value = btn.dataset.anotacoes || '';
          // change action
          clienteForm.dataset.originalAction = clienteForm.action;
          clienteForm.action = `/clientes/${btn.dataset.id}/edit`;
          // change title and button
          const title = modal.querySelector('h2');
          if (title) title.textContent = 'Editar Cliente';
          const saveBtn = clienteForm.querySelector('button[type="submit"], .save');
          if (saveBtn) saveBtn.textContent = 'Salvar Alterações';
        } else if (oportunidadeForm) {
          const modal = document.getElementById('modalOportunidade');
          modal.classList.remove('hidden');
          oportunidadeForm.nome.value = btn.dataset.nome || '';
          oportunidadeForm.cliente_id.value = btn.dataset.cliente_id || '';
          oportunidadeForm.valor.value = btn.dataset.valor || '';
          oportunidadeForm.etapa.value = btn.dataset.etapa || '';
          oportunidadeForm.anotacoes.value = btn.dataset.anotacoes || '';
          oportunidadeForm.dataset.originalAction = oportunidadeForm.action;
          oportunidadeForm.action = `/oportunidades/${btn.dataset.id}/edit`;
          // ensure hidden id field is set so server can detect edit even if action isn't applied
          const idField = oportunidadeForm.querySelector('input[name="id"]');
          if (idField) idField.value = btn.dataset.id || '';
          const title = modal.querySelector('h2');
          if (title) title.textContent = 'Editar Oportunidade';
          const saveBtn = oportunidadeForm.querySelector('button[type="submit"], .save-btn');
          if (saveBtn) saveBtn.textContent = 'Salvar Alterações';
        } else if (interacaoForm) {
          const modal = document.getElementById('modalInteracao');
          modal.classList.remove('hidden');
          interacaoForm.cliente_id.value = btn.dataset.cliente_id || '';
          interacaoForm.oportunidade_id.value = btn.dataset.oportunidade_id || '';
          interacaoForm.tipo.value = btn.dataset.tipo || '';
          interacaoForm.descricao.value = btn.dataset.descricao || '';
          interacaoForm.dataset.originalAction = interacaoForm.action;
          interacaoForm.action = `/interacoes/${btn.dataset.id}/edit`;
          const title = modal.querySelector('h2');
          if (title) title.textContent = 'Editar Interação';
          const saveBtn = interacaoForm.querySelector('button[type="submit"], .save-btn, .save');
          if (saveBtn) saveBtn.textContent = 'Salvar Alterações';
        }
      });
    });
  }

  function wireModalCloseReset() {
    // For each modal close, reset the form action and titles when closed
    document.querySelectorAll('.modal .close').forEach(closeEl => {
      closeEl.addEventListener('click', () => {
        const modal = closeEl.closest('.modal');
        if (!modal) return;
        modal.classList.add('hidden');
        const form = modal.querySelector('form');
        if (!form) return;
        if (form.dataset.originalAction) {
          form.action = form.dataset.originalAction;
          delete form.dataset.originalAction;
        }
        // reset title and button text depending on modal id
        const title = modal.querySelector('h2');
        const saveBtn = form.querySelector('button[type="submit"], .save, .save-btn');
        if (modal.id === 'modalCliente') {
          if (title) title.textContent = 'Adicionar Novo Cliente';
          if (saveBtn) saveBtn.textContent = 'Salvar Cliente';
          form.reset();
        } else if (modal.id === 'modalOportunidade') {
          if (title) title.textContent = 'Nova Oportunidade';
          if (saveBtn) saveBtn.textContent = 'Salvar Oportunidade';
          // clear id hidden field when resetting
          const idField = form.querySelector('input[name="id"]');
          if (idField) idField.value = '';
          form.reset();
        } else if (modal.id === 'modalInteracao') {
          if (title) title.textContent = 'Adicionar Nova Interação';
          if (saveBtn) saveBtn.textContent = 'Salvar Interação';
          form.reset();
        }
      });
    });

    // click outside
    window.addEventListener('click', (event) => {
      document.querySelectorAll('.modal').forEach(modal => {
        if (event.target === modal) {
          modal.classList.add('hidden');
          const form = modal.querySelector('form');
          if (form && form.dataset.originalAction) {
            form.action = form.dataset.originalAction;
            delete form.dataset.originalAction;
            form.reset();
          }
        }
      });
    });
  }

  wireEditButtons();
  wireModalCloseReset();
});
