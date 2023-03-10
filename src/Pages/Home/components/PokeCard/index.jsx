import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import { Link } from "react-router-dom";

function PokeCard({ name, url, id }) {
  /* ----------------------------- estados do PokeCard ---------------------------- */
  const [sprite, setsprite] = useState();
  const [types, settypes] = useState([]);
  const [result, setresult] = useState();

  /* ----------------------------- Component Did Mount ---------------------------- */
  useState(() => {
    GetSprite();
  }, []);
  /* ------------------------ function get request sprite ------------------------- */
  async function GetSprite() {
    let result = await fetch(url);
    let resultadoconvertido = await result.json();
    let sprite = await resultadoconvertido.sprites.other["official-artwork"]
      .front_default;
    let types = gettypes(resultadoconvertido);
    settypes(types);
    setsprite(sprite);
    setresult(resultadoconvertido);
    //console.log("getsprite usado");
  }
  /* -------------------------------- get types ------------------------------- */
  function gettypes(dados) {
    let types = [];
    let arr = dados.types;

    arr.forEach((e) => {
      types.push(e.type.name);
    });

    return types;
  }

  /* ---------------------------- retorno html jsx ---------------------------- */
  return (
    <div className={`rounded estilocard ${types[0]} border`}>
      <div className="rounded fundoescuro">
        <div className={`rounded wallcard ${types[0]} color`}>
          <Link to={`/pokemon/${id}`} state={result} sprite={sprite}>
            {" "}
            <img className="pngcard" src={sprite} alt={name} />
          </Link>
        </div>
      </div>
      <h1 className="h1card text-capitalize">{name}</h1>
      {/* ------------------------------ box dos tipos ----------------------------- */}
      <div className="text-uppercase gaptype d-flex justify-content-center">
        {types.map((t, index) => (
          <div key={t} className="rounded typeescuro">
            <div className={`rounded estilotype ${t} ${index} color`} key={t}>
              {t}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default PokeCard;
