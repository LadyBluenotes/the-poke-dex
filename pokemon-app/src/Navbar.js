import React from 'react'

function Navbar( {pokemonCount}) {
  return (
    <nav>
        <h1>PokeDex</h1>
        <h3>{pokemonCount} Pokemon</h3>
    </nav>
  )
}

export default Navbar