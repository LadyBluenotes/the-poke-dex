import React, { Component } from 'react';
import { Link } from 'react-router-dom'; 

import './AllPokemon.css';

export default class PokemonCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            imageUrl: '',
            pokemonIndex: '',
        }
    }


componentDidMount() {
    const { name, url } = this.props;
    const pokemonIndex = url.split('/')[6];
    const imageUrl = `https://img.pokemondb.net/artwork/large/${name.toLowerCase()}.jpg`;

    this.setState({ name, imageUrl, pokemonIndex });
  }

  render(){
    return (
        console.log(this.props),
        <div className='wrapper'>
                    <div className='pokeNameBox'>
                        <span className='pokemonIdentifier'
                        onClick={() => window.location.reload()}>
                            <Link to={ this.props.id ? `pokemon/${this.props.id}` :
                            `/pokemon/${this.state.pokemonIndex}` }>
                                <h4 className='pokemonIndex'>#{ this.props.id ? this.props.id.toString().padStart(3, '0') : 
                                this.state.pokemonIndex.toString().padStart(3, '0')}</h4>
                                <h4 className='pokemonName'>{
                                    this.props.name ? this.props.name : this.state.name
                                }</h4>
                            </Link>
                        </span>
                        <img src={this.state.imageUrl} alt={this.props.name ? this.props.name : this.state.name} />
                    </div>
                </div>
    )}
}
