import React from 'react'
import './PokemonList.css'

export default function PokemonList({ pokemon, pokemonUrl }) {

  return (
    <div>
      {pokemon.map(p => (
          <div key={p}>
            <table>
              <tbody>
                <tr>
                  <td><a href={ '/' + p}>{p}</a></td>
                </tr>
              </tbody>
            </table>
          </div>
      ))}
    </div>
  )


}
