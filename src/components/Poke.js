import React, { Component } from "react";

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

export class Poke extends Component {
  render() {
    let { name, imgURL, pid,types,onClick } = this.props;
    let type1=types[0];
    let type2=types[1];
    
    return (
      //   <div className="my-3 d-flex justify-content-between "style={{border:'1px solid black'}}>
      <div
        className="card mycard"
        onClick={onClick}
        key={pid}
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
        
        <img src={imgURL} className="card-img-top" alt="..." />
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
            {name}
            
            {/* {typeColor[type1]} */}
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
            {pid}
            {/* {type1} */}
            {/* {type2} */}
          </p>
        </div>
      </div>
      //   </div>
    );
  }
}

export default Poke;
