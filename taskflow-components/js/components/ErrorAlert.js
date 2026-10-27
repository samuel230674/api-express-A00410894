export function ErrorAlert({ message, onRetry }) {
  // Presenta el rechazo de la petición y ofrece reintentar cuando se proporciona callback.
  const alert = document.createElement('div');
  alert.className = 'error-alert';
  alert.setAttribute('role', 'alert');

  const text = document.createElement('span');
  text.textContent = message;
  alert.append(text);

  if (onRetry) {
    const retryButton = document.createElement('button');
    retryButton.type = 'button';
    retryButton.className = 'btn-retry';
    retryButton.textContent = 'Reintentar';
    retryButton.addEventListener('click', onRetry);
    alert.append(retryButton);
  }

  return alert;
}
