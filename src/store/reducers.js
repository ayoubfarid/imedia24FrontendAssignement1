import * as actions from "./actions";
import { BATCH_SIZE, MAX_PAGE_LENGTH } from "../constants";

/**
 *
 * Check if number of items exceeds the desired end of page
 *
 * @param {number} currentPage.
 *  @param {number} batchSize
 * @param {number} maxPageLength
 * @return {boolean}
 */
export function checkEndOfPage(currentPage, batchSize, maxPageLength) {
  return batchSize * currentPage > maxPageLength;
}
const initialState = {
  isFetching: true,
  hasErrored: false,
  isEndOfCatalogue: false,
  items: [],
  nextItemsBatch: [],
  currentPage: 1,
};

const pokemons = (state = initialState, action) => {
  const isEndOfPage = checkEndOfPage(
    BATCH_SIZE,
    state.currentPage,
    MAX_PAGE_LENGTH
  );
  switch (action.type) {
    case actions.GET_POKEMONS:
      return {
        ...state,
        isFetching: true,
        hasErrored: false,
      };
    case actions.GET_POKEMONS_SUCCESS:
      if (isEndOfPage) {
        return {
          ...state,
          isFetching: true,
          hasErrored: false,
          isEndOfPage:true
        };
      }
      return {
        ...state,
        isFetching: false,
        hasErrored: false,
        isEndOfPage:false,
        items:[...state.items, ...action.pokemons.results],
        currentPage: state.currentPage + 1
      };
      case actions.GET_POKEMONS_FAILURE:
      return {
        ...state,
        isFetching: false,
        hasErrored: true
      };
      case actions.GET_NEXT_POKEMONS_BATCH_SUCCESS:
      if (isEndOfPage) {
        return {
          ...state,
          isFetching: false,
          hasErrored: false,
          isEndOfPage: true
        };
      }

      return {
        ...state,
        isFetching: false,
        hasErrored: false,
        nextItemsBatch: action.pokemons.results,
        currentPage: state.currentPage + 1
      };

      case actions.GET_NEXT_POKEMONS_BATCH_FAILURE:
      return {
        ...state,
        isFetching: false,
        hasErrored: true
      };
    case actions.ADD_NEXT_POKEMONS_BATCH:
      return {
        ...state,
        items: [...state.items, ...state.nextItemsBatch],
        nextItemsBatch: []
      };
    default:
      return state;
  
  }
};

export default pokemons;

