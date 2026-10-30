const db = require('../config/db');

const FIELDS = 'id, title, description, due_date AS dueDate, is_done AS isDone';

// Lấy danh sách, có lọc theo trạng thái và tìm theo từ khóa
async function getAll(userId, { status, keyword }) {
  let sql = `SELECT ${FIELDS} FROM tasks WHERE user_id = ?`;
  const params = [userId];

  if (keyword) {
    sql += ' AND title LIKE ?';
    params.push(`%${keyword}%`);
  }
  if (status === 'done') sql += ' AND is_done = 1';
  if (status === 'pending') sql += ' AND is_done = 0';
  if (status === 'overdue') sql += ' AND is_done = 0 AND due_date < CURDATE()';

  sql += ' ORDER BY due_date IS NULL, due_date ASC, id DESC';
  const [rows] = await db.query(sql, params);
  return rows;
}

async function getOne(id, userId) {
  const [rows] = await db.query(
    `SELECT ${FIELDS} FROM tasks WHERE id = ? AND user_id = ?`, [id, userId]
  );
  return rows[0];
}

async function create(userId, { title, description, dueDate }) {
  const [result] = await db.query(
    'INSERT INTO tasks (user_id, title, description, due_date) VALUES (?, ?, ?, ?)',
    [userId, title, description, dueDate]
  );
  return result.insertId;
}

async function update(id, userId, { title, description, dueDate, isDone }) {
  const [result] = await db.query(
    `UPDATE tasks SET title = ?, description = ?, due_date = ?, is_done = ?
     WHERE id = ? AND user_id = ?`,
    [title, description, dueDate, isDone, id, userId]
  );
  return result.affectedRows;
}

async function remove(id, userId) {
  const [result] = await db.query(
    'DELETE FROM tasks WHERE id = ? AND user_id = ?', [id, userId]
  );
  return result.affectedRows;
}

module.exports = { getAll, getOne, create, update, remove };