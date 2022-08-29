import { call, put, takeLatest, select } from "redux-saga/effects";
import * as actions from "./actions";
import { getPokemonsData } from "../services";
import { BATCH_SIZE, MAX_LIMIT } from "../constants";

function* fetchPokemonsSaga() {
  yield takeLatest(
    [actions.GET_POKEMONS_LIST, actions.GET_NEXT_POKEMONS_LIST],
    function* ({ type }) {
      try {
        const { currentOffset } = yield select(
          (state) => state.pokemons
        );
        const interval = {
          limit: BATCH_SIZE,
          offset: currentOffset,
        };
        if (currentOffset === MAX_LIMIT) {
          return;
        }
        
        const pokemons = yield call(getPokemonsData, 
            `https://pokeapi.co:443/api/v2/pokemon/?limit=${interval.limit}&offset=${interval.offset}`
            );

        if (type === actions.GET_POKEMONS_LIST) {
          yield put(actions.getPokemonsListSuccess(pokemons));
        } else {
          yield put(actions.getNextPokemonsListSuccess(pokemons));
        }

        if (type === actions.GET_POKEMONS_LIST) {
          yield put(actions.getNextPokemonsList());
        }
      } catch (error) {
        if (type === actions.GET_POKEMONS_LIST) {
          yield put(actions.getPokemonsListFailure());
        } else {
          yield put(actions.getNextPokemonsListFailure());
        }
      }
    }
  );
}
export default fetchPokemonsSaga;
