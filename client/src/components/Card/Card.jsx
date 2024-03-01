import React from "react";
import style from "./Card.module.css";

function Card(props) {
  // Función para obtener el array de temperamentos
  const getTemperamentsArray = () => {
    let arrayTemp = [];

    if (props.temperament) {
      if (Array.isArray(props.temperament)) {
        // Si es un array de objetos, extraer los nombres
        arrayTemp = props.temperament.map((temp) => temp.name).slice(0, 3);
      } else if (typeof props.temperament === "object") {
        // Si es un objeto, extraer los nombres
        arrayTemp = Object.values(props.temperament)
          .map((temp) => temp.name)
          .slice(0, 3);
      } else {
        // Si es una cadena de texto, dividirla por comas
        arrayTemp = props.temperament.split(",").slice(0, 3);
      }
    }

    return arrayTemp;
  };

  const temperaments = getTemperamentsArray();

  return (
    <div
      className={style.cardContainer}
      onClick={() => props.onClick(props.id)}
    >
      <div>
        <img src={props.image} alt={props.name} className={style.imgs} />
        <div className={style.text}>
          <div className={style.texth2}>
            <h2>{props.name}</h2>
          </div>
          {temperaments.length > 0 && (
            <div className={style.temperamentsContainer}>
              {temperaments.map((temp, index) => (
                <div key={index} className={style.temperamentItem}>
                  {temp}
                </div>
              ))}
            </div>
          )}
        </div>
        <div>
          <h2 className={style.weight}>Weight: {props.weight || "NaN"}Kg</h2>
        </div>
      </div>
    </div>
  );
}

export default Card;

// const normalizedTemps = props.temperament.map((temp) =>
// typeof temp === "string" ? { name: temp } : temp
// );
// const tempsNames = normalizedTemps.map((temp) => temp.name).join(" && ");
// };
