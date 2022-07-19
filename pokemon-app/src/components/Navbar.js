import React, { Component } from 'react';
import axios from 'axios';
import './Navbar.css';

export default class Navbar extends Component {

    constructor(props) {
      super(props);
      this.state = {
        name: '',
        index: '',
    }
  
  this.handleChange = (e) => {
    this.setState({ name: e.target.value });
  }

  this.handleSubmit = (e) => {
    e.preventDefault();
    axios.get(`https://pokeapi.co/api/v2/pokemon/${this.state.name}`)
    .then(res => {
      window.location.href = `/pokemon/${res.data.id}`;
    }).catch(err => {
      console.log(err);
    }).finally(() => {
      this.setState({ 
        name: '',
        index: '',
      });
    }
    )
  }
}
    
// on click of H1 return to home page

render () {
  return (
    <nav className='navigation'>
      <h1 className='title'>PokeDex</h1>
        <div className='navSearch'>
          <form 
            onChange={this.handleChange}
          >
            <label>
              <input
                type="text"
                placeholder="Search"
              />
            </label>
            <button
              type="submit"
              onClick={this.handleSubmit}
              className='searchButton'
            >Search</button>
          </form>
        </div>
      </nav>
    )
  }
}