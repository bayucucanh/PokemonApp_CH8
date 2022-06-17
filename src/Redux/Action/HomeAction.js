import axios from 'axios';
import {GET_DATA} from '../Types';
import {baseURL} from '../../Service';
import {loading, refresh} from './GlobalAction';

export const getDataPokemon = (pokemon, pagination) => ({
  type: GET_DATA,
  pokemon,
  pagination
});

export const GetDataPokemon = url => {
  return async dispatch => {
    dispatch(loading(true));
    await axios
      .get(url)
      .then(async response => {
        const result = await response.data.results;

        const resultPagination = {
          next: response.data.next,
          previous: response.data.previous,
        };

        const pokemonArray = [];
        // eslint-disable-next-line no-restricted-syntax
        for await (const pokemon of result) {
          const pokemonDetailsResponse = await axios.get(pokemon.url);
          const pokemonDetails = await pokemonDetailsResponse.data;

          pokemonArray.push({
            id: pokemonDetails.id,
            name:
              pokemonDetails.name[0].toUpperCase() +
              pokemonDetails.name.substring(1),
            type: pokemonDetails.types[0].type.name,
            types: pokemonDetails.types,
            imgUrl:
              pokemonDetails.sprites.other['official-artwork'].front_default,
          });
        }

        dispatch(loading(false));
        dispatch(refresh(false));
        dispatch(getDataPokemon(pokemonArray, resultPagination));
      })
      .catch(error => {
        console.log(error);
      });
  };
};

export const GetDataAfterNext = url => {
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
