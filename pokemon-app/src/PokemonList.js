import React from 'react'
import './PokemonList.css'

export default function PokemonList({ pokemon }) {

  return (
    <div>
      {pokemon.map(p => (
          <div key={p}>
            <table>
              <tbody>
                <tr>
                  <td> {p}</td>
                </tr>
              </tbody>
            </table>
          </div>
      ))}
    </div>
  )


}
