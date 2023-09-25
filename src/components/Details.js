import React, { Component } from "react";
import Poke from "./Poke";

import YourComponent from "./Popover";

const typeColor = {
  normal: "#DDCBD0",
  fighting: "#FCC1B0",
  flying: "#B2D2E8",
  poison: "#CFB7ED",
  ground: "#F401A6",
  rock: "#C5AEA8",
  bug: "#C1E0C8",
  ghost: "#D7C2D7",
  fire: "#EDC2C4",
  water: "#CBD5ED",
  grass: "#C0D4C8",
  electric: "#E2E2A0",
  psychic: "#DDC0CF",
  ice: "#C7D7DF",
  dragon: "#CADCDF",
};

export class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: "",
      weight: "",
      damage: [],
      evolution: [],
      description: [],
      fullText: [],
      currentPokemonIndex: parseInt(this.props.pid, 10),
      pokemonStats: [],
    };
  }

  async componentDidMount() {
    const originalId = parseInt(this.props.pid, 10);
    // const originalId = this.state.currentPokemonIndex;
    const url = `https://pokeapi.co/api/v2/pokemon/${originalId}`;
    const weak_url = `https://pokeapi.co/api/v2/type/${originalId}`;
    const species_url = `https://pokeapi.co/api/v2/pokemon-species/${originalId}`;
    let raw_s = await fetch(species_url);
    let species = await raw_s.json();
    let data = await fetch(url);
    let passData = await data.json();
    let damages = await fetch(weak_url);
    let weak = await damages.json();
    const height = passData.height;
    const weight = passData.weight;
    const damage = weak.damage_relations.double_damage_from.map(
      (type) => type.name
    );
    if (passData.stats && passData.stats.length > 0) {
      const stats = passData.stats.map((stat) => ({
        name: stat.stat.name,
        value: stat.base_stat,
      }));
      console.log(stats);
      this.setState({ pokemonStats: stats });
    }

    const removeDuplicates = (arr) => {
      let regExFlavorTexts = arr.map((text) =>
        text
          .toLowerCase()
          .replace(/[^\x00-\x7F]/g, "")
          .replace(/[\n|\f|\s]/g, "")
      );
      let unique = [];
      let newarr = regExFlavorTexts.filter((item, index) => {
        if (regExFlavorTexts.indexOf(item) === index) unique.push(arr[index]);
        return regExFlavorTexts.indexOf(item) === index;
      });
      return unique;
    };

    const formatFlavorText = (text) => {
      text = text.join(" ").replaceAll("\f", " ");
      return text;
    };
    if (species) {
      const flavorTexts = species.flavor_text_entries.filter(
        (textObj) => textObj.language.name === "en"
      );

      const uniqueFlavorTexts = removeDuplicates(
        flavorTexts.map((textObj) => textObj.flavor_text)
      );

      const formattedFlavorTexts = formatFlavorText(uniqueFlavorTexts);

      const short =
        formattedFlavorTexts.length > 420
          ? formattedFlavorTexts.slice(0, 420 - 1) + "... "
          : formattedFlavorTexts;
      const pokemonInfo = {
        flavorTexts: short,
      };
      if (pokemonInfo) {
        this.setState({ description: short, fullText: formattedFlavorTexts });
      }
      console.log(pokemonInfo.flavorTexts);
    }
    const speciesNames = [];
    const evolution = this.props.evo_data.chain;
    let chain = evolution;
    console.log(originalId);
    while (chain) {
      const speciesName = chain.species.name;
      const parts = chain.species.url.split("/");
      const pokemonId = parts[parts.length - 2];
      const paddedPokemonId = String(pokemonId).padStart(3, "0");
      const url = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;
      let data = await fetch(url);
      let passData = await data.json();
      const imgURL = passData.sprites.other["official-artwork"].front_default;
      speciesNames.push({
        name: speciesName,
        url: chain.species.url,
        pid: paddedPokemonId,
        imgURL: imgURL,
      });

      if (
        chain.evolves_to &&
        Array.isArray(chain.evolves_to) &&
        chain.evolves_to.length > 0
      ) {
        chain = chain.evolves_to[0];
      } else {
        chain = null;
      }
    }

    this.setState({ evolution: speciesNames });
    this.setState({
      height: height,
      weight: weight,
      damage: damage,
    });
  }

  render() {
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    const {
      pid,
      onClose,
      name,
      imgURL,
      types,
      gender,
      egg_groups,
      abilities,
      evo_data,
    } = this.props;
    let Name = this.props.name.toUpperCase();
    let egg_group = egg_groups.join(",");
    let type1 = types[0];
    let type2 = types[1] ? types[1] : null;

    const abilitiesString = abilities.join(",");
    const formatStatText = (str) => {
      str = str.replace("special-", "Sp. ");
      if (str.includes("Sp.")) str = str.replace("defense", "Def.");
      str = str.replace("attack", "Attack");
      return camelCase(str);
    };
    const camelCase = (str) => {
      return str.charAt(0).toUpperCase() + str.slice(1);
    };
    const damageBoxes = this.state.damage.map((type, index) => (
      <div
        key={index}
        className="damage-box"
        style={{
          width: "60px",
          height: "24px",
          borderRadius: "5px",
          border: "1px solid #2E3156",
          background: typeColor[type],
          marginRight: "3%",
        }}
      >
        <b>{type}</b>
      </div>
    ));
    return (
      <div
        className="container my-cont "
        key={pid}
        style={{
          background: "#DEEDED",
          padding: "3%",
          borderRadius: "8px",
          border: "1px solid black",
          marginLeft: "2%",
        }}
      >
        <Poke
          name={name ? name : ""}
          imgURL={imgURL}
          pid={pid}
          types={types}
          gender={gender}
        />
        <h1
          style={{
            position: "absolute",
            top: "3%",
            left: "37%",
            fontSize: "35px",
          }}
        >
          {Name}&nbsp;&nbsp;|&nbsp;&nbsp;{pid}&nbsp;&nbsp;|
        </h1>
        <div
          className="container d-flex"
          style={{
            position: "absolute",
            top: "4%",
            left: "82%",
            fontSize: "10px",
          }}
        >
          <button
            className="btn  btn-sm mx-1"
            style={{
              borderRadius: "50%",
              border: "1px solid black",
            }}
            onClick={this.goToPreviousPokemon}
          >
            <i className="bi bi-arrow-left"></i>
          </button>
          <button
            className="btn  btn-sm mx-1"
            style={{
              borderRadius: "50%",
              border: "1px solid black",
            }}
            onClick={onClose}
          >
            <i className="bi bi-x-lg"></i>
          </button>
          <button
            className="btn  btn-sm"
            style={{
              borderRadius: "50%",
              border: "1px solid black",
            }}
            onClick={this.goToNextPokemon}
          >
            <i className="bi bi-arrow-right"></i>
          </button>
        </div>
        <p
          className="mx-5"
          style={{ position: "absolute", left: "30%", top: "10%" }}
        >
          {this.state.description}
          {this.state.description.length > 420 ? (
            <YourComponent text={this.state.fullText} />
          ) : (
            this.state.description
          )}
        </p>

        <div className="container" style={{ marginTop: "7%" }}>
          <div className="row">
            <div className="col">
              <b>Height</b>
              <p>{this.state.height}</p>
            </div>
            <div className="col">
              <b>Weight</b>
              <p>{this.state.weight}</p>
            </div>
            <div className="col">
              <b>Gender(s)</b>
              <p>{gender}</p>
            </div>
            <div className="col">
              <b>Egg-Groups</b>
              <p>{egg_group}</p>
            </div>
          </div>
        </div>
        <div className="container" style={{ marginTop: "3%" }}>
          <div className="row">
            <div className="col">
              <b>Abilities</b>
              <p>{abilitiesString}</p>
            </div>
            <div className="col">
              <b>Types</b>
              <div className="d-flex">
                <div
                  className="mr-2"
                  style={{
                    width: "55px",
                    height: "24px",
                    borderRadius: "5px",
                    border: "1px solid #2E3156",
                    background: typeColor[type1],
                    marginRight: "3%",
                    padding: "1%",
                  }}
                >
                  {type1}
                </div>
                {type2 && (
                  <div
                    style={{
                      width: "55px",
                      height: "24px",
                      borderRadius: "5px",
                      border: "1px solid #2E3156",
                      background: typeColor[type2],
                    }}
                  >
                    {type2}
                  </div>
                )}
              </div>
            </div>
            <div className="col">
              <b>Weak Against</b>
              <div className="d-flex">{damageBoxes}</div>
            </div>
          </div>
        </div>
        <div
          className="container stats"
          style={{
            background: "#B0D2D2",
            borderRadius: "8px",
            width: "675px",
            height: "165px",
            padding: "3%",
            marginTop: "7%",
          }}
        >
          <div className="container ">
            <div className="row" style={{ justifyContent: "flex-start" }}>
              <h5>Stats</h5>
              {this.state.pokemonStats.map((stat) => (
                <div
                  key={stat.name}
                  className="col-md-6 d-flex align-items-center"
                >
                  <div>{formatStatText(stat.name)}</div>
                  <div
                    style={{
                      background: "#2E3156",
                      height: "13px",
                      width: stat.value > 100 ? "100%" : `${stat.value}%`,
                      marginLeft: "2.2rem",
                      color: "white",
                      fontSize: "10px",
                    }}
                  >
                    {stat.value}
                  </div>
                  <div 
                    style={{
                      width: "200px",
                      height: "13px",
                      background: "#93B2B2",
                      maxWidth: "100%",
                    }}
                  ></div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="container " style={{ marginTop: "13%" }}>
          <h4>Evolution chain</h4>
          <div className="container d-flex justify-content-between ">
            {this.state.evolution.map((pokemon, index) => (
              <div
                className="card mycard mx-3"
                key={pokemon.pid}
                style={{
                  width: "194px",
                  height: "277px",
                  borderRadius: "8px",
                  border: "1px dashed #2E3156",
                  background: type2
                    ? `linear-gradient(180deg, ${typeColor[type1]} 0%, ${typeColor[type2]} 100%)`
                    : typeColor[type1],
                }}
              >
                <img src={pokemon.imgURL} className="card-img-top" alt="..." />
                <div className="card-body">
                  <h5
                    className="card-title"
                    style={{
                      color: "#2E3156",
                      textAlign: "center",
                      fontFamily: "Roboto",
                      fontSize: "20px",
                      fontStyle: "normal",
                      fontWeight: "600",
                      lineHeight: "normal",
                    }}
                  >
                    {pokemon.name}
                  </h5>
                  <p
                    className="card-text"
                    style={{
                      color: "#2E3156",
                      textAlign: "center",
                      fontFamily: "Roboto",
                      fontSize: "20px",
                      fontStyle: "normal",
                      fontWeight: 400,
                      lineHeight: "normal",
                    }}
                  >
                    {pokemon.pid}
                  </p>
                </div>
                {index < this.state.evolution.length - 1 && (
                  <i
                    className="bi bi-arrow-right"
                    style={{
                      fontSize: "24px",
                      position: "absolute",
                      left: "100%",
                      padding: "2%",
                      top: "40%",
                    }}
                  ></i>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Details;
