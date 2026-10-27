export function TaskForm({ onAddTask, disabled }) {
  const form = document.createElement('form');
  form.className = 'task-form';

  const input = document.createElement('input');
  input.type = 'text';
  input.name = 'title';
  input.placeholder = 'Escribe una nueva tarea...';
  input.setAttribute('aria-label', 'Título de la nueva tarea');
  input.required = true;
  input.maxLength = 200;
  input.disabled = disabled;

  const button = document.createElement('button');
  button.type = 'submit';
  button.className = 'btn-add';
  button.textContent = 'Agregar tarea';
  button.disabled = disabled;

  form.append(input, button);
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const title = input.value.trim();

    if (title) {
      // El formulario delega el alta al componente padre mediante este callback.
      onAddTask(title);
    }
  });

  return form;
}
