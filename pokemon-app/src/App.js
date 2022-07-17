import { 
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import './App.css';

import Navbar from './components/Navbar';
import AllPokemon from './components/AllPokemon';

import PokemonDetails from './components/PokemonDetails'

function App() {

  return (
    <Router>
      <Navbar />
        <Switch>
            <Route 
              path="/" 
              component={props => <AllPokemon { ... props} />} 
            />
            <Route 
            path="/:pokemonIndex" 
            children={({match}) => 
            <PokemonDetails pokemonIndex={match}/>
            } 
          />
        </Switch>
    </Router>
  );
}

export default App;
