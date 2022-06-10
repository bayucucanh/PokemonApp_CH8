import axios from 'axios';
import { GET_DETAIL, LOADING, REFRESH } from "../Types";
import { loading, refresh } from './GlobalAction';

const getDetailPokemon = data => ({
  type: GET_DETAIL,
  payload: data,
});


function GetDataPokemonDetail(url, navigation, id) {
  return async dispatch => {
    dispatch(loading(true))
    await axios
      .get(url)
      .then(async (response) => {
        dispatch(loading(false))
        dispatch(refresh(false));
        dispatch(getDetailPokemon(response.data));
        navigation.navigate('DetailScreen', {userId: id});
      })
      .catch(error => {
        console.log(error);
      });
  };
}

export {GetDataPokemonDetail}