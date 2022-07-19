import React, { Component, useState } from 'react';
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
    console.log(e.target.value);
  }

  this.handleSubmit = (e) => {
    e.preventDefault();
    axios.get(`https://pokeapi.co/api/v2/pokemon/${this.state.name}`)
    .then(res => {
      console.log(res.data.id);
      this.setState({
        name: res.data.name,
        index: res.data.id,
      })
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

  // redirect to pokemon details page using the index

  this.handleClick = (e) => {
    e.preventDefault();
    this.props.push(`/pokemon/${this.state.index}`);
  }

}
    
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
                placeholder="Search"
                value={this.state.name}
                onChange={this.handleChange}
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