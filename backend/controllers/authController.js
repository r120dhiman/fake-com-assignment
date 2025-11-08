const userService = require('../services/userService');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret';

async function register(req, res, next) {
  try {
    const { email, name, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'email and password required' });
    await userService.createUser({ email, name, password });
    res.status(201).json({ email, name });
  } catch (err) {
    next(err);
  }
}

async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'email and password required' });
    const user = await userService.verifyUser(email, password);
    if (!user) return res.status(401).json({ error: 'invalid credentials' });
    const token = jwt.sign({ email: user.email, name: user.name }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user });
  } catch (err) {
    next(err);
  }
}

module.exports = { register, login };
