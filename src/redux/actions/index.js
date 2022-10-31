// Coloque aqui suas actions

export const ADD_USER = 'ADD_USER';

export const ADD_WALLET = 'ADD_WALLET';

export const addUser = (user) => ({ type: ADD_USER, user });

export const addWallet = (wallet) => ({ type: ADD_WALLET, wallet });

export const REQUEST = 'REQUEST_CURRENCY';

export const RESOLVE = 'RESOLVE_CURRENCY';

export const ERROR = 'ERROR_CURRENCY';

export const REQUEST_CURRENCY = () => ({ type: REQUEST });

export const RESOLVE_CURRENCY = (currency) => ({ type: RESOLVE, currency });

export const ERROR_CURRENCY = (error) => ({ type: ERROR, error });

export const thunkCurrency = (currency) => async (dispatch) => {
  const URL = `https://economia.awesomeapi.com.br/json/${currency}`;
  try {
    dispatch(REQUEST_CURRENCY());
    const response = await fetch(URL);
    const data = await response.json();
    dispatch(RESOLVE_CURRENCY(data));
  } catch (error) {
    dispatch(ERROR_CURRENCY(error));
  }
};
