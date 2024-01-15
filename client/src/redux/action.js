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
} from "./actions-types";

export const getAllDogsAction = () => {
  try {
    const endpoint = "http://localhost:3001/dogs";
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

export const orderDogByWeigth = (weigth) => {
  return {
    type: ORDER_BYWEIGTH,
    payload: weigth,
  };
};

export const filterDog = () => {
  return (dispatch) => {
    axios
      .get(`http://localhost:3001/temperaments`)
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
  const endpoint = "http://localhost:3001/dogs";
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
export const searchDogByName = (value) => {
  return async (dispatch, getState) => {
    try {
      const lowerCaseName = value.toLowerCase();
      const URL = `http://localhost:3001/dogs/name?name=${lowerCaseName}`;
      const { myDogs } = getState();

      let dogsToFilter;

      if (myDogs.length === 0) {
        const error = "No hay perros para filtrar";
        return error;
      }

      if (myDogs.length > 0) {
        // Si ya hay resultados de GET_DOGS_BY_NAME, filtra esos resultados
        dogsToFilter = myDogs;
      } else {
        // Si no hay resultados de GET_DOGS_BY_NAME, obtén todos los perros
        const allDogs = await axios("http://localhost:3001/dogs");
        dogsToFilter = allDogs.data;
        console.log(dogsToFilter, "dogsToFilter");
      }

      // Filtra por nombre
      const nameFilteredDogs = await axios(URL);
      const filteredDogs = dogsToFilter.filter((dog) =>
        nameFilteredDogs.data.some((filteredDog) => dog.id === filteredDog.id)
      );

      dispatch({ type: SEARCH_DOG, payload: nameFilteredDogs.data });
      dispatch({ type: FILTER_DOGS_BYTEMP, payload: filteredDogs });
    } catch (error) {
      console.log(error);
    }
  };
};
//? //////////////////////////////////////////////////////////////////////
export const filterDogsbyTemperament = (temperament) => {
  return async (dispatch, getState) => {
    try {
      const { myDogs } = getState();

      let dogsToFilter;

      if (myDogs.length === 0) {
        const error = "No hay perros para filtrar";
        return error;
      }

      if (myDogs.length > 0) {
        dogsToFilter = myDogs;
      } else {
        const allDogs = await axios("http://localhost:3001/dogs");
        dogsToFilter = allDogs.data;
      }

      // Filtra por temperamento
      const filteredDogs = dogsToFilter.filter(
        (dog) => dog.temperament && dog.temperament.includes(temperament)
      );

      dispatch({ type: FILTER_DOGS_BYTEMP, payload: filteredDogs });
    } catch (error) {
      console.log(error);
    }
  };
};
