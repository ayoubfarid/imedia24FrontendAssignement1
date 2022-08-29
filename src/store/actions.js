export const GET_POKEMONS_LIST = "GET_POKEMONS_LIST";
export const GET_POKEMONS_LIST_SUCCESS = "GET_POKEMONS_LIST_SUCCESS";
export const GET_POKEMONS_LIST_FAILURE = "GET_POKEMONS_LIST_FAILURE";

export const GET_NEXT_POKEMONS_LIST = "GET_NEXT_POKEMONS_LIST";
export const GET_NEXT_POKEMONS_LIST_SUCCESS =
  "GET_NEXT_POKEMONS_LIST_SUCCESS";
export const GET_NEXT_POKEMONS_LIST_FAILURE =
  "GET_NEXT_POKEMONS_LIST_FAILURE";

/**
 * Get Pokemons
 *
 * @returns {Object} action.
 */
export const getPokemonsList = () => {
  return {
    type: GET_POKEMONS_LIST
  };
};

/**
 * Pokemons seccessfully received
 *@param {Object} pokemons
 * @returns {Object} action
 */
export const getPokemonsListSuccess = (pokemons) => {
  return {
    type:GET_POKEMONS_LIST_SUCCESS,
    pokemons
  };
};

/**
 * Failed to get pokemons
 *@param {Object} errors
 * @returns {Object} action
 */
 export const getPokemonsListFailure = (errors) => {
    return {
      type:GET_POKEMONS_LIST_FAILURE,
      errors
    };
  };

  /**
 * Get Next pokemons list
 * 
 * @returns {Object} action
 */
 export const getNextPokemonsList = () => {
    return {
      type:GET_NEXT_POKEMONS_LIST
    };
  };
  
  /**
 * Next batch Pokemons seccessfully received
 *@param {Object} pokemons
 * @returns {Object} action
 */
export const getNextPokemonsListSuccess = (pokemons) => {
    return {
      type:GET_NEXT_POKEMONS_LIST_SUCCESS,
      pokemons
    };
  };

/**
 * Failed to get next pokemons batch
 * 
 *@param {Object} errors
 * @returns {Object} action
 */
export const getNextPokemonsListFailure = (errors) => {
    return {
      type:GET_NEXT_POKEMONS_LIST_FAILURE,
      errors
    };
  };


  