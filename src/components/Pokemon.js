import React, { Component } from "react";
import Poke from "./Poke";
import Details from "./Details";
import "rc-slider/assets/index.css";

import Spinner from './Spinner';
export class Pokemon extends Component {
  constructor(props) {
    super(props);
    console.log("Hello constructor here");
    this.state = {
      pokemonData: [],
      count: 0,
      page: 1,
      searchQuery: "",
      filterPokemon: [],
      searching: false,
      selectedType: "",
      selectedGender: "",
      selectedPokemon: null,
      pokemonStats: [],
      loading:true,
    };
  }
  async componentDidMount() {
    const url = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=18";
    let data = await fetch(url);
    let passData = await data.json();
    const pokemonResults = passData.results;
    const pokemonData = [];
    let gender = "";

    for (const pokemon of pokemonResults) {
      const pokemonDataResponse = await fetch(pokemon.url);
      const pokemonDetails = await pokemonDataResponse.json();

      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon-species/${pokemon.name}`
      );
      const speciesData = await response.json();
      const genderRate = speciesData.gender_rate;
      const evolutionChainUrl = speciesData.evolution_chain.url;
      const evolute = await fetch(evolutionChainUrl);
      const evo_data = await evolute.json();

      if (genderRate === 1) {
        gender = "Male";
      } else if (genderRate === 8) {
        gender = "Female";
      }
      const parts = pokemon.url.split("/");
      const pokemonId = parts[parts.length - 2];
      const imageUrl =
        pokemonDetails.sprites.other["official-artwork"].front_default;
      const paddedPokemonId = String(pokemonId).padStart(3, "0");
      const types = pokemonDetails.types.map((typeData) => typeData.type.name);
      const abilities = pokemonDetails.abilities.map(
        (typeData) => typeData.ability.name
      );

      const stats = pokemonDetails.stats.map((stat) => ({
        name: stat.stat.name,
        value: stat.base_stat,
      }));
      console.log(stats);

      const egg_groups = speciesData.egg_groups.map((group) => group.name);
      pokemonData.push({
        name: pokemon.name,
        imgURL: imageUrl,
        pid: paddedPokemonId,
        types: types,
        gender: gender,
        egg_groups: egg_groups,
        abilities: abilities,
        evo_data: evo_data,
      });
    }
    console.log(this.state.selectedPokemon);

    this.setState({
      pokemonData: pokemonData,
      count: passData.count,
      searching: false,
      selectedPokemon: null,
      loading:false,
    });
  }
  handlePrevious = async () => {
    this.setState({loading:true})
    if (this.state.page > 1) {
      const previousPage = this.state.page - 1;
      const offset = (previousPage - 1) * 20;
      const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=18`;
      let gender = "";
      let data = await fetch(url);
      let passData = await data.json();
      const pokemonResults = passData.results;
      const pokemonData = [];
      for (const pokemon of pokemonResults) {
        const pokemonDataResponse = await fetch(pokemon.url);
        const pokemonDetails = await pokemonDataResponse.json();
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon-species/${pokemon.name}`
        );
        const speciesData = await response.json();
        const genderRate = speciesData.gender_rate;
        const evolutionChainUrl = speciesData.evolution_chain.url;
        const evolute = await fetch(evolutionChainUrl);
        const evo_data = await evolute.json();

        if (genderRate === 1) {
          gender = "Male";
        } else if (genderRate === 8) {
          gender = "Female";
        } else {
          gender = "Genderless";
        }
        const parts = pokemon.url.split("/");
        const pokemonId = parts[parts.length - 2];
        const imageUrl =
          pokemonDetails.sprites.other["official-artwork"].front_default;
        const paddedPokemonId = String(pokemonId).padStart(3, "0");
        const types = pokemonDetails.types.map(
          (typeData) => typeData.type.name
        );
        const abilities = pokemonDetails.abilities.map(
          (typeData) => typeData.ability.name
        );
        const egg_groups = speciesData.egg_groups.map((group) => group.name);

        pokemonData.push({
          name: pokemon.name,
          imgURL: imageUrl,
          pid: paddedPokemonId,
          types: types,
          gender: gender,

          egg_groups: egg_groups,
          abilities: abilities,
          evo_data: evo_data,
        });
      }
      this.setState({
        pokemonData: pokemonData,
        page: previousPage,
        count: passData.count,
        searching: false,
        selectedPokemon: null,
        loading:false,
      });
    }
  };
  handleNext = async () => {
    this.setState({loading:true})
    if (this.state.page < Math.ceil(this.state.count / 20)) {
      const nextPage = this.state.page + 1;
      const offset = (nextPage - 1) * 20;
      const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=18`;

      let data = await fetch(url);
      let passData = await data.json();
      const pokemonResults = passData.results;
      const pokemonData = [];
      let gender = "";
      for (const pokemon of pokemonResults) {
        const pokemonDataResponse = await fetch(pokemon.url);
        const pokemonDetails = await pokemonDataResponse.json();
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon-species/${pokemon.name}`
        );
        const speciesData = await response.json();
        const genderRate = speciesData.gender_rate;
        const evolutionChainUrl = speciesData.evolution_chain.url;
        const evolute = await fetch(evolutionChainUrl);
        const evo_data = await evolute.json();

        if (genderRate === 1) {
          gender = "Male";
        } else if (genderRate === 8) {
          gender = "Female";
        } else {
          gender = "Genderless";
        }

        const parts = pokemon.url.split("/");
        const pokemonId = parts[parts.length - 2];
        const imageUrl =
          pokemonDetails.sprites.other["official-artwork"].front_default;
        const paddedPokemonId = String(pokemonId).padStart(3, "0");
        const types = pokemonDetails.types.map(
          (typeData) => typeData.type.name
        );
        const abilities = pokemonDetails.abilities.map(
          (typeData) => typeData.ability.name
        );
        const egg_groups = speciesData.egg_groups.map((group) => group.name);
        pokemonData.push({
          name: pokemon.name,
          imgURL: imageUrl,
          pid: paddedPokemonId,
          types: types,
          gender: gender,
          egg_groups: egg_groups,
          abilities: abilities,
          evo_data: evo_data,
        });
      }

      this.setState({
        pokemonData: pokemonData,
        page: this.state.page + 1,
        count: passData.count,
        searching: false,
        selectedPokemon: null,
        loading:false,
      });
    }
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value }, () => {
      const { searchQuery, selectedType, pokemonData, selectedGender } =
        this.state;

      const filtered = pokemonData.filter((pokemon) => {
        const nameCondition =
          pokemon.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          searchQuery === "";

        const typeCondition =
          selectedType === "" ||
          (pokemon.types &&
            Array.isArray(pokemon.types) &&
            pokemon.types.includes(selectedType));
        const Gen =
          selectedGender === "" ||
          pokemon.gender.toLowerCase().includes(selectedGender.toLowerCase());

        return nameCondition && typeCondition && Gen;
      });

      this.setState({
        filterPokemon: filtered,
        searching: true,
      });
    });
  };
  handlePokemonClick = (pokemon) => {
    this.setState({ selectedPokemon: pokemon });
    console.log(this.state.selectedPokemon);
  };

  render() {
    return (
      <div className="container  py-5"  >
        <div
          className={`row ${
            this.state.selectedPokemon ? "blur-background" : ""
          }`}
        >
          <div className="col-12 col-lg-2">
            <h1
              className="display-5 fw-bold"
              style={{
                color: "#2E3156",
                fontFamily: "Roboto",
                fontSize: "30px",
                fontStyle: "normal",
                fontWeight: "700",
                lineHeight: "normal",
                letterSpacing: "1.8px",
              }}
            >
              Pokedex
            </h1>
            <hr
              className="d-lg-block position-absolute top-50 translate-middle-y"
              style={{ color: "red", left: "50%", height: "50px" }}
            />
            <hr className="d-lg-none" />
          </div>
          <div className="col-12 col-lg-10">
            <small
              className=" fs-6 fw-normal"
              style={{
                color: "#5D5F7E",
                fontFamily: "Roboto",
                fontSize: "20px",
                fontStyle: "normal",
                fontWeight: "500",
                lineHeight: "normal",
              }}
            >
              search for any pokemon that exists on planet
            </small>
          </div>
        </div>

        <div
          className={`d-flex flex-column flex-lg-row justify-content-between align-items-start align-items-lg-center ${
            this.state.selectedPokemon ? "blur-background" : ""
          }`}
          style={{ background: "#DEEDED", color: "#5D5F7E" }}
        >
          <div className="mb-3">
            <label htmlFor="search" className="form-label">
              Search by
            </label>

            <input
              type="text"
              className="form-control"
              id="search"
              placeholder="search by name"
              name="searchQuery"
              value={this.state.searchQuery}
              onChange={this.handleChange}
              style={{
                borderRadius: "8px",
                background: "#C9DDE2",
                width: "100%",
                maxWidth: "663px",
              }}
            />
          </div>
          <div className="mb-3 mx-3">
            <label htmlFor="type" className="form-label">
              Type
            </label>
            <div
              className="dropdown"
              style={{
                borderRadius: "8px",
                background: "#C9DDE2",
                width: "194px",
                height: "57px",
              }}
            >
              <button
                className="btn dropdown-toggle d-flex align-items-center py-3"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                id="type"
                style={{ border: "none", color: "#2E3156" }}
              >
                Normal+<strong>5 more</strong>
                <span className="mx-3"></span>
              </button>
              <ul
                className="dropdown-menu px-3 "
                style={{ width: "194px", color: "#2E3156" }}
              >
                <li>
                  <input
                    className="mx-2"
                    type="checkbox"
                    value="normal"
                    name="selectedType"
                    onChange={this.handleChange}
                  />
                  Normal
                  <hr className="my-1 mx-2" />
                </li>
                <li>
                  <input
                    className="mx-2"
                    type="checkbox"
                    value="fighting"
                    name="selectedType"
                    onChange={this.handleChange}
                  />
                  Fighting
                  <hr className="my-1 mx-2" />
                </li>
                <li>
                  <input
                    className="mx-2"
                    type="checkbox"
                    value="flying"
                    name="selectedType"
                    onChange={this.handleChange}
                  />
                  Flying
                  <hr className="my-1 mx-2" />
                </li>
                <li>
                  <input
                    className="mx-2"
                    type="checkbox"
                    value="poison"
                    name="selectedType"
                    onChange={this.handleChange}
                  />
                  Poison
                  <hr className="my-1 mx-2" />
                </li>
                <li>
                  <input
                    className="mx-2"
                    type="checkbox"
                    value="ground"
                    name="selectedType"
                    onChange={this.handleChange}
                  />
                  Ground
                  <hr className="my-1 mx-2" />
                </li>
                <li>
                  <input
                    className="mx-2"
                    type="checkbox"
                    value="rock"
                    name="selectedType"
                    onChange={this.handleChange}
                  />
                  Rock
                  <hr className="my-1 mx-2" />
                </li>
                <li>
                  <input
                    className="mx-2"
                    type="checkbox"
                    value=""
                    name="selectedType"
                    onChange={this.handleChange}
                  />
                  Clear
                  <hr className="my-1 mx-2" />
                </li>
              </ul>
            </div>
          </div>
          <div className="mb-3 mx-3">
            <label htmlFor="gender" className="form-label">
              Gender
            </label>
            <div
              className="dropdown"
              style={{
                borderRadius: "8px",
                background: "#C9DDE2",
                width: "194px",
                height: "57px",
              }}
            >
              <button
                className="btn dropdown-toggle d-flex align-items-center py-3"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                id="gender"
                style={{ border: "none", color: "#2E3156" }}
              >
                Male+<strong>2 more</strong>
                <span className="mx-3"></span>
              </button>
              <ul
                className="dropdown-menu"
                style={{ width: "194px", color: "#2E3156" }}
              >
                <li>
                  <input
                    className="mx-2"
                    type="checkbox"
                    name="selectedGender"
                    value="male"
                    onChange={this.handleChange}
                  />
                  Male
                  <hr className="my-1 mx-2" />
                </li>
                <li>
                  <input
                    className="mx-2"
                    type="checkbox"
                    name="selectedGender"
                    value="female"
                    onChange={this.handleChange}
                  />
                  Female
                  <hr className="my-1 mx-2" />
                </li>
                <li>
                  <input
                    className="mx-2"
                    type="checkbox"
                    name="selectedGender"
                    value="genderless"
                    onChange={this.handleChange}
                  />
                  Other
                  <hr className="my-1 mx-2" />
                </li>
              </ul>
            </div>
          </div>
          <div className="mb-3 mx-3 ">
            <label htmlFor="stats" className="form-label">
              Stats
            </label>
            <div
              className="dropdown"
              style={{
                borderRadius: "8px",
                background: "#C9DDE2",
                width: "194px",
                height: "57px",
              }}
            >
              <button
                className="btn dropdown-toggle d-flex align-items-center py-3"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                id="stats"
                style={{ border: "none", color: "#2E3156" }}
              >
                HP+<strong>5 more</strong>
                <span className="mx-3"></span>
              </button>
              <ul
                className="dropdown-menu"
                style={{ width: "669px", height: "469px", color: "#2E3156" }}
              >
                <h2 className="mx-4 my-2  " style={{ marginBottom: "5%" }}>
                  Select Stats
                </h2>

                <li className="mx-4 my-4">
                  <small style={{ marginRight: "140px" }}>HP</small>
                  <div
                    className="container my-1 mx-5"
                    style={{
                      width: "438px",
                      height: " 31px",
                      borderRadius: "8px",
                      border: " 1px solid #2E3156",
                      background: " #F1F3F3",
                      position: "absolute",
                      top: "16%",
                      left: "20%",
                    }}
                  ></div>
                </li>
                <li className="mx-4 my-4">
                  <small style={{ marginRight: "140px" }}>Attack</small>
                  <div
                    className="container my-1 mx-5"
                    style={{
                      width: "438px",
                      height: " 31px",
                      borderRadius: "8px",
                      border: " 1px solid #2E3156",
                      background: " #F1F3F3",
                      position: "absolute",
                      top: "26%",
                      left: "20%",
                    }}
                  >
                    0
                    <input type="range" />
                    210
                  </div>
                </li>
                <li className="mx-4 my-4">
                  <small style={{ marginRight: "140px" }}>Defense</small>
                  <div
                    className="container my-1 mx-5"
                    style={{
                      width: "438px",
                      height: " 31px",
                      borderRadius: "8px",
                      border: " 1px solid #2E3156",
                      background: " #F1F3F3",
                      position: "absolute",
                      top: "36%",
                      left: "20%",
                    }}
                  >
                    0
                    <input type="range" />
                    210
                  </div>
                </li>
                <li className="mx-4 my-4">
                  <small style={{ marginRight: "140px" }}>Speed</small>
                  <div
                    className="container my-1 mx-5"
                    style={{
                      width: "438px",
                      height: " 31px",
                      borderRadius: "8px",
                      border: " 1px solid #2E3156",
                      background: " #F1F3F3",
                      position: "absolute",
                      top: "46%",
                      left: "20%",
                    }}
                  >
                    0
                    <input type="range" />
                    210
                  </div>
                </li>
                <li className="mx-4 my-4">
                  <small style={{ marginRight: "140px" }}>Sp.Attack</small>
                  <div
                    className="container my-1 mx-5"
                    style={{
                      width: "438px",
                      height: " 31px",
                      borderRadius: "8px",
                      border: " 1px solid #2E3156",
                      background: " #F1F3F3",
                      position: "absolute",
                      top: "56%",
                      left: "20%",
                    }}
                  >
                    0
                    <input type="range" />
                    210
                  </div>
                </li>
                <li className="mx-4 my-4">
                  <small style={{ marginRight: "140px" }}>Sp.Def</small>
                  <div
                    className="container my-1 mx-5"
                    style={{
                      width: "438px",
                      height: " 31px",
                      borderRadius: "8px",
                      border: " 1px solid #2E3156",
                      background: " #F1F3F3",
                      position: "absolute",
                      top: "66%",
                      left: "20%",
                    }}
                  >
                    0
                    <input type="range" />
                    210
                  </div>
                </li>
                <div className="container d-flex justify-content-end">
                  <button
                    style={{
                      borderRadius: "8px",
                      borderColor: "#2E3156",
                      color: "#2E3156",
                    }}
                    className="btn "
                  >
                    Reset
                  </button>
                  <button
                    style={{
                      borderRadius: "8px",
                      borderColor: "#2E3156",
                      backgroundColor: "#2E3156",
                      color: "white",
                    }}
                    className="btn mx-4"
                  >
                    Apply
                  </button>
                </div>
              </ul>
            </div>
          </div>
        </div>

        <div
          className={`row d-flex ${
            this.state.selectedPokemon ? "blur-background" : ""
          }`} 
        >
          {/* {this.state.searching
            ? this.state.filterPokemon.map((element) => {
                return (
                  <div
                    className="col-lg-2 col-md-3 col-sm-5 mb-4"
                    key={element.url}
                  >
                    <Poke
                      name={element.name ? element.name : ""}
                      imgURL={element.imgURL}
                      pid={element.pid}
                      types={element.types}
                      gender={element.gender}
                      onClick={() => this.handlePokemonClick(element)}
                      stats={element.stats}
                    />
                  </div>
                );
              })
            : this.state.pokemonData.map((element) => {
                return (
                  <div
                    className="col-lg-2 col-md-3 col-sm-5 mb-4"
                    key={element.pid}
                  >
                    <Poke
                      name={element.name ? element.name : ""}
                      imgURL={element.imgURL}
                      pid={element.pid}
                      types={element.types}
                      gender={element.gender}
                      onClick={() => this.handlePokemonClick(element)}
                    />
                  </div>
                );
              })} */}
          {this.state.loading ? (
            // Render a loader component or a loading message
            <Spinner/>
          ) : this.state.searching ? (
            this.state.filterPokemon.map((element) => {
              return (
                <div
                  className="col-lg-2 col-md-3 col-sm-5 mb-4"
                  key={element.url}
                >
                  <Poke
                    name={element.name ? element.name : ""}
                    imgURL={element.imgURL}
                    pid={element.pid}
                    types={element.types}
                    gender={element.gender}
                    onClick={() => this.handlePokemonClick(element)}
                    stats={element.stats}
                  />
                </div>
              );
            })
          ) : (
            this.state.pokemonData.map((element) => {
              return (
                <div
                  className="col-lg-2 col-md-3 col-sm-5 mb-4"
                  key={element.pid}
                >
                  <Poke
                    name={element.name ? element.name : ""}
                    imgURL={element.imgURL}
                    pid={element.pid}
                    types={element.types}
                    gender={element.gender}
                    onClick={() => this.handlePokemonClick(element)}
                  />
                </div>
              );
            })
          )}
        </div>

        {this.state.selectedPokemon && (
          <Details
            pid={this.state.selectedPokemon.pid}
            name={this.state.selectedPokemon.name}
            imgURL={this.state.selectedPokemon.imgURL}
            types={this.state.selectedPokemon.types}
            gender={this.state.selectedPokemon.gender}
            egg_groups={this.state.selectedPokemon.egg_groups}
            abilities={this.state.selectedPokemon.abilities}
            evo_data={this.state.selectedPokemon.evo_data}
            onClose={() => this.setState({ selectedPokemon: null })}
          />
        )}

        <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            className="btn btn-primary"
            onClick={this.handlePrevious}
          >
            Previous
          </button>
          <button
            disabled={this.state.page + 1 > Math.ceil(this.state.count / 20)}
            className="btn btn-primary"
            onClick={this.handleNext}
          >
            Next
          </button>
        </div>
      </div>
    );
  }
}

export default Pokemon;
