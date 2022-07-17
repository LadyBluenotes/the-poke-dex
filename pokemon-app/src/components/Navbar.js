import React from 'react'
import './Navbar.css'

function Navbar({}) {

  // searching for pokemon by name brings up the pokemon's information page, if no pokemon is found, it displays a message saying "No pokemon found"
  const searchPokemon = (e) => {
    e.preventDefault()
    const search = e.target.search.value
    if (search === '') {
      alert('Please enter a pokemon name')
    } else {
      window.location.href = `/pokemon/${search}`
    }
  }

  return (
    <nav className='navigation'>
      <h1 className='title'>PokeDex</h1>
        <div className='navSearch'>
          <form>
            <label>
              <input
                type="text"
                placeholder="Search for a Pokemon"
                onChange={searchPokemon}
              />
            </label>
          </form>
        </div>
      </nav>
  )
}

export default Navbar