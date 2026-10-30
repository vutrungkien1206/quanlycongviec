function requireLogin(req, res, next) {
  if (!req.session.userId) {
    return res.status(401).json({ message: 'Bạn chưa đăng nhập' });
  }
  next();
}

module.exports = requireLogin;