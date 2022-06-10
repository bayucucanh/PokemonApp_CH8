import axios from 'axios';
import {GET_DATA, LOADING, REFRESH} from '../Types';
import {baseURL} from '../../Service';

export const getDataPokemon = data => ({
  type: GET_DATA,
  payload: data,
});

export const loading = val => ({
  type: LOADING,
  payload: val
})

export const refresh = val => ({
  type: REFRESH,
  payload: val
})


export const GetDataPokemon = () => {
  return async dispatch => {
    dispatch(loading(true));
    await axios
      .get(baseURL)
      .then(async response => {
        dispatch(loading(false));
        dispatch(refresh(false));
        dispatch(getDataPokemon(response.data));
      })
      .catch(error => {
        console.log(error);
      });
  };
}

export const GetDataAfterNext = (url) => {
  return async dispatch => {
    try {
      await axios.get(url).then(response => {
        dispatch(getDataPokemon(response.data));
      });
    } catch (error) {
      console.log('error');
    }
  };
};
export const GetDataAfterPrevious = url => {
  return async dispatch => {
    try {
      await axios.get(url).then(response => {
        dispatch(getDataPokemon(response.data));
      });
    } catch (error) {
      console.log('error');
    }
  };
};
