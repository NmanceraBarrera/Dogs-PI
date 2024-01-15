import React from "react";
import Card from "../Card/Card";
import style from "../Cards/Cards.module.css";
import Pagination from "../Paginado/Pages";
// import Detail from "../detail/Detail";
// import Detail from "../detail/Detail";

function Cards({ myDogs, onClick, allDogs, paginate }) {
  console.log(allDogs, "este es allDogs");
  return (
    <div className={style.Cards}>
      {allDogs?.length > 0
        ? allDogs.map((dog) => (
            <Card
              key={dog.id}
              id={dog.id}
              weight={dog.weight}
              height={dog.height}
              name={dog.name}
              bred_for={dog.bred_for}
              breed_group={dog.breed_group}
              life_span={dog.life_span}
              temperament={dog.temperament}
              origin={dog.origin}
              image={dog.image}
              onClick={onClick}
            />
          ))
        : myDogs.map((dog) => (
            <Card
              key={dog.id}
              id={dog.id}
              weight={dog.weight}
              height={dog.height}
              name={dog.name}
              bred_for={dog.bred_for}
              breed_group={dog.breed_group}
              life_span={dog.life_span}
              temperament={dog.temperament}
              origin={dog.origin}
              image={dog.image}
              onClick={onClick}
            />
          ))}
      <Pagination paginate={paginate} />
      {/* <Detail {...myDogs} /> */}
    </div>
  );
}

export default Cards;
