import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('Login Page', () => {
  test('A rota para esta página deve ser /', () => {
    const { history: { location } } = renderWithRouterAndRedux(<App />);
    expect(location.pathname).toBe('/');
  });
  test('Os elementos de input deverão estar presentes na tela', async () => {
    const { store, history } = renderWithRouterAndRedux(<App />);
    const email = screen.getByTestId('email-input');
    const password = screen.getByTestId('password-input');
    const btnEntrar = screen.getByRole('button', { name: /entrar/i });

    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(btnEntrar).toBeInTheDocument();

    const validEmail = 'teste@gmail.com';

    userEvent.type(email, validEmail);
    userEvent.type(password, '123456');
    userEvent.click(btnEntrar);

    expect(store.getState().user.email).toBe(validEmail);

    const wallet = await screen.findByText(/trybewallet/i);
    expect(wallet).toBeInTheDocument();

    const { location } = history;
    expect(location.pathname).toBe('/carteira');
  });
});
