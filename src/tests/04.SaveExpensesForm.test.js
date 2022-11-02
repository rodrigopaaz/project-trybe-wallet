import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import mockData from './helpers/mockData';

describe('O formulário deverá ser salvo no estado global', () => {
  test('Adiciona as despesas corretamente', async () => {
    global.fetch = jest.fn(async () => ({
      json: async () => mockData,
    }));
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

    const valueInput = screen.findByTestId('value-input');
    const descriptionInput = screen.findByTestId('description-input');
    const currencyInput = screen.findByTestId('currency-input');
    const methodInput = screen.findByTestId('method-input');
    const tagInput = screen.findByTestId('tag-input');
    const btnAddExpenses = screen.findByRole('button', { name: /adicionar despesa/i });
    // const totalField = await screen.findByTestId('total-field');
    expect(global.fetch).toHaveBeenCalledTimes(1);
    userEvent.type(await valueInput, '11');
    userEvent.type(await descriptionInput, 'Dólar');
    userEvent.click(await btnAddExpenses);
    await expect(global.fetch).toHaveBeenCalledTimes(2);
    const totalField = await screen.findByTestId('total-field');
    await expect(totalField).toHaveTextContent('52.28');

    expect(await valueInput).toBeInTheDocument();
    expect(await descriptionInput).toBeInTheDocument();
    expect(await currencyInput).toBeInTheDocument();
    expect(await methodInput).toBeInTheDocument();
    expect(await tagInput).toBeInTheDocument();
  });
});
