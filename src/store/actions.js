export const GET_POKEMONS = "GET_POKEMONS";
export const GET_POKEMONS_SUCCESS = "GET_POKEMONS_SUCCESS";
export const GET_POKEMONS_FAILURE = "GET_POKEMONS_FAILURE";

export const GET_NEXT_POKEMONS_BATCH = "GET_NEXT_POKEMONS_BATCH";
export const GET_NEXT_POKEMONS_BATCH_SUCCESS =
  "GET_NEXT_POKEMONS_BATCH_SUCCESS";
export const GET_NEXT_POKEMONS_BATCH_FAILURE =
  "GET_NEXT_POKEMONS_BATCH_FAILURE";
export const ADD_NEXT_POKEMONS_BATCH = "ADD_NEXT_POKEMONS_BATCH";

/**
 * Get Pokemons
 *
 * @returns {Object} action.
 */
export const getPokemons = () => {
  return {
    type: GET_POKEMONS,
  };
};

/**
 * Pokemons seccessfully received
 *@param {Object} pokemons
 * @returns {Object} action
 */
export const getPokemonsSuccess = (pokemons) => {
  return {
    type:GET_POKEMONS_SUCCESS,
    pokemons
  };
};

/**
 * Failed to get pokemons
 *@param {Object} errors
 * @returns {Object} action
 */
 export const getPokemonsFailure = (errors) => {
    return {
      type:GET_POKEMONS_FAILURE,
      errors
    };
  };

  /**
 * Get Next pokemons batch
 * 
 * @returns {Object} action
 */
 export const getNextPokemonsBatch = () => {
    return {
      type:GET_NEXT_POKEMONS_BATCH
    };
  };
  
  /**
 * Next batch Pokemons seccessfully received
 *@param {Object} pokemons
 * @returns {Object} action
 */
export const getNextPokemonsBatchsSuccess = (pokemons) => {
    return {
      type:GET_NEXT_POKEMONS_BATCH_SUCCESS,
      pokemons
    };
  };

/**
 * Failed to get next pokemons batch
 * 
 *@param {Object} errors
 * @returns {Object} action
 */
export const getNextPokemonsBatchFailure = (errors) => {
    return {
      type:GET_NEXT_POKEMONS_BATCH_FAILURE,
      errors
    };
  };


  /**
 * Add next pokemons batch to items state.
 *
 * @returns {Object} action.
 */
export const addNextPokemonsBatch = () => {
    return {
      type: ADD_NEXT_POKEMONS_BATCH
    };
  };
  