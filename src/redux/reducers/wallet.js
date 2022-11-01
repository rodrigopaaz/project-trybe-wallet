// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { ADD_EXPENSES, ERROR, REQUEST, RESOLVE } from '../actions';

const INITIAL_STATE = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, //
  total: 0,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST:
    return {
      ...state,
      isLoading: true,
    };
  case RESOLVE:
    return {
      ...state,
      currencies: Object.keys(action.currency)
        .filter((element) => !element.includes('USDT')),
      currency: action.currency,

    };
  case ADD_EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, {
        id: action.wallet.expenses.length,
        value: action.expenses.value,
        description: action.expenses.description,
        currency: action.expenses.currency,
        method: action.expenses.method,
        tag: action.expenses.tag,
        exchangeRates: state.currency,

      }],
      total: ((Number(action.wallet.total)) + Number(action.valor)
      * Number(state.currency[action.singleCurrency].ask)).toFixed(2),
    };
  case ERROR:
    return {
      ...state,
      isLoading: false,
    };
  default:
    return state;
  }
};

export default wallet;
