import React, { Component } from 'react';
import './Pokemon.css';

export default function PokemonList({ pokemon }) {

  const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
  }

  // when pokemon name is clicked on, redirect to said pokemon's information page
  const redirectToPokemon = () => {
    console.log('clicked')
  }

  return (
    <div className='wrapper'>
      <p className='textDisplay'></p>
        {pokemon.map(p => (
          <div key={p[0]}>
            <span className='pokemonIdentifier'>#{p[1].split('/')[6].toString().padStart(3, '0')}<a className='pokemonName' onClick={redirectToPokemon} >{capitalize(p[0])}</a></span>
            <img src={`https://img.pokemondb.net/artwork/large/${p[0]}.jpg`} alt={p[0]} />
            </div>
        ))}
    </div>
  );
}
