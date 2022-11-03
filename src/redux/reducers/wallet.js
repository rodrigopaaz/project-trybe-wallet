// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { ADD_EXPENSES, ERROR, REQUEST, RESOLVE,
  REMOVE_EXPENSE, EDIT_EXPENSE } from '../actions';

const INITIAL_STATE = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, //
  total: 0,
};

const editStateAction = (state, action) => {
  if (!action.editMode) {
    const updatedState = { id: action.position,
      value: action.updatedItems.value,
      description: action.updatedItems.description,
      currency: action.updatedItems.currency,
      method: action.updatedItems.method,
      tag: action.updatedItems.tag,
      exchangeRates: state.currency,
    };
    state.expenses.splice(action.position, 1, updatedState);
    return state.expenses;
  }

  return state.expenses;
};

const editedTotal = (action, state) => {
  console.log(action);
  if (!action.editMode && action.updatedItems) {
    return (
      (Number(state.total) - Number(action.value)
+ (Number(action.updatedItems.value)
  * [Number(action.element.exchangeRates[action.updatedItems.currency].ask)])) // colocar de acordo com a action
        .toFixed(2));
  }
  return state.total;
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
  case REMOVE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.filter((_, index) => index !== action.position),
      total: (Number(state.total) - Number(action.value)).toFixed(2),
    };
  case EDIT_EXPENSE:
    return { ...state,
      editMode: action.editMode,
      items: action.element,
      expenses: editStateAction(state, action),
      position: action.position,
      total: editedTotal(action, state) };
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
