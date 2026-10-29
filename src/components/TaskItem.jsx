function TaskItem({ task, onToggle, onDelete }) {
  return (
    <li className={`task-item ${task.completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        className="task-checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
      />
      <span className="task-text">{task.text}</span>
      <button
        type="button"
        className="delete-task"
        onClick={() => onDelete(task.id)}
      >
        ×
      </button>
    </li>
  )
}

export default TaskItem
