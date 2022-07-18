import React, { Component } from 'react';
import axios from 'axios';

import './PokemonDetails.css';
import { CircularProgress } from '@mui/material';

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
      themeColor: '#EF5350'
    }
  }

 async componentDidMount() {
    const { pokemonIndex } = this.props.match.params;

    const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonIndex}`;
    const pokemonSpeciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${pokemonIndex}/`;

    const pokemonRes = await axios.get(pokemonUrl)

    const name = pokemonRes.data.name
    const imageUrl = pokemonRes.data.sprites.front_default;


    let { hp, attack, defense, speed, specialAttack, specialDefense } = '';

    pokemonRes.data.stats.map(stat => {
      switch (stat.stat.name) {
        case 'hp':
          hp = stat['base_stat'];
          break;
        case 'attack':
          attack = stat['base_stat'];
          break;
        case 'defense':
          defense = stat['base_stat'];
          break;
        case 'speed':
          speed = stat['base_stat'];
          break;
        case 'special-attack':
          specialAttack = stat['base_stat'];
          break;
        case 'special-defense':
          specialDefense = stat['base_stat'];
          break;
        default:
          break;
      }
    });

    const height = Math.round((pokemonRes.height * 0.328084 + 0.00001) * 100) / 100;
    const weight = Math.round((pokemonRes.weight * 0.220462 + 0.00001) * 100) / 100;

    const types = pokemonRes.data.types.map(type => type.type.name);

    const themeColor = `#${TYPE_COLORS[types[0]]}`;

    const abilities = pokemonRes.data.abilities.map(
      ability => {
        return ability.ability.name
          .toLowerCase()
          .split('-')
          .map(s => s.charAt(0).toUpperCase() + s.substring(1))
          .join(' ')
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
            return;
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
        evs
      });

    })
    .catch(err => console.log(err));
  }
  
  render() {
    return (
      <main className='containDetails'>
        <div className='pokeImg'>
          <img src={this.state.imageUrl} alt={this.state.name} />
        </div>
        <div className='pokeData'>
          <h2>{this.state.name
            .toLowerCase()
            .split(' ')
            .map(s => s.charAt(0).toUpperCase() + s.substring(1))
            .join(' ')}
          </h2>
          <table>
            <tbody>
              <tr>
                <th>Type</th>
                <td>{this.state.types.map(type => {
                  return (
                    <span key={type} style={{ backgroundColor: `#${TYPE_COLORS[type]}` }}>
                      {type
                      .toLowerCase()
                      .split(' ')
                      .map(s => s.charAt(0).toUpperCase() + s.substring(1))
                      .join(' ')}
                    </span>
                  )})}
                </td>
              </tr>
              <tr>
                <th>Height</th>
                <td>{this.state.height}m</td>
              </tr>
              <tr>
                <th>Weight</th>
                <td>{this.state.weight}kg</td>
              </tr>
              <tr>
                <th>Abilities</th>
                <td>{this.state.abilities}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <section>
          <div>
            <h3>Training</h3>
            <table>
              <tbody>
                <tr>
                  <th>Catch Rate</th>
                  <td>{this.state.catchRate}%</td>
                </tr>
                <tr>
                  <th>Base Experience</th>
                  <td>{this.state.baseExperience}</td>
                </tr>
                <tr>
                  <th>Base Friendship</th>
                  <td>{this.state.baseFriendship}</td>
                </tr>
                <tr>
                  <th>Growth Rate</th>
                  <td>{this.state.growthRate}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            <h3>Breeding</h3>
            <table>
              <tbody>
                <tr>
                  <th>Egg Groups</th>
                  <td>{this.state.eggGroups}</td>
                </tr>
                <tr>
                  <th>Hatch Steps</th>
                  <td>{this.state.hatchSteps}</td>
                </tr>
                <tr>
                  <th>Gender</th>
                  <td>
                    <span>{this.state.genderRatioFemale}% Female</span>
                    <span>{this.state.genderRatioMale}% Male</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
        <section>
          <h3>Base Stats</h3>
          <div>
            <p>
              <span>HP</span>
              <span>{this.state.stats.hp}</span>
            </p>
            <p>
              <span>Attack</span>
              <span>{this.state.stats.attack}</span>
            </p>
            <p>
              <span>Defense</span>
              <span>{this.state.stats.defense}</span>
            </p>
            <p>
              <span>Speed</span>
              <span>{this.state.stats.speed}</span>
            </p>
            <p>
              <span>Special Attack</span>
              <span>{this.state.stats.specialAttack}</span>
            </p>
            <p>
              <span>Special Defense</span>
              <span>{this.state.stats.specialDefense}</span>
            </p>
          </div>
        </section>
</main>
    );
  }
}
