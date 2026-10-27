import { TaskItem } from './TaskItem.js';

export function TaskList({ tasks, onDeleteTask, disabled }) {
  // La lista transforma cada tarea en su componente de presentación correspondiente.
  const list = document.createElement('ul');
  list.className = 'task-list';
  list.setAttribute('aria-label', 'Lista de tareas');

  if (tasks.length === 0) {
    const emptyMessage = document.createElement('li');
    emptyMessage.className = 'empty-message';
    emptyMessage.textContent = 'No hay tareas registradas en la API.';
    list.append(emptyMessage);
    return list;
  }

  tasks.forEach((task) => {
    list.append(TaskItem({ task, onDeleteTask, disabled }));
  });

  return list;
}
