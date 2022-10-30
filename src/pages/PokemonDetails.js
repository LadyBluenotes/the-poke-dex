import React, { Component } from 'react';
import axios from 'axios';

import './PokemonDetails.css';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead,
  TableRow,
 } from '@mui/material';
import { getStats } from '../components/pokemon/helpers/getStats';
import { PokemonStat } from '../components/pokemon/PokemonStat';
import { getPokemon } from '../components/pokemon/api/getPokemon';

const TYPE_COLORS = {
  bug: 'B1C12E',
  dark: '4F3A2D',
  dragon: '755EDF',
  electric: 'FCBC17',
  fairy: 'F4B1F4',
  fighting: '823551D',
  fire: 'E73B0C',
  flying: 'A3B3F7',
  ghost: '6060B2',
  grass: '74C236',
  ground: 'D3B357',
  ice: 'A3E7FD',
  normal: 'C8C4BC',
  poison: '934594',
  psychic: 'ED4882',
  rock: 'B9A156',
  steel: 'B5B5C3',
  water: '3295F6'
};
export default class PokemonDetails extends Component {

  constructor(props) {
    super(props);

    this.state = {
      name: '',
      pokemonIndex: '',
      imageUrl: '',
      types: [],
      description: '',
      statTitleWidth: 3,
      statBarWidth: 9,
      stats: {
        hp: '',
        attack: '',
        defense: '',
        speed: '',
        specialAttack: '',
        specialDefense: ''
      },
      height: '',
      weight: '',
      eggGroups: '',
      catchRate: '',
      abilities: '',
      genderRatioMale: '',
      genderRatioFemale: '',
      evs: '',
      hatchSteps: '',
      themeColor: '#EF5350',
      baseHappiness: '',
      growthRate: '',
      baseExperience: ''
    }

  }

  goBack = () => {
    this.props.history.push('/');
    // reload page
    window.location.reload();
  }


 async componentDidMount() {

    const { pokemonIndex } = this.props.match.params;

    const pokemonSpeciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${pokemonIndex}/`;

    const pokemonRes = await getPokemon();

    const name = pokemonRes.data.name
    const imageUrl = pokemonRes.data.sprites.front_default;


    let { hp, attack, defense, speed, specialAttack, specialDefense } = '';

    pokemonRes.data.stats.map(getStats());

    const height = (pokemonRes.data.height/10).toFixed(2);
    const weight = (pokemonRes.data.weight/10).toFixed(2); ;
    const baseExperience = pokemonRes.data.base_experience;

    const types = pokemonRes.data.types.map(type => type.type.name);

    const themeColor = `#${TYPE_COLORS[types[0]]}`;

    const abilities = pokemonRes.data.abilities.map(
      ability => {
        return <li key={ability.ability.name}> {ability.ability.name
          .toLowerCase()
          .split('-')
          .map(s => s.charAt(0).toUpperCase() + s.substring(1))
          .join(' ')}
        </li>
      });

    const evs = pokemonRes.data.stats
    .filter(stat => {
      if (stat.effort > 0) {
        return true;
      }
      return false;
    })
    .map(stat => {
      return `${stat.effort} ${stat.stat.name
        .toLowerCase()
        .split('-')
        .map(s => s.charAt(0).toUpperCase() + s.substring(1))
        .join(' ')}`;
    })
    .join(', ');

    await axios.get(pokemonSpeciesUrl)
      .then(res => {
        let description = '';
        res.data.flavor_text_entries.some(flavor => {
          if (flavor.language.name === 'en') {
          description = flavor.flavor_text;
          return description;
          }
      })

    const femaleRate = res.data['gender_rate'];

    
    const genderRatioFemale = 12.5 * femaleRate;
    const genderRatioMale = 12.5 * (8 - femaleRate)

    const catchRate = Math.round(100/255 * res.data['capture_rate']);

    const eggGroups = res.data['egg_groups']
      .map(group => {
        return group.name
        .toLowerCase()
        .split(' ')
        .map(s => s.charAt(0).toUpperCase() + s.substring(1))
        .join(' ')
      })
      .join(', ');

    const hatchSteps = 255 * (res.data['hatch_counter'] + 1)
  
    const baseHappiness = res.data.base_happiness;
    const growthRate = res.data.growth_rate.name;

      this.setState({
        description,
          genderRatioFemale,
          genderRatioMale,
          catchRate,
          eggGroups,
          hatchSteps
      });

      this.setState({
        imageUrl,
        pokemonIndex,
        name,
        types,
        stats: {
          hp,
          attack,
          defense,
          speed,
          specialAttack,
          specialDefense
        },
        themeColor,
        height,
        weight,
        abilities,
        evs,
        baseExperience,
        baseHappiness,
        growthRate,
      });

    })
    .catch(err => console.log(err));
  }

