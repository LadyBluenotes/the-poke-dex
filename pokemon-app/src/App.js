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

  // function and setstates for search

  const [search, setSearch] = useState('');
  const [pokemonUrl, setPokemonUrl] = useState('');
  const [pokemonName, setPokemonName] = useState('');

  const handleSearch = (e) => {
    setSearch(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${search}`);
    setPokemonUrl(res.data.species.url);
    setPokemonName(res.data.name);
    setSearch('');
  }

  return (
    <Router>
      <Navbar
        handleSearch={handleSearch}
        handleSubmit={handleSubmit}
        search={search}
      />
        <Switch>
            <Route 
              exact path="/" 
              render={() => (
                <AllPokemon
                  pokemonUrl={pokemonUrl}
                  pokemonName={pokemonName}
                />
              )}
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