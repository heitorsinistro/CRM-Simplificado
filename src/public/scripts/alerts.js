document.addEventListener('click', (e) => {
  if (e.target.matches('.alert-close') || e.target.matches('.error-close')) {
    const alert = e.target.closest('.alert, .error-message');
    if (!alert) return;
    alert.classList.add('fade-out');
    setTimeout(() => alert.remove(), 250);
  }
});

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.alert:not(.alert-no-auto), .error-message:not(.alert-no-auto)').forEach(a => {
    setTimeout(() => {
      a.classList.add('fade-out');
      setTimeout(() => a.remove(), 240);
    }, 6000);
  });
});