  render() {
    return (
      <main>
          <div className='pokeImg'>
            <button 
              className='homeButton'
              onClick={this.goBack}
              >
                Back to Home
              </button>
            <img src={this.state.imageUrl} alt={this.state.name} />
          </div>
          
          <div className='pokeData'>
              <h2 className='pokeNameNumber'> #{this.state.pokemonIndex.toString().padStart(3, '0') + ' ' + this.state.name
                .toLowerCase()
                .split(' ')
                .map(s => s.charAt(0).toUpperCase() + s.substring(1))
                .join(' ')}
              </h2>
              <div className='basicTable'>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableHead>Type</TableHead>
                      <TableCell>
                      <div className='pokeType'>
                        {this.state.types.map(type => {
                        return (
                          
                            <span key={type} style={{ backgroundColor: `#${TYPE_COLORS[type]}` }}>
                              {type
                              .toLowerCase()
                              .split(' ')
                              .map(s => s.charAt(0).toUpperCase() + s.substring(1))
                              .join(' ')}
                            </span>
                          
                        )})}
                        </div>
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableHead>Height</TableHead>
                      <TableCell>{`${this.state.height}m ( ${(this.state.height * 3.28).toFixed(2)}ft )`}</TableCell>
                    </TableRow>

                    <TableRow>
                      <TableHead>Weight</TableHead>
                      <TableCell>{`${this.state.weight}kg ( ${((this.state.weight) * 2.20).toFixed(2)}lb )`}</TableCell>
                    </TableRow>

                    <TableRow>
                      <TableHead>Abilities</TableHead>
                      <TableCell>{this.state.abilities}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
          </div>
                               
        <div className='pokeInfo'>
          <div className='pokeTraining'>
            <h3>Training</h3>
            <Table>
              <TableBody>
                <TableRow>
                  <TableHead>Catch Rate</TableHead>
                  <TableCell>{this.state.catchRate}%</TableCell>
                </TableRow>
                <TableRow>
                  <TableHead>Base Experience</TableHead>
                  <TableCell>{this.state.baseExperience}</TableCell>
                </TableRow>
                <TableRow>
                  <TableHead>Base Happiness(Friendship)</TableHead>
                  <TableCell>{this.state.baseHappiness}</TableCell>
                </TableRow>
                <TableRow>
                  <TableHead>Growth Rate</TableHead>
                  <TableCell>{this.state.growthRate}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
            </div>
        </div>
        
        <div className='pokeBreeding'>
          <h3>Breeding</h3>
          <Table>
            <TableBody>
              <TableRow>
                <TableHead>Egg Groups</TableHead>
                <TableCell>{this.state.eggGroups}</TableCell>
              </TableRow>
              <TableRow>
                <TableHead>Hatch Steps</TableHead>
                <TableCell>{this.state.hatchSteps}</TableCell>
              </TableRow>
              <TableRow>
                <TableHead>Gender</TableHead>
                <TableCell>
                {(this.state.genderRatioFemale === (-12.5)) ? (
                    <span>No information</span>
                  ) : (
                    <div>
                      <span>{this.state.genderRatioFemale}% Female</span>
                      <span>{this.state.genderRatioMale}% Male</span>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        <div className='pokeStats'>
          <h3>Base Stats</h3>
          <div>
            <PokemonStat title='HP' value={this.state.stats.hp} />

            <PokemonStat title='Attack' value={this.state.stats.attack} />

            <PokemonStat title='Defense' value={this.state.stats.defense} />

            <PokemonStat title='Speed' value={this.state.stats.speed} />

            <PokemonStat title='Special Attack' value={this.state.stats.specialAttack} />

            <PokemonStat title='Special Defense' value={this.state.stats.specialDefense} />
          </div>
        </div>
      </main>
    );
  }
}
