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

// use useState to store the pokemon name and index from search

const App = () => {
  const [name, setName] = useState('');
  const [index, setIndex] = useState('');

  const handleSubmit = (e) => {
    // console log on submit to see what is being sent to the server
    e.preventDefault();
    // console log user input
    console.log(name);
  }

  return (
    <Router>
      <Navbar
      handleSubmit={handleSubmit}
      name={name}
      index={index}
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
