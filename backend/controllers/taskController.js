const Task = require('../models/taskModel');

function readTaskData(body) {
  return {
    title: (body.title || '').trim(),
    description: body.description || '',
    dueDate: body.dueDate || null,
    isDone: body.isDone ? 1 : 0
  };
}

exports.getTasks = async (req, res, next) => {
  try {
    const { status, keyword } = req.query;
    res.json(await Task.getAll(req.session.userId, { status, keyword }));
  } catch (err) {
    next(err);
  }
};

exports.createTask = async (req, res, next) => {
  try {
    const data = readTaskData(req.body);
    if (!data.title) {
      return res.status(400).json({ message: 'Tiêu đề không được để trống' });
    }
    const id = await Task.create(req.session.userId, data);
    res.status(201).json(await Task.getOne(id, req.session.userId));
  } catch (err) {
    next(err);
  }
};

exports.updateTask = async (req, res, next) => {
  try {
    const data = readTaskData(req.body);
    if (!data.title) {
      return res.status(400).json({ message: 'Tiêu đề không được để trống' });
    }
    const changed = await Task.update(req.params.id, req.session.userId, data);
    if (!changed) {
      return res.status(404).json({ message: 'Không tìm thấy công việc' });
    }
    res.json(await Task.getOne(req.params.id, req.session.userId));
  } catch (err) {
    next(err);
  }
};

exports.deleteTask = async (req, res, next) => {
  try {
    const removed = await Task.remove(req.params.id, req.session.userId);
    if (!removed) {
      return res.status(404).json({ message: 'Không tìm thấy công việc' });
    }
    res.json({ message: 'Đã xóa công việc' });
  } catch (err) {
    next(err);
  }
};