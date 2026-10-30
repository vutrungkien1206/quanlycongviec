const bcrypt = require('bcryptjs');
const User = require('../models/userModel');

exports.register = async (req, res, next) => {
  try {
    const username = (req.body.username || '').trim();
    const password = req.body.password || '';

    if (username.length < 3) {
      return res.status(400).json({ message: 'Tên đăng nhập tối thiểu 3 ký tự' });
    }
    if (password.length < 6) {
      return res.status(400).json({ message: 'Mật khẩu tối thiểu 6 ký tự' });
    }
    if (await User.findByUsername(username)) {
      return res.status(409).json({ message: 'Tên đăng nhập đã tồn tại' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const id = await User.create(username, passwordHash);

    req.session.userId = id;
    res.status(201).json({ id, username });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findByUsername(username);

    if (!user || !(await bcrypt.compare(password, user.password_hash))) {
      return res.status(401).json({ message: 'Sai tên đăng nhập hoặc mật khẩu' });
    }

    req.session.userId = user.id;
    res.json({ id: user.id, username: user.username });
  } catch (err) {
    next(err);
  }
};

exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.json({ message: 'Đã đăng xuất' });
  });
};

exports.me = async (req, res, next) => {
  try {
    if (!req.session.userId) {
      return res.status(401).json({ message: 'Chưa đăng nhập' });
    }
    res.json(await User.findById(req.session.userId));
  } catch (err) {
    next(err);
  }
};