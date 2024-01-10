//todo ///////////////////Actions-creators///////////////////////////////
import axios from "axios";
import {
  GET_ALL_DOGS,
  ORDER_DOG,
  FILTER_DOG,
  POST_DOG,
  FILTER_BY_APIDB,
  ORDER_BYWEIGTH,
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

export const filterDog = (temperamentos) => {
  return {
    type: FILTER_DOG,
    payload: temperamentos,
  };
};

export const filterDogByAPIDB = (id) => {
  return {
    type: FILTER_BY_APIDB,
    payload: id,
  };
};

export const createDog = (dog) => {
  const endpoint = "http://localhost:3001/dogs";
  return async (dispatch) => {
    try {
      const { data } = await axios.post(endpoint, dog);
      return dispatch({ type: POST_DOG, payload: data });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  };
};
