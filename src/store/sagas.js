import { call, put, takeLatest, select } from "redux-saga/effects";
import * as actions from "./actions";
import { getData } from "../services";
import { BATCH_SIZE, MAX_PAGE_LENGTH } from "../constants";

function* fetchPokemonsSaga() {
  yield takeLatest(
    [actions.GET_POKEMONS, actions.GET_NEXT_POKEMONS_BATCH],
    function* ({ type }) {
      try {
        const { currentPage, isEndOfPage } = yield select(
          (state) => state.pokemons
        );
        if (isEndOfPage) {
          const itemsReminder = MAX_PAGE_LENGTH % BATCH_SIZE;
          if (itemsReminder === 0) {
            return;
          }
          const pokemons = yield call(
            getData,
            `https://randomuser.me/api/?page=${currentPage}&results=${itemsReminder}`
          );

          yield put(actions.getPokemonsSuccess(pokemons));

        }
        const pokemons = yield call(
            getData,
            `https://randomuser.me/api/?page=${currentPage}&results=${BATCH_SIZE}`
          );
  
          if (type === actions.GET_POKEMONS) {
            yield put(actions.getPokemonsSuccess(pokemons));
          } else {
            yield put(actions.getNextPokemonsBatchsSuccess(pokemons));
          }
  
          if (type === actions.GET_POKEMONS) {
            yield put(actions.getNextPokemonsBatch());
          }
      } catch (error) {
        if (type === actions.GET_POKEMONS) {
            yield put(actions.getPokemonsFailure());
          } else {
            yield put(actions.getNextPokemonsBatchFailure());
          }
      }
    }
  );
}
export default fetchPokemonsSaga;