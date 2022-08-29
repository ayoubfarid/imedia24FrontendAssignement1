import React from 'react';
import ReactDOM from 'react-dom/client';
import { legacy_createStore as createStore, combineReducers, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { Provider } from "react-redux";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import pokemons from "./store/reducers";
import fetchPokemonsSaga from "./store/sagas";
// Importing the Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
const sagaMiddleware = createSagaMiddleware();
const rootReducer = combineReducers({ pokemons });
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(fetchPokemonsSaga);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
