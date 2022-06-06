import axios from 'axios';
import { GET_DETAIL } from "../Types";

const getDetailPokemon = data => ({
  type: GET_DETAIL,
  payload: data,
});

function GetDataPokemonDetail(url, navigation, id) {
  return async dispatch => {
    await axios
      .get(url)
      .then(async (response) => {
        dispatch(getDetailPokemon(response.data));
        navigation.navigate('DetailScreen', {userId: id});
      })
      .catch(error => {
        console.log(error);
      });
  };
}

export {GetDataPokemonDetail}