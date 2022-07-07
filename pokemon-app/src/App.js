import React, { useState, useEffect } from 'react';
import './App.css';
import PokemonList from './PokemonList';
import Pagination from './Pagination';
import axios from 'axios';

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [currentPageUrl, setCurrentPageUrl] = useState('https://pokeapi.co/api/v2/pokemon-species');
  const [nextPageUrl, setNextPageUrl] = useState('https://pokeapi.co/api/v2/pokemon-species');
  const [prevPageUrl, setPrevPageUrl] = useState('https://pokeapi.co/api/v2/pokemon-species');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true)
    let cancel
    axios.get(currentPageUrl, {
      cancelToken: new axios.CancelToken(c => cancel = c)
    }).then(res => {
      setLoading(false)
      setNextPageUrl(res.data.next)
      setPrevPageUrl(res.data.previous)
      setPokemon(res.data.results.map(p => p.name))
      })

    return () => cancel()
  }, [currentPageUrl])

  function gotoNextPage() {
    setCurrentPageUrl(nextPageUrl)
  }

  function gotoPrevPage() {
    setCurrentPageUrl(prevPageUrl)
  }

  if (loading) return "Loading..."

  return (
    <>
    <h1>PokeDex</h1>
      <PokemonList pokemon={pokemon} />
      <Pagination 
        gotoNextPage={nextPageUrl ? gotoNextPage : null }
        gotoPrevPage={prevPageUrl ? gotoPrevPage : null }
      />
    </>
  );
}

export default App;


// add total pokemon count

// add what number each pokemon is

// include a photo with each pokemon

// pokemon can be clicked on for more data

// make a page to display pokemon information ( 
  // base happiness, 
  // capture rate, 
  // growth rate, 
  // evolution chain, 
  // moves, 
  // habitat, 
  // pokedex number (as per each different type of pokedex?), 
  // get random sayings from flavour text entries (depending on pokemon edition, for only english at the moment)
  // show pokemon if legendary or mythical (if not, show nothing) 
  // )

  // https://pokeapi.co/api/v2/pokemon-form/ will show pokemon details in more concise format

  // info: https://pokeapi.co/docs/v2#pokemon-section

