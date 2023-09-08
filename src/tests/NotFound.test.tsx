// src/tests/NotFound.test.tsx

import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from '../pages/NotFound/NotFound';

describe('Componente NotFound', () => {
  it('deve exibir um cabeçalho h2 com o texto "Page requested not found"', () => {
    render(<NotFound />);
    const elementoTitulo = screen.getByRole('heading', { level: 2 });
    expect(elementoTitulo).toBeInTheDocument();
    expect(elementoTitulo).toHaveTextContent('Page requested not found');
  });

  it('deve exibir uma imagem com o texto alternativo correto', () => {
    render(<NotFound />);
    const elementoImagem = screen.getByAltText("Clefairy pushing buttons randomly with text I have no idea what i'm doing");
    expect(elementoImagem).toBeInTheDocument();
  });
});
