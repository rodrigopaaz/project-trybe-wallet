import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('Os elementos devem ser exibidos corretamente', () => {
  test('Deve existir um elemento que exiba o email do usuário que fez o login', () => {
    const { history, store } = renderWithRouterAndRedux(<App />);

    const email = screen.getByTestId('email-input');
    const password = screen.getByTestId('password-input');
    const btnEntrar = screen.getByRole('button', { name: /entrar/i });

    const validEmail = 'teste@gmail.com';

    userEvent.type(email, validEmail);
    userEvent.type(password, '123456');
    userEvent.click(btnEntrar);

    const { location: { pathname } } = history;
    expect(pathname).toBe('/carteira');

    const storeEmail = store.getState().user.email;
    expect(screen.getByText(validEmail)).toHaveTextContent(storeEmail);

    const totalField = screen.getByTestId('total-field');
    const currencyField = screen.getByTestId('header-currency-field');

    expect(totalField).toBeInTheDocument();
    expect(currencyField).toBeInTheDocument();
  });
});
