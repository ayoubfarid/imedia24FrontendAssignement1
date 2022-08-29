import "./App.css";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getNextPokemonsList, getPokemonsList } from "./store/actions";
import Pokemon from "./components/Pokemon";
import Spinner from 'react-bootstrap/Spinner';

function App() {
  const [isBottom, setIsBottom] = useState(false);

  const { pokemons } = useSelector((state) => state);
  const { nextItemsList, isFetching, hasErrored, isEndOfPage } = pokemons;

  const dispatch = useDispatch();

  // Handle user scrolling the page
  function handleUserScroll() {
    // get scroll top value
    const scrollTop = document.documentElement.scrollTop;

    // get the entire height, including padding
    const scrollHeight = document.documentElement.scrollHeight;

    // check if user is near to the bottom of the body
    if (scrollTop + window.innerHeight + 50 >= scrollHeight) {
      setIsBottom(true);
    }
  }

  // on mount
  useEffect(() => {
    window.addEventListener("scroll", handleUserScroll);
    return () => window.removeEventListener("scroll", handleUserScroll);
  }, []);

  // get users when page is loading
  useEffect(() => {
    dispatch(getPokemonsList());
  }, [dispatch]);

  // handle re-rendering when list of pokemons get to the bottom of the page
  useEffect(() => {
    if (isBottom) {
      if (nextItemsList.length) {
        // render the next List of pre-fetched list of pokemons
        dispatch(getNextPokemonsList());
      } else {
        // fetch another batch
        dispatch(getPokemonsList());
      }

      setIsBottom(false);
    }
  }, [isBottom, nextItemsList, dispatch, setIsBottom]);

  return (
    <>
      <div className="main-container">


        <h2 className="page-title">Pokemons List</h2>
        <p className="info-text">This project shows a demo of fetching pokemons list </p>
        <div className="container">

          {pokemons.items.map((pokemon) => (
            <div key={pokemon.name}>
              <Pokemon name={pokemon.name} url={pokemon.url} />
            </div>
          ))}
        </div>
      </div>
      {pokemons.items.length && (
        <div className="users-listing">
         {pokemons.items.length} pokemons is showed
        </div>
      )}
      {!pokemons.items.length && !isFetching ? (
        <p className="info-text">Couldn't find any pokemons.</p>
      ) : isEndOfPage ? (
        <p className="info-text">End of pokemons catalogue.</p>
      ) : isFetching ? (
        <p className="info-text"> <Spinner animation="border" /> Loading...</p>
      ) : hasErrored ? (
        <p className="info-text">
          There was an error while fetching pokemons data.
        </p>)
        : null}
    </>
  );
}

export default App;
