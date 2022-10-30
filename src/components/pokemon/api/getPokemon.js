import { json } from "express";
import { useEffect } from "react";

const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonIndex}`;

export const getPokemon = () => {
  return axios.get(pokemonUrl);
}

const useGetPokemon = () => {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true)
        const response = await axios
          .get(pokemonUrl)
          .then(response => response.json());
        
          setPokemon(response)
      } catch (e) {
        // error handling
      }
      
      setLoading(false)
    })()
  }, [])

  return {
    pokemon,
    loading
  }
}

const Component = () => {
  const { pokemon } = useGetPokemon()

  const name = pokemon?.name || '';
  return pokemon.map()
}