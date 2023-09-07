import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';

test('Deve renderizar os links de navegação corretamente', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  );
  expect(screen.getByText('Home')).toBeInTheDocument();
  expect(screen.getByText('About')).toBeInTheDocument();
  expect(screen.getByText('Favorite Pokémon')).toBeInTheDocument();
});

test('Deve redirecionar para a página Home ao clicar no link Home', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  );

  const homeLink = screen.getByText('Home');

  fireEvent.click(homeLink);

  expect(window.location.pathname).toBe('/');
});

test('Deve redirecionar para a página About ao clicar no link About', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  );

  const aboutLink = screen.getByText('About');

  fireEvent.click(aboutLink);
  expect(window.location.pathname).toBe('/about');
});

test('Deve redirecionar para a página Favorite Pokémon ao clicar no link Favorite Pokémon', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  );

  const favoriteLink = screen.getByText('Favorite Pokémon');

  fireEvent.click(favoriteLink);
  expect(window.location.pathname).toBe('/favorites');
});
