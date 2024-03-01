// import React from "react";
// import Card from "../Card/Card";
// import style from "../Cards/Cards.module.css";
// import Pagination from "../Paginado/Pages";
// // import Detail from "../detail/Detail";
// // import Detail from "../detail/Detail";

// function Cards({ myDogs, onClick, allDogs, paginate }) {
//   console.log(allDogs, "este es allDogs");
//   return (
//     <div className={style.Cards}>
//       {allDogs?.length > 0
//         ? allDogs.map((dog) => (
//             <Card
//               key={dog.id}
//               id={dog.id}
//               weight={dog.weight}
//               height={dog.height}
//               name={dog.name}
//               bred_for={dog.bred_for}
//               breed_group={dog.breed_group}
//               life_span={dog.life_span}
//               temperament={dog.temperament}
//               origin={dog.origin}
//               image={dog.image}
//               source={dog.source} // Agrega una propiedad 'source' que indica la fuente
//               onClick={onClick}
//             />
//           ))
//         : myDogs.map((dog) => (
//             <Card
//               key={dog.id}
//               id={dog.id}
//               weight={dog.weight}
//               height={dog.height}
//               name={dog.name}
//               bred_for={dog.bred_for}
//               breed_group={dog.breed_group}
//               life_span={dog.life_span}
//               temperament={dog.temperament}
//               origin={dog.origin}
//               image={dog.image}
//               source="DB" // Agrega una propiedad 'source' que indica la fuente
//               onClick={onClick}
//             />
//           ))}
//       <Pagination paginate={paginate} />
//     </div>
//   );
// }
// export default Cards;

import React from "react";
import Card from "../Card/Card";
import style from "../Cards/Cards.module.css";
import Pagination from "../Paginado/Pages";
// import Detail from "../detail/Detail";
// import Detail from "../detail/Detail";

function Cards({ myDogs, onClick, allDogs, paginate }) {
  function getTemperament(dog) {
    if (dog.temperament) {
      return dog.temperament;
    } else if (dog.Temperaments && Array.isArray(dog.Temperaments)) {
      // Si Temperaments es un array de objetos, extraer solo los nombres
      return dog.Temperaments.map((temp) => temp.name).join(", ");
    } else {
      return "";
    }
  }
  console.log(allDogs, "este es allDogs");
  return (
    <div className={style.Cards}>
      {(allDogs || myDogs).map((dog) => (
        <Card
          key={dog.id || dog._id}
          id={dog.id || dog._id}
          weight={dog.weight}
          height={
            dog.height || (dog.life_span && dog.life_span.split(" - ")[1])
          }
          name={dog.name}
          bred_for={dog.bred_for}
          breed_group={dog.breed_group}
          life_span={dog.life_span}
          temperament={getTemperament(dog)}
          origin={dog.origin}
          image={dog.image || dog.url} // Ajusta según la propiedad correcta que contenga la imagen
          source={dog.source || "DB"}
          onClick={onClick}
        />
      ))}
      <Pagination paginate={paginate} />
    </div>
  );
}

// Función auxiliar para obtener el temperamento según la estructura de los datos

export default Cards;
