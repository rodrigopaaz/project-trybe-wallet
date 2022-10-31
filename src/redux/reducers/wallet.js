// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { ERROR, REQUEST, RESOLVE } from '../actions';

const INITIAL_STATE = {};

/* function characterReducer(state = initialState, action) {
    switch (action.type) {
      case 'SEARCH_BEGIN':
        return {
          ...state,
          isLoading: true,
        }
      case 'SEARCH_SUCCESS':
        return {
          ...state,
          isLoading: false,
          character: action.character[0],
        }
      case 'SEARCH_ERROR':
        return {
          ...state,
          isLoading: false,
          error: action.error,
        }
      default:
        return state
    }
  } */

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
