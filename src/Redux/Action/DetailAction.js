import axios from 'axios';
import { baseURL } from '../../Service';
import {GET_DETAIL} from '../Types';
import {loading, refresh} from './GlobalAction';

const getDetailPokemon = data => ({
  type: GET_DETAIL,
  payload: data,
});

function GetDataPokemonDetail(id, userId) {
  return async dispatch => {
    dispatch(loading(true));
    await axios
      .get(`${baseURL}/${id}`)
      .then(async response => {
        const data = {
          ...response.data,
          type: response.data.types[0].type.name,
          name:
            response.data.name[0].toUpperCase() +
            response.data.name.substring(1),
        };
        dispatch(loading(false));
        dispatch(refresh(false));
        dispatch(getDetailPokemon(data));
      })
      .catch(error => {
        console.log(error);
      });
  };
}

export {GetDataPokemonDetail};
