import "./App.css";
import React from "react";
import PokemonsList from "./components/PokemonsList";
import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from "redux";
import createSagaMiddleware from "redux-saga";
import { Provider } from "react-redux";
import "./App.css";
import pokemons from "./store/reducers";
import fetchPokemonsSaga from "./store/sagas";
// Importing the Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";

const sagaMiddleware = createSagaMiddleware();
const rootReducer = combineReducers({ pokemons });
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(fetchPokemonsSaga);
function App() {
  return (
    <Provider store={store}>
      <PokemonsList />
    </Provider>
  );
}

export default App;
