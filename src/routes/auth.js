import { Router } from 'express';
import { login, register } from '../controllers/authController.js';

const router = Router();

router.post('/login', login);

router.post('/register', register);

router.get('/logout', (req, res) => {
  try { res.clearCookie && res.clearCookie('token'); } catch (_) {}
  res.redirect('/login');
});

export default router;
