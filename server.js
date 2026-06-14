import fs from 'fs';
import http from 'http';
import https from 'https';
import path from 'path';
import { fileURLToPath } from 'url';
import app from './src/app.js';

// Simple file logger: duplicate console output to server.log for easier debugging
try {
  const logStream = fs.createWriteStream(path.join(process.cwd(), 'server.log'), { flags: 'a' });
  const origLog = console.log;
  const origError = console.error;
  console.log = (...args) => {
    try { logStream.write(args.map(a => (typeof a === 'string' ? a : JSON.stringify(a))).join(' ') + '\n'); } catch (e) {}
    origLog.apply(console, args);
  };
  console.error = (...args) => {
    try { logStream.write('[ERROR] ' + args.map(a => (typeof a === 'string' ? a : JSON.stringify(a))).join(' ') + '\n'); } catch (e) {}
    origError.apply(console, args);
  };
} catch (e) {
  // If logging setup fails, continue without file logging
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const HTTP_PORT = process.env.PORT || 3000;
const HTTPS_PORT = process.env.HTTPS_PORT || 443;
const KEY_PATH = process.env.KEY_PATH || path.join(__dirname, 'certs', 'key.pem');
const CERT_PATH = process.env.CERT_PATH || path.join(__dirname, 'certs', 'cert.pem');
const PFX_PATH = process.env.PFX_PATH || process.env.PFX || null;
const PASS_PHRASE = process.env.CERT_PASSPHRASE || undefined;

function startHttpRedirector(httpPort, httpsPort) {
  const redirectServer = http.createServer((req, res) => {
    const host = req.headers.host ? req.headers.host.split(':')[0] : 'localhost';
    const location = `https://${host}${httpsPort === 443 ? '' : `:${httpsPort}`}${req.url}`;
    res.writeHead(301, { Location: location });
    res.end();
  });
  redirectServer.listen(httpPort, () => {
    console.log(`HTTP redirector listening on port ${httpPort} (-> HTTPS ${httpsPort})`);
  });
}

// In production (e.g., Render) rely on the platform to terminate TLS
// and bind to the provided PORT. In non-production, attempt to start
// a local HTTPS server (PFX or key/cert) and an HTTP->HTTPS redirector.
if (process.env.NODE_ENV === 'production') {
  const PORT = process.env.PORT || HTTP_PORT;
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT} (production HTTP)`);
  });
} else {
  // Prefer PFX if provided, otherwise key/cert pair.
  try {
    if (PFX_PATH && fs.existsSync(PFX_PATH)) {
      const pfx = fs.readFileSync(PFX_PATH);
      const options = { pfx };
      if (PASS_PHRASE) options.passphrase = PASS_PHRASE;
      https.createServer(options, app).listen(HTTPS_PORT, () => {
        console.log(`HTTPS (PFX) server listening on port ${HTTPS_PORT}`);
      });
      startHttpRedirector(HTTP_PORT, HTTPS_PORT);
    } else if (fs.existsSync(KEY_PATH) && fs.existsSync(CERT_PATH)) {
      const key = fs.readFileSync(KEY_PATH);
      const cert = fs.readFileSync(CERT_PATH);
      const options = { key, cert };
      if (PASS_PHRASE) options.passphrase = PASS_PHRASE;
      https.createServer(options, app).listen(HTTPS_PORT, () => {
        console.log(`HTTPS server listening on port ${HTTPS_PORT}`);
      });
      startHttpRedirector(HTTP_PORT, HTTPS_PORT);
    } else {
      // Fallback to plain HTTP when no certificates found.
      app.listen(HTTP_PORT, () => {
        console.log(`Servidor rodando na porta ${HTTP_PORT} (HTTP)`);
      });
    }
  } catch (err) {
    console.error('Erro ao iniciar servidor HTTPS:', err);
    console.log('Caindo para HTTP...');
    app.listen(HTTP_PORT, () => {
      console.log(`Servidor rodando na porta ${HTTP_PORT} (HTTP)`);
    });
  }
}