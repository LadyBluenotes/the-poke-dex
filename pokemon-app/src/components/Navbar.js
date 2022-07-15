import React from 'react'
import './Navbar.css'

function Navbar({}) {

  return (
    <nav className='navigation'>
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