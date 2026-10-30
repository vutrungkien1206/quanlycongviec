import { useEffect, useState } from 'react';
import { api } from '../api';
import TaskForm from '../components/TaskForm';
import TaskItem from '../components/TaskItem';

function TasksPage({ user, onLogout }) {
  const [tasks, setTasks] = useState([]);
  const [status, setStatus] = useState('all');
  const [keyword, setKeyword] = useState('');
  const [editingTask, setEditingTask] = useState(null);
  const [error, setError] = useState('');

  // Tải lại danh sách mỗi khi đổi bộ lọc hoặc từ khóa
  useEffect(() => {
    loadTasks();
  }, [status, keyword]);

  async function loadTasks() {
    try {
      const query = new URLSearchParams({ status, keyword });
      setTasks(await api.get('/tasks?' + query));
    } catch (err) {
      setError(err.message);
    }
  }

  // Chạy một hành động, xong thì tải lại danh sách; lỗi thì hiện thông báo
  async function run(action) {
    try {
      setError('');
      await action();
      loadTasks();
    } catch (err) {
      setError(err.message);
    }
  }

  const handleSave = (data) =>
    run(async () => {
      if (editingTask) {
        await api.put('/tasks/' + editingTask.id, { ...data, isDone: editingTask.isDone });
        setEditingTask(null);
      } else {
        await api.post('/tasks', data);
      }
    });

  const handleToggle = (task) =>
    run(() => api.put('/tasks/' + task.id, { ...task, isDone: !task.isDone }));

  const handleDelete = (id) => {
    if (window.confirm('Xóa công việc này?')) run(() => api.del('/tasks/' + id));
  };

  async function handleLogout() {
    await api.post('/auth/logout');
    onLogout();
  }

  return (
    <div className="container">
      <header>
        <h1>Công việc của {user.username}</h1>
        <button onClick={handleLogout}>Đăng xuất</button>
      </header>

      <TaskForm
        key={editingTask ? editingTask.id : 'new'}
        task={editingTask}
        onSubmit={handleSave}
        onCancel={() => setEditingTask(null)}
      />

      <div className="filters">
        <input
          placeholder="Tìm theo tiêu đề..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="all">Tất cả</option>
          <option value="pending">Chưa hoàn thành</option>
          <option value="done">Đã hoàn thành</option>
          <option value="overdue">Quá hạn</option>
        </select>
      </div>

      {error && <p className="error">{error}</p>}

      <ul>
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={handleToggle}
            onEdit={setEditingTask}
            onDelete={handleDelete}
          />
        ))}
      </ul>
      {tasks.length === 0 && <p className="center">Chưa có công việc nào.</p>}
    </div>
  );
}

export default TasksPage;