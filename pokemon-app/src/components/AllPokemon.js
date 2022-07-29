import React, { Component } from 'react';

import PokemonCard from './PokemonCard';
import './AllPokemon.css';

import axios from 'axios';
import { Grid } from '@mui/material';


export default class AllPokemon extends Component {

  state = {
    url: 'https://pokeapi.co/api/v2/pokemon/',
    pokemon: null,
    nextPageUrl: null,
    prevPageUrl: null,
  };

  async componentDidMount() {
    const res = await axios.get(this.state.url);
    this.setState({ 
      pokemon: res.data['results'],
      nextPageUrl: res.data['next'],
      prevPageUrl: res.data['previous']
    });
  }

  async componentDidUpdate(prevProps, prevState) {
    if (prevState.url !== this.state.url) {
      const res = await axios.get(this.state.url);
      this.setState({
        pokemon: res.data['results'],
        nextPageUrl: res.data['next'],
        prevPageUrl: res.data['previous']
      });
    }
  }

  handleNextPage = async () => {
    const res = await axios.get(this.state.nextPageUrl);
    this.setState({
      pokemon: res.data['results'],
      nextPageUrl: res.data['next'],
      prevPageUrl: res.data['previous']
    });
  }

  handlePrevPage = async () => {
    const res = await axios.get(this.state.prevPageUrl);
    this.setState({
      pokemon: res.data['results'],
      nextPageUrl: res.data['next'],
      prevPageUrl: res.data['previous']
    });
  }

  render() {
    return (
      <>
        <Grid 
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={1}
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
        ) : (
          <p>Loading...</p>
        )}
        </Grid>
        <div className="pagination">
          <button onClick={this.handlePrevPage}>Prev</button>
          <button onClick={this.handleNextPage}>Next</button>
        </div>
      </>
    );
  }
}
