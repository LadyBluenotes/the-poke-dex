import React from 'react';
import './PokemonList.css';

export default function PokemonList({ pokemon, pokemonUrl }) {

  return (
    <div className='wrapper'>
      {pokemon.map(p => (
        <div className='pokemon-list-item' key={p}>
          {p}
        </div>
      ))}
    </div>
  )


}
