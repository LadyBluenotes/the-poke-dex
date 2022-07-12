import React from 'react';
import './PokemonList.css';

import PokemonImage from './PokemonImage';

export default function PokemonList({ pokemon }) {

  return (
    <div className='wrapper'>
      {pokemon.map(p => (
        <div className='pokemon-list-item' key={p}>
          {p}
          <PokemonImage pokemon={pokemon}/>
        </div>
          ))}
    </div>
  )


}
