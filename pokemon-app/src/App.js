import { 
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import './App.css';

import Navbar from './components/Navbar';
import AllPokemon from './components/AllPokemon';
import PokemonDetails from './components/PokemonDetails'
import history from './components/History';

function App() {

  return (
    <Router history={history}>
      <Navbar />
        <Switch>
            <Route 
              exact path="/" 
              component={props => <AllPokemon { ... props} />} 
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
