import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import About from '../pages/About/About';

describe('<About />', () => {
  let container: Element;

  beforeEach(() => {
    const renderResult = render(<About />);
    container = renderResult.container;
  });

  it('deve exibir um h2 com texto Sobre Pokédex', () => {
    const heading = screen.getByRole('heading', { name: /About Pokédex/i });
    expect(heading).toBeInTheDocument();
    expect(heading.tagName).toBe('H2');
  });

  it('deve exibir dois parágrafos sobre a Pokédex', () => {
    const paragraphs = container.querySelectorAll('p');
    expect(paragraphs.length).toBe(2);
  });

  it('deve exibir a imagem correta de um Pokédex', () => {
    const image = screen.getByRole('img', { name: /Pokédex/i });
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
