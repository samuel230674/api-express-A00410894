# TaskFlow Components

Frontend del taller de Promesas y consumo de APIs. Está construido con JavaScript puro y componentes funcionales; toda la interfaz se crea dentro de `#root`.

## Ejecutar

1. En la raíz de este repositorio, inicia la API: `npm install` y `npm start`.
2. En otra terminal, desde `taskflow-components/`, inicia un servidor estático: `npx live-server --port=3000`.
3. Abre `http://localhost:3000`.

La API debe estar disponible en `http://localhost:3001`. La lista se mantiene en memoria y vuelve a sus datos iniciales al reiniciar el servidor.

## Estructura

- `js/services/taskService.js`: peticiones `GET`, `POST` y `DELETE`.
- `js/components/`: componentes de presentación y componente raíz con estado.
- `js/main.js`: punto de entrada que monta `App` dentro de `#root`.
