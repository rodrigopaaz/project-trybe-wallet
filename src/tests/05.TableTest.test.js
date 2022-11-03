import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('O formulário deverá uma tabela', () => {
  test('A tabela deverá conter os elementos solicitados', () => {
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

    const table = screen.getByRole('table');

    const tableDescription = screen.getByText(/descrição/i);
    const tableTag = screen.getByText(/Tag/i);
    const tableMethod = screen.getByText(/Método de pagamento/i);
    const tableValue = screen.getAllByText(/valor/i)[0];
    const tableCurrency = screen.getAllByText(/Moeda/i)[0];
    const tableChosenCurrency = screen.getByText(/Câmbio utilizado/i);
    const tableChangedValue = screen.getByText(/Valor convertido/i);
    const tableBRL = screen.getByText(/Moeda de conversão/i);
    const tableEditDelete = screen.getByText('Editar/Excluir');

    expect(table).toBeInTheDocument();

    expect(tableDescription).toBeInTheDocument();
    expect(tableTag).toBeInTheDocument();
    expect(tableMethod).toBeInTheDocument();
    expect(tableValue).toBeInTheDocument();
    expect(tableCurrency).toBeInTheDocument();
    expect(tableChosenCurrency).toBeInTheDocument();
    expect(tableChangedValue).toBeInTheDocument();
    expect(tableBRL).toBeInTheDocument();
    expect(tableEditDelete).toBeInTheDocument();
  });
});
