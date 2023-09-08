import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import Pokemon from '../components/Pokemon/Pokemon';
import { PokemonType } from '../types/index';

describe('Componente Pokemon', () => {
  const mockPokemon: PokemonType = {
    id: 1,
    name: 'Bulbasaur',
    type: 'Grass',
    averageWeight: {
      value: '6.9',
      measurementUnit: 'kg',
    },
    image: 'https://example.com/bulbasaur.png',
    foundAt: [],
    moreInfo: '',
    summary: '',
  };

  it('deve renderizar o nome correto do Pokémon', () => {
    render(<Pokemon
      pokemon={ mockPokemon }
      showDetailsLink={ false }
      isFavorite={ false }
    />);
    expect(screen.getByTestId('pokemon-name')).toHaveTextContent('Bulbasaur');
  });

  it('deve renderizar o tipo correto de Pokémon', () => {
    render(<Pokemon
      pokemon={ mockPokemon }
      showDetailsLink={ false }
      isFavorite={ false }
    />);
    expect(screen.getByTestId('pokemon-type')).toHaveTextContent('Grass');
  });

  it('deve renderizar o peso correto do Pokémon', () => {
    render(<Pokemon
      pokemon={ mockPokemon }
      showDetailsLink={ false }
      isFavorite={ false }
    />);
    expect(screen.getByTestId('pokemon-weight')).toHaveTextContent('Average weight: 6.9 kg');
  });

  it('deve renderizar a imagem correta do Pokémon', () => {
    render(<Pokemon
      pokemon={ mockPokemon }
      showDetailsLink={ false }
      isFavorite={ false }
    />);
    expect(screen.getByAltText('Bulbasaur sprite')).toHaveAttribute('src', 'https://example.com/bulbasaur.png');
  });

  it('deve renderizar um link para a página de detalhes do Pokémon', () => {
    render(
      <MemoryRouter>
        <Pokemon pokemon={ mockPokemon } showDetailsLink isFavorite={ false } />
      </MemoryRouter>,
    );
    expect(screen.getByText('More details')).toHaveAttribute('href', '/pokemon/1');
  });

  it('deve renderizar o ícone de estrela do Pokémon favorito', () => {
    render(<Pokemon pokemon={ mockPokemon } showDetailsLink={ false } isFavorite />);
    expect(screen.getByAltText('Bulbasaur is marked as favorite')).toHaveAttribute('src', '/star-icon.png');
  });

  it('deve navegar até a página de detalhes do Pokémon quando o link for clicado', async () => {
    render(
      <MemoryRouter initialEntries={ ['/'] }>
        <Routes>
          <Route path="/" element={ <Pokemon pokemon={ mockPokemon } showDetailsLink isFavorite={ false } /> } />
          <Route path="/pokemon/:id" element={ <div>Pagina detalhes</div> } />
        </Routes>
      </MemoryRouter>,
    );

    const link = screen.getByText('More details');
    userEvent.click(link);
    expect(await screen.findByText('Pagina detalhes')).toBeInTheDocument();
  });
});
