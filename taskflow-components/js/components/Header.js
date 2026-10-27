export function Header({ title, subtitle }) {
  // El contenido se asigna con textContent para tratarlo como texto, no como HTML.
  const header = document.createElement('header');
  header.className = 'app-header';

  const heading = document.createElement('h1');
  heading.textContent = title;

  const description = document.createElement('p');
  description.className = 'app-subtitle';
  description.textContent = subtitle;

  header.append(heading, description);
  return header;
}
