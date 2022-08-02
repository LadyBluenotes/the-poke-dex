import React from 'react';
import './Navbar.css';

function Navbar({ search, handleSearch, handleSubmit }) {


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
                value={search}
                onChange={handleSearch}
                />
            </label>
            <button
              type="submit"
              className='searchButton'
              onClick={handleSubmit}
            >Search</button>
          </form>
        </div>
      </nav>
    )
  }

export default Navbar;