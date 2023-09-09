import { screen, waitFor, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import pokemonList from '../data';
import App from '../App';

const POKEMON_NAME_TEST_ID = 'pokemon-name';

const getNextButton = () => screen.getByRole('button', { name: 'Próximo Pokémon' });

async function clickNextButton(vezes = 1, i = 0) {
  if (i >= vezes) {
    return;
  }
  userEvent.click(getNextButton());
  await waitFor(() => {});
  return clickNextButton(vezes, i + 1);
}

describe('Testes do componente App', () => {
  beforeEach(() => {
    render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );
  });

  it('deve conter o cabeçalho correto', () => {
    const mainHeading = screen.getByRole('heading', { name: 'Encountered Pokémon' });
    expect(mainHeading).toBeInTheDocument();
  });
  it('deve mostrar o próximo Pokémon quando clicado em próximo', async () => {
    let pokemonName = screen.getByTestId(POKEMON_NAME_TEST_ID);
    expect(pokemonName).toHaveTextContent(pokemonList[0].name);

    if (pokemonList.length < 10) {
      return;
    }

    await clickNextButton(9);
    pokemonName = screen.getByTestId(POKEMON_NAME_TEST_ID);
    expect(pokemonName).toHaveTextContent(pokemonList[9].name);
  });

  it('deve exibir apenas um Pokémon por vez', () => {
    const pokemonNames = screen.getAllByTestId(POKEMON_NAME_TEST_ID);
    expect(pokemonNames.length).toBe(1);
  });

  it('deve conter botões de filtro', () => {
    const expectedTypes = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];
    const typeButtons = screen.getAllByTestId('pokemon-type-button');
    typeButtons.forEach((button, index) => {
      expect(button).toHaveTextContent(expectedTypes[index]);
    });
  });

  it('deve filtrar os Pokémons pelo tipo selecionado', async () => {
    const typeButtons = screen.getAllByTestId('pokemon-type-button');
    const fireButton = typeButtons[1];
    const bugButton = typeButtons[2];
    const allButton = screen.getByRole('button', { name: 'All' });

    userEvent.click(fireButton);
    await waitFor(() => {
      const pokemonName = screen.getByTestId(POKEMON_NAME_TEST_ID);
      expect(pokemonName).toHaveTextContent('Charmander');
    });

    await clickNextButton();

    await waitFor(() => {
      const pokemonName = screen.getByTestId(POKEMON_NAME_TEST_ID);
      expect(pokemonName).toHaveTextContent('Rapidash');
    });

    userEvent.click(bugButton);
    await waitFor(() => {
      const pokemonName = screen.getByTestId(POKEMON_NAME_TEST_ID);
      expect(pokemonName).toHaveTextContent('Caterpie');
    });

    userEvent.click(allButton);
    await waitFor(() => {
      const pokemonName = screen.getByTestId(POKEMON_NAME_TEST_ID);
      expect(pokemonName).toHaveTextContent('Pikachu');
    });
  });
});
