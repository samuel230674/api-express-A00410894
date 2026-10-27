const API_URL = 'http://localhost:3001/api/tasks';

// Centraliza el tratamiento de respuestas HTTP para las tres operaciones.
async function request(url, options) {
  const response = await fetch(url, options);

  if (!response.ok) {
    let detail = '';
    try {
      // Si la API envía un mensaje JSON, lo incluimos en el error para mostrarlo en la UI.
      const body = await response.json();
      detail = body.error ? `: ${body.error}` : '';
    } catch {
      // Algunas respuestas de error no incluyen un cuerpo JSON.
    }

    throw new Error(`Error HTTP ${response.status}${detail}`);
  }

  return response.json();
}

export function getTasks() {
  return request(API_URL);
}

// Envía únicamente el título; la API asigna el ID y el estado inicial.
export function createTask(title) {
  return request(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title }),
  });
}

export function deleteTask(id) {
  return request(`${API_URL}/${encodeURIComponent(id)}`, {
    method: 'DELETE',
  });
}
