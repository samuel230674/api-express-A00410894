import { createTask, deleteTask, getTasks } from '../services/taskService.js';
import { ErrorAlert } from './ErrorAlert.js';
import { Header } from './Header.js';
import { LoadingSpinner } from './LoadingSpinner.js';
import { TaskForm } from './TaskForm.js';
import { TaskList } from './TaskList.js';

export function App() {
  const container = document.createElement('main');
  container.className = 'app-container';
  container.setAttribute('aria-busy', 'false');

  // App conserva la fuente única de verdad y coordina las actualizaciones de la vista.
  const state = {
    tasks: [],
    loading: false,
    loadingMessage: '',
    error: null,
  };

  function render() {
    // Cada render reconstruye la vista a partir del estado actual.
    const content = [
      Header({
        title: 'TaskFlow',
        subtitle: 'Administra tus tareas y explora el consumo de APIs con Promesas.',
      }),
      TaskForm({
        disabled: state.loading,
        onAddTask: handleAddTask,
      }),
    ];

    if (state.loading) {
      content.push(LoadingSpinner({ message: state.loadingMessage }));
    }

    if (state.error) {
      content.push(
        ErrorAlert({
          message: state.error,
          onRetry: handleLoadTasks,
        }),
      );
    }

    const refreshButton = document.createElement('button');
    refreshButton.type = 'button';
    refreshButton.className = 'btn-refresh';
    refreshButton.textContent = 'Refrescar lista desde la API';
    refreshButton.disabled = state.loading;
    refreshButton.addEventListener('click', handleLoadTasks);
    content.push(refreshButton);

    content.push(
      TaskList({
        tasks: state.tasks,
        onDeleteTask: handleDeleteTask,
        disabled: state.loading,
      }),
    );

    container.setAttribute('aria-busy', String(state.loading));
    container.replaceChildren(...content);
  }

  // Comparte el ciclo pendiente/éxito/error y evita iniciar peticiones simultáneas.
  async function runRequest(message, action) {
    if (state.loading) {
      return;
    }

    state.loading = true;
    state.loadingMessage = message;
    state.error = null;
    render();

    try {
      await action();
    } catch (error) {
      const reason = error instanceof Error ? error.message : 'Error desconocido';
      state.error = `${reason}. Verifica que la API esté activa en el puerto 3001.`;
    } finally {
      state.loading = false;
      state.loadingMessage = '';
      render();
    }
  }

  function handleLoadTasks() {
    // GET sustituye la lista local con la respuesta actual de la API.
    return runRequest('Consultando tareas... (Promesa pendiente)', async () => {
      state.tasks = await getTasks();
    });
  }

  function handleAddTask(title) {
    // POST agrega al estado la tarea confirmada por el servidor.
    return runRequest('Guardando tarea... (Promesa pendiente)', async () => {
      const newTask = await createTask(title);
      state.tasks = [...state.tasks, newTask];
    });
  }

  function handleDeleteTask(id) {
    // DELETE actualiza la lista solo después de que el servidor confirma la eliminación.
    return runRequest('Eliminando tarea... (Promesa pendiente)', async () => {
      await deleteTask(id);
      state.tasks = state.tasks.filter((task) => String(task.id) !== String(id));
    });
  }

  render();
  // La carga inicial inicia el flujo GET al montar la aplicación.
  void handleLoadTasks();
  return container;
}
