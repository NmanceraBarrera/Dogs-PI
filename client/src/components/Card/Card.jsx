import React from "react";
import style from "./Card.module.css";

function Card(props) {
  const temperaments = props.temperament
    ? props.temperament.split(",").slice(0, 3)
    : [];

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
          <h2 className={style.weight}>
            Weight: {props.weight?.metric || "N/A"}Kg
          </h2>
        </div>
      </div>
    </div>
  );
}

export default Card;
