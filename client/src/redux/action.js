//todo ///////////////////Actions-creators///////////////////////////////
import axios from "axios";
import {
  GET_ALL_DOGS,
  ORDER_DOG,
  FILTER_DOG,
  POST_DOG,
  FILTER_BY_APIDB,
  ORDER_BYWEIGTH,
  SEARCH_DOG,
  FILTER_DOGS_BYTEMP,
  DELETE_TEMPERAMENT,
} from "./actions-types";
const URL_API = import.meta.env.VITE_URL_API;

export const getAllDogsAction = () => {
  try {
    const endpoint = `${URL_API}/dogs`;
    return async (dispatch) => {
      const { data } = await axios.get(endpoint);
      return dispatch({
        type: GET_ALL_DOGS,
        payload: data,
      });
    };
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export const orderDog = (order) => {
  return {
    type: ORDER_DOG,
    payload: order,
  };
};

export const orderDogByWeigth = (weight) => {
  return {
    type: ORDER_BYWEIGTH,
    payload: weight,
  };
};

export const filterDog = () => {
  return (dispatch) => {
    axios
      .get(`${URL_API}/temperaments`)
      .then(({ data }) => {
        return dispatch({
          type: FILTER_DOG,
          payload: data,
        });
      })
      .catch((error) => {
        console.error("Error obteniendo los temperamentos: ", error);
      });
  };
};

export const filterDogByAPIDB = (id) => {
  return {
    type: FILTER_BY_APIDB,
    payload: id,
  };
};

export const createDog = (dog) => {
  console.log(dog, "esto es lo que recibe mi action dog");
  const endpoint = `${URL_API}/dogs`;
  return async (dispatch) => {
    try {
      const { data } = await axios.post(endpoint, dog);
      console.log(data);
      return dispatch({ type: POST_DOG, payload: data });
    } catch (error) {
      // Manejar el error aquí y devolver una acción de error
      console.error("Error al enviar los datos:", error);
    }
  };
};
// export const searchDogByName = (name) => {
//   return async (dispatch) => {
//     try {
//       const { data } = await axios.get(
//         `${URL_API}/dogs/name?name=${lowerCaseName}`
//       );
//       console.log(data, esto es);
//       dispatch({ type: SEARCH_DOG, payload: data });
//     } catch (error) {
//       console.error("Error al buscar el perro:", error);
//     }
//   };
// };

export const searchDogByName = (value) => async (dispatch, getState) => {
  try {
    const lowerCaseName = value.toLowerCase();
    const URL = `${URL_API}/dogs/name?name=${lowerCaseName}`;
    const { allDogs } = getState();

    if (allDogs.length === 0) {
      const error = "No hay perros para filtrar";
      console.log(error);
      return;
    }
    const nameFilteredDogs = await axios(URL);
    const filteredDogs = allDogs.filter((dog) =>
      nameFilteredDogs.data.some((filteredDog) => dog.id === filteredDog.id)
    );

    dispatch({ type: SEARCH_DOG, payload: filteredDogs });
  } catch (error) {
    console.error(error);
  }
};

//? //////////////////////////////////////////////////////////////////////
export const filterDogsbyTemperament = (temperament) => {
  return async (dispatch, getState) => {
    try {
      const { allDogs } = getState();

      const filteredDogs = allDogs.filter(
        (dog) => dog.temperament && dog.temperament.includes(temperament)
      );

      dispatch({ type: FILTER_DOGS_BYTEMP, payload: filteredDogs });
    } catch (error) {
      console.log(error);
    }
  };
};
