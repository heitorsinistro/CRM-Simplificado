import { registerUser, loginUser } from '../services/authService.js';

export async function register(req, res) {
  try {
    await registerUser(req.body);
    res.redirect('/login');
  } catch (error) {
    res.status(400).render('registro', { message: error.message });
  }
}

export async function login(req, res) {
  try {
    const user = await loginUser(req.body);
    if (!user) {
      return res.status(400).render('login', { message: 'Email ou senha inválidos.' });
    }
    req.session.user = user;
    res.redirect('/dashboard');
  } catch (error) {
    res.status(400).render('login', { message: error.message });
  }
}
