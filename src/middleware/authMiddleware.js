import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'dev_change_this_secret';

function getTokenFromReq(req) {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) return authHeader.split(' ')[1];

  const cookie = req.headers.cookie;
  if (!cookie) return null;
  const match = cookie.split(';').map(s => s.trim()).find(s => s.startsWith('token='));
  if (!match) return null;
  return decodeURIComponent(match.split('=')[1]);
}

export function verifyToken(req, res, next) {
  const token = getTokenFromReq(req);
  if (!token) {
    return res.redirect('/login');
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    res.locals.user = decoded;
    return next();
  } catch (err) {
    try { res.clearCookie && res.clearCookie('token'); } catch (_) {}
    return res.redirect('/login');
  }
}

export function getTokenFromRequest(req) {
  return getTokenFromReq(req);
}
