import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import style from "./serchbar.module.css";
import { searchDogByName } from "../../redux/action";
import { useDispatch } from "react-redux";

function SearchBar({ onSearch }) {
  const dispatch = useDispatch();
  const [searchResults, setSearchResults] = useState("");
  const searchTrim = searchResults.trim();

  const onSubmit = (event) => {
    event.preventDefault();
    if (searchTrim === "") {
      window.alert("Ingrese un valor al input");
    } else {
      onSearch(searchTrim);
    }
  };

  const handleSearch = () => {
    dispatch(searchDogByName(searchTrim));
  };

  return (
    <div className={style.containerSearchBar}>
      <form onSubmit={onSubmit}>
        <input
          className={style.input}
          value={searchResults}
          onChange={(e) => setSearchResults(e.target.value)}
          placeholder="Buscar perro"
        />
        <button className={style.search} type="submit" onClick={handleSearch}>
          <FaSearch />
        </button>
      </form>
    </div>
  );
}

export default SearchBar;
