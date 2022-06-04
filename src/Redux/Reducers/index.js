import {
  LOADING,
  REFRESH,
  GET_DATA,
  GET_DETAIL,
  LOGIN,
  REGISTER,
} from '../Types';

const initialState = {
  pokemon: [],
};

export const GlobalReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DATA:
      return {
        ...state,
        pokemon: action.payload,
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
