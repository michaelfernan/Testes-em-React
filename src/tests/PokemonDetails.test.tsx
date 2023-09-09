import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import PokemonDetails from '../pages/PokemonDetails/PokemonDetails';
import { PokemonType, AverageWeightType, FoundAtType } from '../types/index';
// codigo realização atraves de consultas, pesquisa e auxilio de michelle fernandes
function mockFn() {
  let calledWith: any[] | null = null;

  const fn = (arg1: any, arg2: any) => {
    calledWith = [arg1, arg2];
  };

  fn.getCalledWith = () => calledWith;

  return fn;
}

describe('<PokemonDetails />', () => {
  const averageWeight: AverageWeightType = {
    measurementUnit: 'kg',
    value: '6.0',
  };

  const foundAt: FoundAtType[] = [
    {
      location: 'Kanto Forest',
      map: 'kanto_map.jpg',
    },
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
  ];

  const mockedUpdateFavoritePokemon = mockFn();

  it('deve exibir o nome do Pokémon nos detalhes', async () => {
    render(
      <MemoryRouter initialEntries={ ['/pokemon/1'] }>
        <Routes>
          <Route path="/pokemon/:id" element={ <PokemonDetails pokemonList={ fakePokemonList } favoritePokemonIdsObj={ {} } onUpdateFavoritePokemon={ mockedUpdateFavoritePokemon } /> } />
        </Routes>
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(screen.getByText('Pikachu Details')).toBeInTheDocument();
      expect(screen.queryByText(/More Details/i)).not.toBeInTheDocument();
      expect(screen.getByText('Summary')).toBeInTheDocument();
      expect(screen.getByText('Electric Pokémon')).toBeInTheDocument();
      expect(screen.getByText('Game Locations of Pikachu')).toBeInTheDocument();
      expect(screen.getByRole('img', { name: 'Pikachu location' })).toHaveAttribute('src', 'kanto_map.jpg');
      expect(screen.getByLabelText('Pokémon favoritado?')).toBeInTheDocument();
    });
    userEvent.click(screen.getByLabelText('Pokémon favoritado?'));
    await waitFor(() => {
      expect(mockedUpdateFavoritePokemon.getCalledWith()).toEqual([1, true]);
    });
  });
});
