import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import routes from './routes/index.js';
import { isConnected } from './config/db.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/styles', express.static(path.join(__dirname, 'public', 'styles')));
app.use('/static', express.static(path.join(__dirname, 'public')));

// Middleware: verifica estado do DB e responde 503 se indisponível
app.use(async (req, res, next) => {
  // paths públicos que não dependem do DB
  const publicPrefixes = ['/health', '/login', '/registro', '/styles', '/static', '/auth/login', '/auth/register'];
  if (publicPrefixes.some(p => req.path.startsWith(p))) return next();

  const ok = await isConnected();
  if (!ok) {
    if (req.headers.accept && req.headers.accept.includes('application/json')) {
      return res.status(503).json({ error: 'Serviço temporariamente indisponível' });
    }
    return res.status(503).render('maintenance', { message: 'Serviço em manutenção — tente mais tarde.' });
  }
  return next();
});

app.use(routes);

app.use((req, res) => {
  res.status(404).render('404', { path: req.originalUrl });
});

export default app;