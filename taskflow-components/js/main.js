import { App } from './components/App.js';

// Falla explícitamente si el HTML no tiene el nodo donde se monta la aplicación.
const root = document.querySelector('#root');

if (!root) {
  throw new Error('No se encontró el contenedor raíz #root.');
}

root.append(App());
