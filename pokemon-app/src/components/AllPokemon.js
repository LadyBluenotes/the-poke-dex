import React, { Component } from 'react';

import PokemonCard from './PokemonCard';
import './AllPokemon.css';

import axios from 'axios';
import { Grid } from '@mui/material';


export default class PokemonList extends Component {

  state = {
    url: 'https://pokeapi.co/api/v2/pokemon/',
    pokemon: null
  };

  async componentDidMount() {
    const res = await axios.get(this.state.url);
    this.setState({ 
      pokemon: res.data['results'] 
    });
  }

  render() {
    return (
      <Grid 
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        {this.state.pokemon ? (
          this.state.pokemon.map(pokemon => (
            <Grid 
              item 
              xs={12} sm={6} md={4} xl={3}
              >
                <PokemonCard
                  key={pokemon.name}
                  name={pokemon.name}
                  url={pokemon.url}
                />
            </Grid>
            ))
        ) : (<Grid item xs={12}>Loading...</Grid>)}
    </ Grid>
    );
  }
}
