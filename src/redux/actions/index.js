// Coloque aqui suas actions

export const ADD_USER = 'ADD_USER';

export const ADD_WALLET = 'ADD_WALLET';

export const ADD_EXPENSES = 'ADD_EXPENSES';

export const REMOVE_EXPENSE = 'REMOVE_EXPENSE';

export const EDIT_EXPENSE = 'EDIT_EXPENSE';

export const addUser = (user) => ({ type: ADD_USER, user });

export const addWallet = (wallet) => ({ type: ADD_WALLET, wallet });

export const REQUEST = 'REQUEST_CURRENCY';

export const RESOLVE = 'RESOLVE_CURRENCY';

export const ERROR = 'ERROR_CURRENCY';

export const REQUEST_CURRENCY = () => ({ type: REQUEST });

export const RESOLVE_CURRENCY = (currency) => ({ type: RESOLVE, currency });

export const ERROR_CURRENCY = (error) => ({ type: ERROR, error });

export const addExpenses = (expenses, wallet, valor, singleCurrency) => ({
  type: ADD_EXPENSES,
  wallet,
  expenses,
  valor,
  singleCurrency,
});

export const removeExpense = (position, element) => ({
  type: REMOVE_EXPENSE,
  position,
  value: (element.value * [element.exchangeRates[element.currency].ask])
    .toFixed(2),
});

export const editExpense = (position, element, editMode, updatedItems) => ({
  type: EDIT_EXPENSE,
  position,
  element,
  value: (element.value * [element.exchangeRates[element.currency].ask])
    .toFixed(2),
  editMode,
  updatedItems,
});

export const thunkCurrency = (
  expenses,
  wallet,
  value,
  singleCurrency,
) => async (dispatch) => {
  const URL = 'https://economia.awesomeapi.com.br/json/all';
  try {
    dispatch(REQUEST_CURRENCY());
    const response = await fetch(URL);
    const data = await response.json();
    dispatch(RESOLVE_CURRENCY(data));
    dispatch(addExpenses(expenses, wallet, value, singleCurrency));
  } catch (error) {
    dispatch(ERROR_CURRENCY(error));
  }
};
