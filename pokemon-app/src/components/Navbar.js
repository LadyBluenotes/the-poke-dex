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

  return (
    <nav>
      <h1 className='title'>PokeDex</h1>
      <div className='navSearch'>
        <form>
          <label>
            <input
              type="text"
              placeholder="Search for a Pokemon"
            />
          </label>
        </form>
      </div>
    </nav>
  )
}

export default Navbar