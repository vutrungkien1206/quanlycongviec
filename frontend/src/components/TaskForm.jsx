import { useState } from 'react';

// task = null  -> đang thêm mới;  task = {...} -> đang sửa
function TaskForm({ task, onSubmit, onCancel }) {
  const [title, setTitle] = useState(task?.title || '');
  const [description, setDescription] = useState(task?.description || '');
  const [dueDate, setDueDate] = useState(task?.dueDate || '');

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit({ title, description, dueDate });
    if (!task) {            // thêm xong thì xóa trắng form
      setTitle('');
      setDescription('');
      setDueDate('');
    }
  }

  return (
    <form className="card" onSubmit={handleSubmit}>
      <h3>{task ? 'Sửa công việc' : 'Thêm công việc'}</h3>
      <input
        placeholder="Tiêu đề"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Mô tả (không bắt buộc)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <label>
        Hạn chót:
        <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
      </label>
      <div>
        <button type="submit">{task ? 'Lưu' : 'Thêm'}</button>
        {task && <button type="button" onClick={onCancel}>Hủy</button>}
      </div>
    </form>
  );
}

export default TaskForm;