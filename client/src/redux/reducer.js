import {
  GET_ALL_DOGS,
  ORDER_DOG,
  FILTER_DOG,
  POST_DOG,
  FILTER_BY_APIDB,
  ORDER_BYWEIGTH,
} from "./actions-types";

const initialState = {
  myDogs: [],
  allDogs: [],
};
//! ////////////////////////////////////////////////////////////////////////
const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_ALL_DOGS:
      return {
        ...state,
        myDogs: payload,
        allDogs: payload,
      };
    //! ////////////////////////////////////////////////////////////////////////
    case POST_DOG:
      return {
        ...state,
        myDogs: [...state.myDogs, payload],
        allDogs: [...state.allDogs, payload],
      };
    //! ////////////////////////////////////////////////////////////////////////

    case FILTER_DOG:
      if (payload === "All") {
        return {
          ...state,
          myDogs: state.allDogs,
        };
      }

      const filteredTemperamentos = state.allDogs.filter(
        (dog) => dog.temperamentos === payload
      );
      return {
        ...state,
        myDogs: filteredTemperamentos,
      };

    //! ///////////////////////////////////////////////////////////////////////

    case FILTER_BY_APIDB:
      if (payload === "All") {
        return {
          ...state,
          myDogs: state.allDogs,
        };
      } else if (payload === "Api") {
        const filteredApi = state.allDogs.filter(
          (dog) => typeof dog.id === "number"
        );
        return {
          ...state,
          myDogs: filteredApi,
        };
      } else if (payload === "DB") {
        const filteredDb = state.allDogs.filter(
          (dog) => typeof dog.id === "string"
        );
        return {
          ...state,
          myDogs: filteredDb,
        };
      }

    //! ////////////////////////////////////////////////////////////////////////
    case ORDER_DOG:
      const orderCopy = [...state.myDogs];
      if (payload === "A") {
        orderCopy.sort((a, b) => a.id - b.id);
      }
      if (payload === "D") {
        orderCopy.sort((a, b) => b.id - a.id);
      }
      return {
        ...state,
        myDogs: orderCopy,
      };

    case ORDER_BYWEIGTH:
      const orderCopyWeigth = [...state.myDogs];
      if (payload === "WEIGTH ⬇") {
        orderCopy.sort((a, b) => b.weigth.localeCompare(a.weigth));
      }
      if (payload === "WEIGTH ⬆") {
        orderCopy.sort((a, b) => a.weigth.localeCompare(b.weigth));
      }

      return {
        ...state,
        myDogs: orderCopyWeigth,
      };
    default:
      return { ...state };
  }
};

export default reducer;
