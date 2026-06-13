import { registerUser, loginUser } from '../services/authService.js';
import jwt from 'jsonwebtoken';
import { getUserMessage } from '../utils/errorUtils.js';

const JWT_SECRET = process.env.JWT_SECRET || 'dev_change_this_secret';

export async function register(req, res) {
  try {
    await registerUser(req.body);
    res.redirect('/login');
  } catch (error) {
    console.error('Register error:', error);
    const displayMessage = getUserMessage(error, 'Ocorreu um erro ao registrar. Tente novamente mais tarde.');
    res.status(400).render('registro', { message: displayMessage });
  }
}

export async function login(req, res) {
  try {
    const user = await loginUser(req.body);
    if (!user) {
      return res.status(400).render('login', { message: 'Email ou senha inválidos.' });
    }

    const token = jwt.sign({ id: user.id, nome: user.nome, email: user.email }, JWT_SECRET, { expiresIn: '1h' });

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 1000
    });

    res.redirect('/dashboard');
  } catch (error) {
    console.error('Login error:', error);
    const displayMessage = getUserMessage(error, 'Ocorreu um erro ao processar o login. Tente novamente mais tarde.');
    res.status(400).render('login', { message: displayMessage });
  }
}
