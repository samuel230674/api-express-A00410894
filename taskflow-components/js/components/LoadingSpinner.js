export function LoadingSpinner({ message = 'Consultando API...' }) {
  // Este componente hace visible el estado pendiente de una petición asíncrona.
  const container = document.createElement('div');
  container.className = 'loading-container';
  container.setAttribute('role', 'status');
  container.setAttribute('aria-live', 'polite');

  const spinner = document.createElement('span');
  spinner.className = 'spinner';
  spinner.setAttribute('aria-hidden', 'true');

  const text = document.createElement('span');
  text.textContent = message;

  container.append(spinner, text);
  return container;
}
