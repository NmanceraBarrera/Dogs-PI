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

const initialState = {
  myDogs: [],
  allDogs: [],
  searchDogName: [],
  searchTemperaments: [],
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

    case FILTER_DOG: //? ///// lo uso para traer los temperamentos
      return {
        ...state,
        searchTemperaments: payload,
      };

    //! /////////////////////////////////////////////////////////////////////
    case SEARCH_DOG: //? ///// lo uso para searchdogbyname
      return {
        ...state,
        myDogs: payload,
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
        console.log(filteredApi, "asdasdasdasdasd");
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
      console.log(myDogs, "aasdhjasdjahsdj");

    //! ////////////////////////////////////////////////////////////////////////
    case ORDER_DOG:
      const orderCopy = [...state.myDogs];
      if (payload === "Alphabetic Order") {
        orderCopy;
      }
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

    //? //////////////////////////////////////////
    case ORDER_BYWEIGTH:
      const orderCopyWeight = [...state.myDogs];

      orderCopyWeight.sort((a, b) => {
        const parseWeight = (weightString) => {
          if (!weightString) {
            return [0, 0];
          }
          const parts = weightString.split(/[\s-]+/);
          const num1 = parseInt(parts[0]) || 0;
          const num2 = parseInt(parts[1]) || 0;
          return [num1, num2];
        };

        const weightA = parseWeight(a.weight);
        const weightB = parseWeight(b.weight);

        if (weightA[0] !== weightB[0]) {
          return payload === "WEIGHT ⬇"
            ? weightB[0] - weightA[0]
            : weightA[0] - weightB[0];
        }

        return payload === "WEIGHT ⬇"
          ? weightB[1] - weightA[1]
          : weightA[1] - weightB[1];
      });

      return {
        ...state,
        myDogs: orderCopyWeight,
      };

    //? ///////////////////////////////////////////////
    case FILTER_DOGS_BYTEMP:
      return {
        ...state,
        myDogs: payload,
      };

    //? ////////////////////////////////////////////////

    default:
      return { ...state };
  }
};

export default reducer;
