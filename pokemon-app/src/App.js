import { 
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

import './App.css';

import Navbar from './components/Navbar';
import AllPokemon from './components/AllPokemon';
import PokemonDetails from './components/PokemonDetails'

const App = () => {

  return (
    <Router>
      <Navbar
      />
        <Switch>
            <Route 
              exact path="/" 
              component={props => <AllPokemon { ... props} 
              />} 
            />
            <Route 
            path="/pokemon/:pokemonIndex"
            component={props => <PokemonDetails { ... props} />}
            />
        </Switch>
    </Router>
  );
}

export default App;
