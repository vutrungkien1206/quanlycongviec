const db = require('../config/db');

async function findByUsername(username) {
  const [rows] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
  return rows[0];
}

async function findById(id) {
  const [rows] = await db.query('SELECT id, username FROM users WHERE id = ?', [id]);
  return rows[0];
}

async function create(username, passwordHash) {
  const [result] = await db.query(
    'INSERT INTO users (username, password_hash) VALUES (?, ?)',
    [username, passwordHash]
  );
  return result.insertId;
}

module.exports = { findByUsername, findById, create };