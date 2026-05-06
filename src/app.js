import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import routes from './routes/index.js';

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

app.use(routes);

app.use((req, res) => {
  res.status(404).render('404', { path: req.originalUrl });
});

export default app;