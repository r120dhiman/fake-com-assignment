const { getDb } = require('../helpers/mongo');
const bcrypt = require('bcryptjs');

async function createUser({ email, name, password }) {
  const db = await getDb();
  const users = db.collection('users');
  const existing = await users.findOne({ email });
  if (existing) throw new Error('User already exists');
  const hash = await bcrypt.hash(password, 10);
  await users.insertOne({ email, name, passwordHash: hash });
  return { email, name };
}

async function verifyUser(email, password) {
  const db = await getDb();
  const users = db.collection('users');
  const u = await users.findOne({ email });
  if (!u) return null;
  const ok = await bcrypt.compare(password, u.passwordHash);
  if (!ok) return null;
  return { email: u.email, name: u.name };
}

async function getUserByEmail(email) {
  const db = await getDb();
  const users = db.collection('users');
  return users.findOne({ email }, { projection: { passwordHash: 0 } });
}

module.exports = { createUser, verifyUser, getUserByEmail };
