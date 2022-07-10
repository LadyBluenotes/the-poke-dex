import React from 'react'
import './PokemonList.css'

export default function PokemonList({ pokemon}) {

  return (
    <table>
      <tbody>
        <tr>
        {pokemon.map(p => (<td key={p}><a href={ '/' + p}>{p}</a></td>))}
        </tr>
      </tbody>
    </table>
  )


}
