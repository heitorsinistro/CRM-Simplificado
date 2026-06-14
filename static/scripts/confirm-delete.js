document.addEventListener('DOMContentLoaded', () => {
  // Create modal container once
  const modalBackdrop = document.createElement('div');
  modalBackdrop.className = 'confirm-modal-backdrop';
  modalBackdrop.style.display = 'none';

  modalBackdrop.innerHTML = `
    <div class="confirm-modal" role="dialog" aria-modal="true" aria-labelledby="confirm-modal-title">
      <h3 id="confirm-modal-title">Confirmar exclusão</h3>
      <p id="confirm-modal-message">Tem certeza que deseja excluir este item?</p>
      <div class="buttons">
        <button class="btn cancel" type="button">Cancelar</button>
        <button class="btn confirm" type="button">Excluir</button>
      </div>
    </div>
  `;

  document.body.appendChild(modalBackdrop);

  const msgEl = modalBackdrop.querySelector('#confirm-modal-message');
  const btnCancel = modalBackdrop.querySelector('.btn.cancel');
  const btnConfirm = modalBackdrop.querySelector('.btn.confirm');

  let pendingForm = null;

  function openModal(message, form) {
    pendingForm = form;
    msgEl.textContent = message;
    modalBackdrop.style.display = 'flex';
    // focus confirm for keyboard users
    btnConfirm.focus();
  }

  function closeModal() {
    pendingForm = null;
    modalBackdrop.style.display = 'none';
  }

  btnCancel.addEventListener('click', () => closeModal());
  btnConfirm.addEventListener('click', () => {
    if (pendingForm) pendingForm.submit();
  });

  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) closeModal();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop.style.display === 'flex') closeModal();
  });

  // Attach to delete forms
  const deleteFormRegex = /\/(clientes|oportunidades|interacoes)\/\d+\/delete$/;
  const deleteForms = Array.from(document.querySelectorAll('form')).filter(f => deleteFormRegex.test(f.action));
  deleteForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const m = form.action.match(deleteFormRegex);
      const type = m ? m[1] : 'item';
      const friendly = type === 'clientes' ? 'cliente' : (type === 'oportunidades' ? 'oportunidade' : 'interação');
      openModal(`Confirma exclusão deste ${friendly}? Esta ação não pode ser desfeita.`, form);
    });
  });
});

