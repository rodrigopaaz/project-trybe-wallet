import React from 'react';
import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('O formulário deverá uma tabela', () => {
  test('A tabela deverá conter os elementos solicitados', async () => {
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
    expect(table).toBeInTheDocument();
    const addExpense = screen.getByRole('button', { name: 'Adicionar despesa' });
    const valueInput = screen.getByTestId('value-input');
    const descriptionInput = screen.getByTestId('description-input');
    const totalField = await screen.findByTestId('total-field');

    expect(totalField).toHaveTextContent(0);

    userEvent.type(valueInput, '1');
    userEvent.type(descriptionInput, 'Teste_1');
    userEvent.click(addExpense);

    const description1 = await screen.findByText(/teste_1/i);
    expect(description1).toBeInTheDocument();

    expect(totalField).toHaveTextContent(5.1);

    userEvent.type(valueInput, '2');
    userEvent.type(descriptionInput, 'Teste_2');
    userEvent.click(addExpense);

    const description2 = await screen.findByText(/teste_2/i);
    expect(description2).toBeInTheDocument();
    expect(totalField).toHaveTextContent(15.3);

    const btnEdit = await screen.findAllByTestId('edit-btn');
    const btnDelete = await screen.findAllByTestId('delete-btn');

    userEvent.click(btnEdit[0]);
    userEvent.click(btnDelete[1]);
    const btnSaveEdit = await screen.findByRole('button', { name: /editar despesa/i });
    userEvent.type(valueInput, '3');
    userEvent.type(descriptionInput, 'Teste_3');
    userEvent.click(btnSaveEdit);

    const description3 = screen.findByText(/teste_3/i);

    expect(description1).not.toBeInTheDocument();
    expect(await description3).toBeInTheDocument();

    waitForElementToBeRemoved(description2);
    expect(description2).not.toBeInTheDocument();
  });
});
