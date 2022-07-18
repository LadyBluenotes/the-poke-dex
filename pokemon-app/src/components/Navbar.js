import React from 'react'
import './Navbar.css'

function Navbar({}) {

// user input pokemmon name into input field and when entered will return pokemon detail page of pokemon
// if name is entered wrong, return alert message saying that pokemon does not exist
// if name is not entered, return alert message saying that pokemon name is required

  const searchPokemon = (e) => {
    e.preventDefault()
    const pokemonName = e.target.elements.pokemonName.value.toLowerCase()
    if (pokemonName) {
      window.location.href = `/pokemon/${pokemonName}`
    } else {
      alert('Pokemon name is required')
    }
  }
  
  // const searchPokemon = (e) => {
  //   e.preventDefault()
  //   const search = e.target.search.value
  //   if (search === '') {
  //     alert('Please enter a pokemon name')
  //   } else {
  //     window.location.href = `/pokemon/${search}`
  //   }
  // }

  const goHome = () => {
    window.location.href = '/'
  }

  return (
    <nav className='navigation'>
      <h1 className='title' onClick={goHome}>PokeDex</h1>
        <div className='navSearch'>
          <form>
            <label>
              <input
                type="text"
                placeholder="Search for a Pokemon"
                onChange={searchPokemon}
              />
            </label>
            <button 
              className='searchButton'
              type="submit"
            >Search</button>
          </form>
        </div>
      </nav>
  )
}

export default Navbar