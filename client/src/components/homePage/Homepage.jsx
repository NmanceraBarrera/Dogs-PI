import React from "react";
import style from "../homePage/Homepage.module.css";
import SearchBar from "../SearchBar/SearchBar";

export default function Homepage(onClick) {
  return (
    <div className={style.bg}>
      Homepage
      <SearchBar />
    </div>
  );
}
