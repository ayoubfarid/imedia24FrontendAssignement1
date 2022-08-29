import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPokemons, addNextPokemonsBatch } from "./store/actions";


function App() {
  const [isBottom, setIsBottom] = useState(false);

  const { pokemons } = useSelector((state) => state);
  const { nextItemsBatch, isFetching, hasErrored, isEndOfPage } = pokemons;

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
    dispatch(getPokemons());
  }, [dispatch]);

  // handle re-rendering when list of pokemons get to the bottom of the page
  useEffect(() => {
    if (isBottom) {
      if (nextItemsBatch.length) {
        // render the next batch of pre-fetched list of pokemons
        dispatch(addNextPokemonsBatch());
      } else {
        // fetch another batch
        dispatch(getPokemons());
      }

      setIsBottom(false);
    }
  }, [isBottom, nextItemsBatch, dispatch, setIsBottom]);

  return (
    <>
      <div>
        <h2 className="page-title">Infinite Scrolling App</h2>
        {pokemons.items.map((user) => (
          <div key={user.email} className="item-container">
            
            <div style={{ marginLeft: "20px" }}>
              <h3>
                {user.name.first} {user.name.last}
              </h3>
              
            </div>
          </div>
        ))}
      </div>
      {pokemons.items.length && (
        <div className="users-listing">Showing {pokemons.items.length} pokemons</div>
      )}
      {!pokemons.items.length && !isFetching ? (
        <p className="info-text">Couldn't find any pokemons.</p>
      ) : isEndOfPage ? (
        <p className="info-text">End of pokemons catalogue.</p>
      ) : isFetching ? (
        <p className="info-text">Loading...</p>
      ) : hasErrored ? (
        <p className="info-text">
          There was an error while fetching pokemons data.
        </p>
      ) : null}
    </>
  );
}

export default App;
