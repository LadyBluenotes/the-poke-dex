import React from 'react'

export default function PokemonList({ pokemon }) {
  return (
    <div>
        {PokemonList.map(pokemon => (
            <div key={pokemon}>{pokemon}</div>
        ))}
    </div>
  )
}
