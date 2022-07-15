import React from 'react';
import './PokemonList.css';

export default function PokemonList({ pokemon }) {

  const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
  }

  // when screen width is below 400px display text saying "make screen wider to view content"
  const displayText = () => {
    if (window.innerWidth < 400) {
      return "Make screen wider to view content"
    }
  }

  return (
    <div className='wrapper'>
      <p className='textDisplay'>{displayText()}</p>
        {pokemon.map(p => (
          <div key={p[0]}>
            <span>#{p[1].split('/')[6].toString().padStart(3, '0')}<a className='pokemonName' href='#'>{capitalize(p[0])}</a></span>
            <img src={`https://img.pokemondb.net/artwork/large/${p[0]}.jpg`} alt={p[0]} />
            </div>
        ))}
    </div>
  );
}
