import { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { api } from './api';
import AuthPage from './pages/AuthPage';
import TasksPage from './pages/TasksPage';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Khi mở trang: hỏi server xem cookie phiên còn hiệu lực không
  useEffect(() => {
    api.get('/auth/me')
      .then(setUser)
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="center">Đang tải...</p>;

  return (
    <Routes>
      <Route
        path="/"
        element={user ? <TasksPage user={user} onLogout={() => setUser(null)} /> : <Navigate to="/login" />}
      />
      <Route
        path="/login"
        element={user ? <Navigate to="/" /> : <AuthPage onAuth={setUser} />}
      />
      <Route
        path="/register"
        element={user ? <Navigate to="/" /> : <AuthPage isRegister onAuth={setUser} />}
      />
    </Routes>
  );
}

export default App;