import * as actions from "./actions";
import { BATCH_SIZE } from "../constants";


const initialState = {
  isFetching: true,
  hasErrored: false,
  items: [],
  nextItemsList: [],
  currentOffset: 0,
};

const pokemons = (state = initialState, action) => {
  
  switch (action.type) {
    case actions.GET_POKEMONS_LIST:
      return {
        ...state,
        isFetching: true,
        hasErrored: false,
      };
    case actions.GET_POKEMONS_LIST_SUCCESS:
      
      return {
        ...state,
        isFetching: false,
        hasErrored: false,
        isEndOfPage: false,
        items: [...state.items, ...action.pokemons.results],
        currentOffset: state.currentOffset + BATCH_SIZE,
      };
      case actions.GET_POKEMONS_LIST_FAILURE:
      return {
        ...state,
        isFetching: false,
        hasErrored: true,
      };
      case actions.GET_NEXT_POKEMONS_LIST:
      
        return {
          ...state,
          isFetching: true,
          hasErrored: false,
          nextItemsList: action.pokemons.results,
          currentOffset: state.currentOffset + BATCH_SIZE,
        };
  
    case actions.GET_NEXT_POKEMONS_LIST_SUCCESS:
      
      return {
        ...state,
        isFetching: false,
        hasErrored: false,
        items: [...state.items, ...state.nextItemsList],
        nextItemsList: [],
        currentOffset: state.currentOffset + BATCH_SIZE,
      };

    case actions.GET_NEXT_POKEMONS_LIST_FAILURE:
      return {
        ...state,
        isFetching: false,
        hasErrored: true,
      };
    
    default:
      return state;
  }
};

export default pokemons;
