import React, { Component } from 'react';
import './Navbar.css';

class Navbar extends Component {

  // export name to App.js from search input

render () {
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
              onClick={this.props.handleSubmit}
              className='searchButton'
            >Search</button>
          </form>
        </div>
      </nav>
    )
  }
}

export default Navbar;