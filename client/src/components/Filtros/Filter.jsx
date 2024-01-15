import React, { useState } from "react";
import style from "./filter.module.css";
import axios from "axios";

function Filter({ temps, filterDogsByTemp }) {
  const tFiltrados = temps.tFinal;
  const [selectedTemp, setSelectedTemp] = useState("");

  const handleChange = (event) => {
    setSelectedTemp(event.target.value);
    if (event.target.value !== "") {
      filterDogsByTemp(event.target.value);
    }
  };

  return (
    <div className={style.bg}>
      <select onChange={handleChange}>
        <option value="">Temperaments</option>
        {tFiltrados?.map((temp, index) => (
          <option key={index} value={temp}>
            {temp}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Filter;
