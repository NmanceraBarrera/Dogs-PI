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

    case FILTER_DOG:
      // if (payload === "Select Temperament...") {
      return {
        ...state,
        searchTemperaments: payload,
      };
    // } else {
    //   const filteredDogs = state.allDogs.filter((dog) => {
    //     return dog.temperament && dog.temperament.includes(payload);
    //   });

    //   return {
    //     ...state,
    //     myDogs: filteredDogs,

    //   };
    // }
    //! /////////////////////////////////////////////////////////////////////
    case SEARCH_DOG: //? ///// lo uso para searchdogbyname
      return {
        ...state,
        searchDogName: payload,
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

    case ORDER_BYWEIGTH:
      const orderCopyWeigth = [...state.myDogs];
      if (payload === "WEIGTH ⬇") {
        orderCopyWeigth.sort((a, b) => b.weight - a.weight);
      }
      if (payload === "WEIGTH ⬆") {
        orderCopyWeigth.sort((a, b) => a.weight - b.weight);
      }

      return {
        ...state,
        myDogs: orderCopyWeigth,
      };

    //? ///////////////////////////////////////////////
    case FILTER_DOGS_BYTEMP:
      return {
        ...state,
        myDogs: payload,
        allDogs: payload,
      };

    //? ////////////////////////////////////////////////

    default:
      return { ...state };
  }
};

export default reducer;
