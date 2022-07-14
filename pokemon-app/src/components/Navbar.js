import React from 'react'

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
        <h1>PokeDex</h1>
        {/* <form onSubmit={handleSubmit}>
        <label>
          <input
            type="text"
            onChange={handleChange}
            placeholder="Search for a Pokemon"
          />
        </label>
      </form> */}
    </nav>
  )
}

export default Navbar