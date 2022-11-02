import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('O formulário deverá adicionar as despesas corretamente', () => {
  test('O documento deverá conter todos os campos', async () => {
    jest.spyOn(global, 'fetch');
    const { history } = renderWithRouterAndRedux(<App />);
    const email = screen.getByTestId('email-input');
    const password = screen.getByTestId('password-input');
    const btnEntrar = screen.getByRole('button', { name: /entrar/i });

    const validEmail = 'teste@gmail.com';

    userEvent.type(email, validEmail);
    userEvent.type(password, '123456');
    userEvent.click(btnEntrar);

    const { location: { pathname } } = history;
    expect(pathname).toBe('/carteira');

    const valueInput = screen.getByTestId('value-input');
    const descriptionInput = screen.getByTestId('description-input');
    const currencyInput = screen.getByTestId('currency-input');
    const methodInput = screen.getByTestId('method-input');
    const tagInput = screen.getByTestId('tag-input');
    expect(global.fetch).toHaveBeenCalledTimes(1);

    expect(valueInput).toBeInTheDocument();
    expect(descriptionInput).toBeInTheDocument();
    expect(currencyInput).toBeInTheDocument();
    expect(methodInput).toBeInTheDocument();
    expect(tagInput).toBeInTheDocument();
  });
});
