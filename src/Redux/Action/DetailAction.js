import axios from 'axios';
import { GET_DETAIL } from "../Types";


export const getDetailPokemon = data => ({
  type: GET_DETAIL,
  payload: data,
});


export function GetDataPokemonDetail(url, navigation) {
  return async dispatch => {
    await axios
      .get(url)
      .then(async (response) => {
        dispatch(getDetailPokemon(response.data));
        navigation.navigate('DetailScreen');
      })
      .catch(error => {
        console.log(error);
      });
  };
}