import React, { Component } from 'react';
import axios from 'axios';

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

export default class PokemonStats extends Component {

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
    const {pokemonIndex} = this.props.match.params;
    const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonIndex}`;
    const pokemonSpeciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${pokemonIndex}/`;

    const pokemonRes = await axios.get(pokemonUrl)

    const name = pokemonRes.data.name
    const imageUrl = `https://img.pokemondb.net/artwork/large/${name}.jpg`;


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
      <div>
        <h5>{this.state.pokemonIndex}</h5>

        <div>
          {this.state.types.map(type => (
            <span key={type} >
              {type
                .toLowerCase()
                .split(' ')
                .map(s => s.charAt(0).toUpperCase() + s.substring(1))
                .join(' ')}
            </span>
          ))}
        </div>

        <img src={this.state.imageUrl}/>


        <h4>
          {this.state.name
            .toLowerCase()
            .split(' ')
            .map(s => s.charAt(0).toUpperCase() + s.substring(1))
            .join(' ')}
        </h4>

        <div>
          HP
        </div>
          <div
              className="progress-bar"
              role="progressbar"
              style={{
                width: `${this.state.stats.hp}%`,
                backgroundColor: `#${this.state.themeColor}`
              }}
              aria-valuenow="25"
              aria-valuemin="0"
              aria-valuemax="100"
            >
              <small>{this.state.stats.hp}</small>
          </div>

          <div>
            Attack
          </div>
            <div
              className="progress-bar"
              role="progressbar"
              style={{
                width: `${this.state.stats.attack}%`,
                backgroundColor: `#${this.state.themeColor}`
              }}
              aria-valuenow="25"
              aria-valuemin="0"
              aria-valuemax="100"
            >
              <small>{this.state.stats.attack}</small>
            </div>

            <div>
              Defense
            </div>
              <div
                className="progress-bar "
                role="progressbar"
                style={{
                  width: `${this.state.stats.defense}%`,
                  backgroundColor: `#${this.state.themeColor}`
                }}
                aria-valuenow="25"
                aria-valuemin="0"
                aria-valuemax="100"
              >
                <small>{this.state.stats.defense}</small>
          </div>

          <div>
            Speed
          </div>
              <div
                className="progress-bar"
                role="progressbar"
                style={{
                  width: `${this.state.stats.speed}%`,
                  backgroundColor: `#${this.state.themeColor}`
                }}
                aria-valuenow="25"
                aria-valuemin="0"
                aria-valuemax="100"
              >
                <small>{this.state.stats.speed}</small>
              </div>

              <div>
                Sp Atk
              </div>
                  <div
                    className="progress-bar "
                    role="progressbar"
                    style={{
                      width: `${this.state.stats.specialAttack}%`,
                      backgroundColor: `#${this.state.themeColor}`
                    }}
                    aria-valuenow={this.state.stats.specialAttack}
                    aria-valuemin="0"
                    aria-valuemax="100"
                  >
                    <small>{this.state.stats.specialAttack}</small>
              </div>

              <div>
                Sp Def
              </div>
                <div
                  className="progress-bar "
                  role="progressbar"
                  style={{
                    width: `${this.state.stats.specialDefense}%`,
                    backgroundColor: `#${this.state.themeColor}`
                  }}
                  aria-valuenow={this.state.stats.specialDefense}
                  aria-valuemin="0"
                  aria-valuemax="100"
                >
                  <small>{this.state.stats.specialDefense}</small>
                </div>

                <p>{this.state.description}</p>

              <h5>Profile</h5>

                    <h6>Height:</h6>
                      <h6>{this.state.height} ft.</h6>

                    <h6>Weight:</h6>
                    <h6>{this.state.weight} lbs</h6>

                    <h6>Catch Rate:</h6>
                      <h6>{this.state.catchRate}%</h6>

                    <h6>Gender Ratio:</h6>
                      <div
                        role="progressbar"
                        style={{
                          width: `${this.state.genderRatioFemale}%`,
                          backgroundColor: '#c2185b'
                        }}
                        aria-valuenow="15"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      >
                        <small>{this.state.genderRatioFemale}</small>
                      </div>

                      <div
                        role="progressbar"
                        style={{
                          width: `${this.state.genderRatioMale}%`,
                          backgroundColor: '#1976d2'
                        }}
                        aria-valuenow="30"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      >
                        <small>{this.state.genderRatioMale}</small>
                      </div>

                    <h6>Hatch Steps:</h6>
                      <h6>{this.state.hatchSteps}</h6>

                    <h6>Abilities:</h6>
                      <h6>{this.state.abilities}</h6>

                    <h6>EVs:</h6>
                      <h6>{this.state.evs}</h6>

        <div>
          {this.state.types.map(type => (
            <span
              key={type}
              style={{
                backgroundColor: `#${TYPE_COLORS[type]}`,
                color: 'white'
              }}
            >
              {type
                .toLowerCase()
                .split(' ')
                .map(s => s.charAt(0).toUpperCase() + s.substring(1))
                .join(' ')}
            </span>
          ))}
        </div>

        <img src={this.state.imageUrl} />

        <h4>
          {this.state.name
            .toLowerCase()
            .split(' ')
            .map(s => s.charAt(0).toUpperCase() + s.substring(1))
            .join(' ')}
        </h4>

        <div>
          <div>
            HP
          </div>
              <div
                role="progressbar"
                style={{
                  width: `${this.state.stats.hp}%`,
                  backgroundColor: `#${this.state.themeColor}`
                }}
                aria-valuenow="25"
                aria-valuemin="0"
                aria-valuemax="100"
              >
                <small>{this.state.stats.hp}</small>
            </div>
        </div>

        <div>
          <div>
            Attack
          </div>
              <div
                role="progressbar"
                style={{
                  width: `${this.state.stats.attack}%`,
                  backgroundColor: `#${this.state.themeColor}`
                }}
                aria-valuenow="25"
                aria-valuemin="0"
                aria-valuemax="100"
              >
                <small>{this.state.stats.attack}</small>
          </div>
        </div>

        <div>
          <div>
            Defense
          </div>
              <div
                className="progress-bar "
                role="progressbar"
                style={{
                  width: `${this.state.stats.defense}%`,
                  backgroundColor: `#${this.state.themeColor}`
                }}
                aria-valuenow="25"
                aria-valuemin="0"
                aria-valuemax="100"
              >
                <small>{this.state.stats.defense}</small>
            </div>
        </div>

        <div>
          <div>
            Speed
          </div>
              <div
                role="progressbar"
                style={{
                  width: `${this.state.stats.speed}%`,
                  backgroundColor: `#${this.state.themeColor}`
                }}
                aria-valuenow="25"
                aria-valuemin="0"
                aria-valuemax="100"
              >
                <small>{this.state.stats.speed}</small>
              </div>
        </div>

        <div>
          <div>
            Sp Atk
          </div>
              <div
                role="progressbar"
                style={{
                  width: `${this.state.stats.specialAttack}%`,
                  backgroundColor: `#${this.state.themeColor}`
                }}
                aria-valuenow={this.state.stats.specialAttack}
                aria-valuemin="0"
                aria-valuemax="100"
              >
                <small>{this.state.stats.specialAttack}</small>
          </div>
        </div>

        <div>
          <div>
            Sp Def
          </div>
              <div
                role="progressbar"
                style={{
                  width: `${this.state.stats.specialDefense}%`,
                  backgroundColor: `#${this.state.themeColor}`
                }}
                aria-valuenow={this.state.stats.specialDefense}
                aria-valuemin="0"
                aria-valuemax="100"
              >
                <small>{this.state.stats.specialDefense}</small>
              </div>
            </div>

        <p>{this.state.description}</p>


    <h5>Profile</h5>

      <h6>Height:</h6>
      <h6>{this.state.height} ft.</h6>

      <h6>Weight:</h6>
      <h6>{this.state.weight} lbs</h6>
      
      <h6 >Catch Rate:</h6>
      <h6>{this.state.catchRate}%</h6>
          
      <h6>Gender Ratio:</h6>
        <div
          class="progress-bar"
          role="progressbar"
          style={{
            width: `${this.state.genderRatioFemale}%`,
            backgroundColor: '#c2185b'
          }}
          aria-valuenow="15"
          aria-valuemin="0"
          aria-valuemax="100"
        >
          <small>{this.state.genderRatioFemale}</small>
        </div>

        <div
          class="progress-bar"
          role="progressbar"
          style={{
            width: `${this.state.genderRatioMale}%`,
            backgroundColor: '#1976d2'
          }}
          aria-valuenow="30"
          aria-valuemin="0"
          aria-valuemax="100"
        >
          <small>{this.state.genderRatioMale}</small>
        </div>


      <h6>Egg Groups:</h6>
      <h6>{this.state.eggGroups} </h6>

      <h6>Hatch Steps:</h6>
      <h6>{this.state.hatchSteps}</h6>

      <h6>Abilities:</h6>
      <h6>{this.state.abilities}</h6>

</div>
    );
  }
}
