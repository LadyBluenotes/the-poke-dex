import React from 'react';
import './Navbar.css';

function Navbar({ data }) {


  return (
    <nav className='navigation'>
        <h1 className='title'>
          PokeDex
        </h1>
        <div className='navSearch'>
          <form>
            <label>
              <input 
                type='text'
                placeholder='Search'
                />
            </label>
            <button
              type="submit"
              className='searchButton'
            >Search</button>
          </form>
        </div>
      </nav>
    )
  }

export default Navbar;