import React from "react";
import { Card } from "./Card";
import { useState, useEffect } from "react";
import {
  fetchPokemonsData,
  fetchData,
  comparePokemons,
  fetchTypesData,
} from "../../functions/utils";
import VSLogo from "../../img/vs.png";

import ButtonComponent from "../ButtonComponent/ButtonComponent";

const CardsContainer = ({
  handleChangeRoundClick,
  handleChangeUserPoints,
  handleChangeGameHearts,
}) => {
  const [allPokemons, setAllPokemons] = useState([]);
  const [allTypes, setAllTypes] = useState({});
  const [pokemon1, setPokemon1] = useState({});
  const [pokemon2, setPokemon2] = useState({});
  const [style, setStyle] = useState({ visibility: "hidden" });
  const [buttonsStyle, setButtonsStyle] = useState({ visibility: "visible" });
  useEffect(() => {
    fetchTypesData().then((types) => setAllTypes(types));
    fetchPokemonsData().then((res) => {
      setAllPokemons(res.results);
    });
  }, []);

  const setRandomPokemons = () => {
    fetchData(
      allPokemons[Math.trunc(Math.random() * allPokemons.length)].url
    ).then((pokemon1Data) => setPokemon1(pokemon1Data));
    fetchData(
      allPokemons[Math.trunc(Math.random() * allPokemons.length)].url
    ).then((pokemon2Data) => setPokemon2(pokemon2Data));
  };
  useEffect(() => {
    if (allPokemons.length > 0) {
      setRandomPokemons();
    }
  }, [allPokemons]);

  const handleClickUserDecicision = (userPrediction) => {
    const { prediction } = comparePokemons(
      pokemon1,
      pokemon2,
      allTypes,
      userPrediction
    );
    setStyle({ visibility: "visible" });
    setButtonsStyle({ visibility: "hidden" });
    if (prediction === false) handleChangeGameHearts();
    else if (prediction === true) {
      handleChangeUserPoints();
    }
    setTimeout(() => handleChangeRoundClick(), 1000);
  };

  return (
    <div className="battleground container">
      <div className="button-interaction" style={buttonsStyle}>
        <ButtonComponent
          text={"WIN"}
          onClick={() => handleClickUserDecicision("leftWin")}
          style={{ color: "#00ff03" }}
        />

        <ButtonComponent
          text={"LOSE"}
          onClick={() => handleClickUserDecicision("leftLoose")}
          style={{ color: "red" }}
        />

        <ButtonComponent
          text={"DRAW"}
          onClick={() => handleClickUserDecicision("draw")}
          style={{ color: "yellow" }}
        />
      </div>

      <div
        onContextMenu={(e) => e.preventDefault()}
        className="cards-container"
      >
        {Object.keys(pokemon1).length > 0 && (
          <Card pokemon={pokemon1} key={pokemon1.id} style={style} />
        )}
        {}
        <div className="battleground versus">
          <img src={VSLogo} />
        </div>
        {Object.keys(pokemon2).length > 0 && (
          <Card pokemon={pokemon2} key={pokemon2.id} style={style} />
        )}
      </div>
    </div>
  );
};
export default CardsContainer;
