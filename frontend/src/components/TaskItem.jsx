function TaskItem({ task, onToggle, onEdit, onDelete }) {
  const today = new Date().toISOString().slice(0, 10); // 'YYYY-MM-DD'
  const isOverdue = !task.isDone && task.dueDate && task.dueDate < today;

  return (
    <li className={'card task' + (task.isDone ? ' done' : '')}>
      <input
        type="checkbox"
        checked={Boolean(task.isDone)}
        onChange={() => onToggle(task)}
      />
      <div className="task-body">
        <strong>{task.title}</strong>
        {task.description && <p>{task.description}</p>}
        {task.dueDate && (
          <small className={isOverdue ? 'error' : ''}>
            Hạn: {task.dueDate} {isOverdue && '(quá hạn)'}
          </small>
        )}
      </div>
      <button onClick={() => onEdit(task)}>Sửa</button>
      <button onClick={() => onDelete(task.id)}>Xóa</button>
    </li>
  );
}

export default TaskItem;