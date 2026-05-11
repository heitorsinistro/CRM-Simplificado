import { listUsuarios, deleteUsuario } from '../services/usuariosService.js';

export async function getUsuarios(req, res) {
  try {
    const usuarios = await listUsuarios();
    res.render('usuarios', { usuarios, message: null, modalError: null });
  } catch (error) {
    res.status(500).render('usuarios', { usuarios: [], message: 'Erro ao carregar usuários.', modalError: null });
  }
}

export async function deleteUsuarioHandler(req, res) {
  try {
    await deleteUsuario(req.params.id);
    res.redirect('/usuarios');
  } catch (error) {
    res.status(500).redirect('/usuarios');
  }
}
