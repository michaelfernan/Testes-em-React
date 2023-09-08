import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import FavoritePokemon from '../pages/FavoritePokemon/FavoritePokemon';
import { PokemonType, AverageWeightType, FoundAtType } from '../types/index';

describe('Componente Pokémon favorito', () => {
  it('"Nenhum Pokémon favorito encontrado" quando nenhum Pokémon for favorito', () => {
    render(
      <MemoryRouter>
        <FavoritePokemon pokemonList={ [] } />
      </MemoryRouter>,
    );
    const message = screen.getByText(/No favorite Pokémon found/i);
    expect(message).toBeInTheDocument();
  });

  it('Deve Exebir apenas os Pokemon Favoritos', () => {
    const averageWeight: AverageWeightType = {
      measurementUnit: 'kg',
      value: '6.0',
    };

    const foundAt: FoundAtType[] = [
    ];

    const fakePokemonList: PokemonType[] = [
      {
        id: 1,
        name: 'Pikachu',
        type: 'Electric',
        averageWeight,
        foundAt,
        image: 'pikachu.jpg',
        moreInfo: 'https://example.com/pikachu',
        summary: 'Electric Pokémon',
      },
      {
        id: 2,
        name: 'Bulbasaur',
        type: 'Grass',
        averageWeight,
        foundAt,
        image: 'bulbasaur.jpg',
        moreInfo: 'https://example.com/bulbasaur',
        summary: 'Grass Pokémon',
      },
    ];

    render(
      <MemoryRouter>
        <FavoritePokemon pokemonList={ fakePokemonList } />
      </MemoryRouter>,
    );

    fakePokemonList.forEach((pokemon) => {
      expect(screen.getByText(new RegExp(pokemon.name, 'i'))).toBeInTheDocument();
    });

    expect(screen.queryByText(/Charmander/i)).toBeNull();
  });
});
