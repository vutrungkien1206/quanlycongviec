import { useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api';

function AuthPage({ isRegister = false, onAuth }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    try {
      const path = isRegister ? '/auth/register' : '/auth/login';
      const user = await api.post(path, { username, password });
      onAuth(user);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="card auth">
      <h2>{isRegister ? 'Đăng ký' : 'Đăng nhập'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Tên đăng nhập"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="error">{error}</p>}
        <button type="submit">{isRegister ? 'Đăng ký' : 'Đăng nhập'}</button>
      </form>
      {isRegister
        ? <p>Đã có tài khoản? <Link to="/login">Đăng nhập</Link></p>
        : <p>Chưa có tài khoản? <Link to="/register">Đăng ký</Link></p>}
    </div>
  );
}

export default AuthPage;