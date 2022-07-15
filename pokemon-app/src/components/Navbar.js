import React from 'react'
import './Navbar.css'

function Navbar( {}) {

  // const handleChange = (e) => {
  //   setPokemon(e.target.value.toLowerCase());
  // };
  
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   getPokemon();
  // };

  // const searchPokemon = (searchValue) => {
  //   setSearchInput(searchValue)
  // }

  return (
    <nav className='navigation'>
      <h1 className='title'>PokeDex</h1>
      <div className='navSearch'>
        <form>
          <label>
            <input
              type="text"
              placeholder="Search for a Pokemon"
              onChange={(e) => {
                searchItems(e.target.value)
              }}
            />
          </label>
        </form>
      </div>
    </nav>
  )
}

export default Navbar