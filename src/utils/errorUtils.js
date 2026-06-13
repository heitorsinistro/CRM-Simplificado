export function getUserMessage(error, fallback) {
  if (!error) return fallback;
  const msg = String(error.message || error);

  // Mensagens conhecidas/seguros para o usuário (validação e domínio)
  const safePatterns = [
    /Obrigad/i,
    /inválid/i,
    /válid/i,
    /Já existe/i,
    /bloquead/i,
    /Email inválid/i,
    /Telefone/i,
    /Etapa/i,
    /Tipo de interação/i,
    /Cliente inválid/i,
    /Valor/i
  ];

  for (const p of safePatterns) {
    if (p.test(msg)) return msg;
  }

  // Mensagens técnicas que não devem ser expostas
  return fallback || 'Ocorreu um erro. Tente novamente mais tarde.';
}
