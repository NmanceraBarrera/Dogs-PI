import React from "react";
import SearchBar from "../SearchBar/SearchBar";
import style from "./Nav.module.css";
import Filter from "../Filtros/Filter";
import Order from "../Ordenamiento/Order";
import { NavLink } from "react-router-dom";

function Nav({ myDogs, onSearch, temps, filterDogsByTemp }) {
  return (
    <div className={style.nav}>
      <img
        src={
          "https://res.cloudinary.com/dzpqgjczu/image/upload/v1709333874/nvedsrxu1tddyl1k6wq3.png"
        }
        alt="Perritoacostado"
        className={style.img}
      />

      <NavLink to="/createdog">
        <button className={style.button}>Create Dog</button>
      </NavLink>

      <Order />
      <SearchBar myDogs={myDogs} onSearch={onSearch} />
      <Filter temps={temps} filterDogsByTemp={filterDogsByTemp} />
    </div>
  );
}

export default Nav;
