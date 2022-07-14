import React from 'react';
import './PokemonList.css';

export default function PokemonList({ pokemon }) {

  const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
  }

  return (
    <div className='wrapper'>
        {pokemon.map(p => (
          <div key={p[0]}>
            <span>{p[1].split('/')[6]}</span>
            <img src={`https://img.pokemondb.net/artwork/large/${p[0]}.jpg`} alt={p[0]} />
            <a className='pokemonName' href='#'>{capitalize(p[0])}</a>
            </div>
        ))}
        
    </div>
  );
}
