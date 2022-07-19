import React, { Component } from 'react';
import axios from 'axios';
import './Navbar.css';

export default class Navbar extends Component {

// on entry of a pokemon, call api to get the data to get information for pokemon details page


    
// on click of H1 return to home page

render () {
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
            <button 
              className='searchButton'
              type="submit"
            >Search</button>
          </form>
        </div>
      </nav>
    )
  }
}