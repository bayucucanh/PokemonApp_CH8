import {
  LOADING,
  REFRESH,
  GET_DATA,
  GET_DETAIL,
} from '../Types';

const initialState = {
  pokemon: [],
  detailPokemon: [],
  isLoading: false,
  isRefresh: false
};

export const GlobalReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DATA:
      return {
        ...state,
        pokemon: action.payload,
        isLoading: false
      };
    case GET_DETAIL:
      return {
        ...state,
        detailPokemon: action.payload,
        isLoading: false
      };
    case LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case REFRESH:
      return {
        ...state,
        isRefresh: action.payload,
      };
    default:
      return state;
  }
};
