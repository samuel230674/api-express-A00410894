export function TaskItem({ task, onDeleteTask, disabled }) {
  // Cada elemento recibe sus datos y comunica la eliminación al padre con un callback.
  const item = document.createElement('li');
  item.className = `task-item${task.completed ? ' completed' : ''}`;

  const title = document.createElement('span');
  title.className = 'task-title';
  title.textContent = task.title;

  const actions = document.createElement('div');
  actions.className = 'task-actions';

  const badge = document.createElement('span');
  badge.className = `badge ${task.completed ? 'badge-completed' : 'badge-pending'}`;
  badge.textContent = task.completed ? 'Completada' : 'Pendiente';

  const deleteButton = document.createElement('button');
  deleteButton.type = 'button';
  deleteButton.className = 'btn-delete';
  deleteButton.textContent = 'Eliminar';
  deleteButton.disabled = disabled;
  deleteButton.setAttribute('aria-label', `Eliminar tarea: ${task.title}`);
  deleteButton.addEventListener('click', () => onDeleteTask(task.id));

  actions.append(badge, deleteButton);
  item.append(title, actions);
  return item;
}
