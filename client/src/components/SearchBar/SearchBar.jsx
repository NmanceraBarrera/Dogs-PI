// SearchBar.jsx
import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import style from "./serchbar.module.css";

function SearchBar({ onSearch }) {
  const [searchResults, setSearchResults] = useState("");
  const searchTrim = searchResults.trim();

  const onSubmit = (event) => {
    event.preventDefault();
    if (searchTrim === "") {
      window.alert("Ingrese un valor a input");
    } else {
      onSearch(searchTrim);
    }
  };

  // useEffect(() => {
  //   if (searchTrim !== "") {
  //     onSearch(searchTrim);
  //   }
  // }, [searchTrim, onSearch]);

  const handleChange = (event) => {
    const { value } = event.target;
    setSearchResults(value);
    if (value === "") {
      // Si el valor es vacío, restaurar el estado inicial
      onSearch(""); // Puedes ajustar el valor pasado según tus necesidades
    }
  };

  return (
    <div className={style.containerSearchBar}>
      <form onSubmit={onSubmit}>
        <input
          className={style.input}
          value={searchResults}
          onChange={handleChange}
          placeholder="Buscar perro"
        />

        <button className={style.search} type="submit">
          <FaSearch />
        </button>
      </form>
    </div>
  );
}

export default SearchBar;
