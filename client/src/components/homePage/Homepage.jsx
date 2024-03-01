// Homepage.jsx
import React, { useState } from "react";
import style from "../homePage/Homepage.module.css";
import Cards from "../Cards/Cards";
import Pagination from "../Paginado/Pages";
import Nav from "../Navbar/Nav";
import { useSelector } from "react-redux"; // Importa useSelector
import Filter from "../Filtros/Filter";

export default function Homepage({
  onClick,
  allDogs,
  onSearch,
  temps,
  filterDogsByTemp,
}) {
  const myDogs = useSelector((state) => state.myDogs); // Utiliza useSelector para acceder al estado
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  console.log(allDogs, "alldogs");
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentDogs = myDogs.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className={style.bg}>
      <Cards
        myDogs={myDogs}
        onClick={onClick}
        allDogs={currentDogs}
        paginate={paginate}
      />
      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={myDogs.length}
        paginate={paginate}
      />
    </div>
  );
}
