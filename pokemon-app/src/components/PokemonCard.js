import React, { Component } from 'react';
import { Link } from 'react-router-dom'; 

import './AllPokemon.css';
import './Navbar.js';

export default class PokemonCard extends Component {

    // if search is empty, render all pokemon if not, render filtered pokemon

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            imageUrl: '',
            pokemonIndex: '',
        }
        this.capitalize = this.capitalize.bind(this);
    }
    
  capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

componentDidMount() {
    const { name, url } = this.props;
    const pokemonIndex = url.split('/')[6];
    const imageUrl = `https://img.pokemondb.net/artwork/large/${name}.jpg`;

    this.setState({ name: this.capitalize(name), imageUrl, pokemonIndex });
  }
  
    render() {
            if (getSearchValue() === '') {
            return (
                <div className='wrapper'>
                    <div className='pokeNameBox'>
                        <span className='pokemonIdentifier'
                        onClick={() => window.location.reload()}>
                            <Link to={`pokemon/${this.state.pokemonIndex}`}>
                                <h4 className='pokemonIndex'>#{this.state.pokemonIndex.toString().padStart(3, '0')}</h4>
                                <h4 className='pokemonName'>{this.state.name}</h4>
                            </Link>
                        </span>
                        <img src={this.state.imageUrl} alt={this.state.name} />
                    </div>
                </div>
            )
        } else {
            // if search is not empty, render the filtered pokemon using the res.data.id from searchValue function in Navbar.js
            if (this.state.pokemonIndex === getSearchValue()) {
                return (
                    <div className='wrapper'>
                        <div className='pokeNameBox'>
                            <span className='pokemonIdentifier'
                            onClick={() => window.location.reload()}>
                                <Link to={`pokemon/${this.state.pokemonIndex}`}>
                                    <h4 className='pokemonIndex'>#{this.state.pokemonIndex.toString().padStart(3, '0')}</h4>
                                    <h4 className='pokemonName'>{this.state.name}</h4>
                                </Link>
                            </span>
                            <img src={this.state.imageUrl} alt={this.state.name} />
                        </div>
                    </div>
                )
            } else {
                return (
                    alert ('No Pokemon Found')
                )
            }
        }
    }
}