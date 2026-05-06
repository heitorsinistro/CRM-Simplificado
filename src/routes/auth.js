import { Router } from 'express';
import { loginUser, registerUser } from '../controllers/authController.js';

const router = Router();

router.post('/login', async (req, res) => {
  try {
    const user = await loginUser(req.body);

    if (!user) {
      return res.render('login', { message: 'Email ou senha inválidos.' });
    }

    return res.redirect('/dashboard');
  } catch (error) {
    return res.render('login', { message: error.message });
  }
});

router.post('/register', async (req, res) => {
  try {
    await registerUser(req.body);
    return res.redirect('/login');
  } catch (error) {
    return res.render('registro', { message: error.message });
  }
});

router.get('/logout', (req, res) => {
  res.redirect('/login');
});

export default router;
