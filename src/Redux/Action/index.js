import axios from 'axios';
import {
  LOADING,
  REFRESH,
  GET_DATA,
  GET_DETAIL,
  LOGIN,
  REGISTER,
  NEXT_PAGE,
  PREV_PAGE
} from '../Types';
import { baseURL } from '../../Service';

export const registerSucces = data => ({
  type: REGISTER,
  payload: data,
});

export const loginSucces = data => ({
  type: LOGIN,
  payload: data,
});

export const getDataPokemon = data => ({
  type: GET_DATA,
  payload: data,
});

export const getDetailPokemon = data => ({
  type: GET_DETAIL,
  payload: data,
});

export const loading = value => ({
  type: LOADING,
  payload: value,
});

export const refresh = value => ({
  type: REFRESH,
  payload: value,
});

export const nextPage = value => ({
  type: NEXT_PAGE,
  payload: value,
});
export const prevPage = value => ({
  type: PREV_PAGE,
  payload: value,
});

export const GetDataPokemon = () => {
  return async dispatch => {
    dispatch(loading(true));
    try {
      await axios
        .get(baseURL)
        .then(response => {
          dispatch(loading(false));
          dispatch(refresh(false));
          dispatch(getDataPokemon(response.data))
        });
    } catch (error) {
      console.log(error);
    }
  };
};

export const GetDataPokemonDetail = (url, navigation) => {
  return async dispatch => {
    dispatch(loading(true));
    try {
      await axios
        .get(url)
        .then(response => {
          dispatch(loading(false));
          dispatch(refresh(false));
          dispatch(getDetailPokemon(response.data))
          navigation.navigate('DetailScreen')
        });
    } catch (error) {
      console.log(error);
    }
  };
};

export const GetDataAfterNext = (url) => {
  console.log('next', url);
  return async dispatch => {
    dispatch(loading(true));
    try {
      await axios
        .get(url)
        .then(response => {
          dispatch(loading(false));
          dispatch(refresh(false));
          dispatch(getDataPokemon(response.data))
        });
    } catch (error) {
      console.log('error');
    }
  };
};

export const GetDataAfterPrevious = (url) => {
  console.log('prev',url);
  return async dispatch => {
    dispatch(loading(true));
    try {
      await axios
        .get(url)
        .then(response => {
          dispatch(loading(false));
          dispatch(refresh(false));
          dispatch(getDataPokemon(response.data))
        });
    } catch (error) {
      console.log('error');
    }
  };
};
