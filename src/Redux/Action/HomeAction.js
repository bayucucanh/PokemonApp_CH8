// import axios from 'axios';
// import {GET_DATA} from '../Types';
// import {baseURL} from '../../Service';

// export const getDataPokemon = data => ({
//   type: GET_DATA,
//   payload: data,
// });

// export function GetDataPokemon() {
//   return async dispatch => {
//     await axios
//       .get(baseURL)
//       .then(async response => {
//         dispatch(getDataPokemon(response.data));
//       })
//       .catch(error => {
//         console.log(error);
//       });
//   };
// }
