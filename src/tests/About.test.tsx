import { render, screen } from '@testing-library/react';
import About from '../pages/About/About';

test('Deve exibir informações sobre a Pokédex', () => {
  render(<About />);

  const heading = screen.getByRole('heading', { name: /About Pokédex/i });
  expect(heading).toBeInTheDocument();

  const paragraphs = screen.getAllByText(/This application simulates a Pokédex/i);
  expect(paragraphs.length).toBeGreaterThan(0);

  const pokedexImage = screen.getByAltText('Pokédex');
  expect(pokedexImage).toBeInTheDocument();
});
