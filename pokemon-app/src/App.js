import React, { useState, useEffect } from 'react';
import './App.css';
import PokemonList from './PokemonList';
import Navbar from './Navbar';
import Pagination from './Pagination';
import axios from 'axios';

function App() {
  const url = 'https://pokeapi.co/api/v2/pokemon-species/';
  const [pokemon, setPokemon] = useState('bulbasaur');
  const [pokemonData, setPokemonData] = useState([]);
  const [pokemonType, setPokemonType] = useState('');
  const [currentPageUrl, setCurrentPageUrl] = useState(url);
  const [nextPageUrl, setNextPageUrl] = useState(url);
  const [prevPageUrl, setPrevPageUrl] = useState(url);
  const [loading, setLoading] = useState(true);

  const getPokemon = async () => {
    const toArray = [];
    try {
      const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
      const res = await axios.get(url);
      toArray.push(res.data);
      setPokemonType(res.data.types[0].type.name);
      setPokemonData(toArray);
    } catch (e) {
      console.log(e);
    }
  };
  console.log(pokemonData);

  useEffect(() => {
    getPokemon();
  }, [])
  


  useEffect(() => {
    setLoading(true)
    let cancel
    axios.get(currentPageUrl, {
      cancelToken: new axios.CancelToken(c => cancel = c)
    })
      .then(res => {
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
      <Navbar/>
      <PokemonList pokemon={pokemon}/>
      <Pagination 
        gotoNextPage={nextPageUrl ? gotoNextPage : null }
        gotoPrevPage={prevPageUrl ? gotoPrevPage : null }
      />
    </>
  );
}

export default App;


// add what number each pokemon is

// include a photo with each pokemon

// can get api info for each pokemon through - href={pokemonUrl + p}
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

