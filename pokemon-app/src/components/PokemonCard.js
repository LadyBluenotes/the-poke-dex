import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './AllPokemon.css';

export default class PokemonCard extends Component {

    constructor(props) {
        super(props);
        console.log(this.props);

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
    const pokemonIndex = url.split('/')[6].toString().padStart(3, '0');
    const imageUrl = `https://img.pokemondb.net/artwork/large/${name}.jpg`;

    this.setState({ name: this.capitalize(name), imageUrl, pokemonIndex });
  }

    render() {
        return (
            <div className='wrapper'>
                <div className='pokeNameBox'>
                    <span className='pokemonIdentifier'>
                        #{this.state.pokemonIndex}
                        <a className='pokemonName' href={`/pokemon/${this.state.pokemonIndex}`}>{this.state.name}</a>
                    </span>
                    <img src={this.state.imageUrl} alt={this.state.name} />
                </div>
            </div>
        )
    }
}