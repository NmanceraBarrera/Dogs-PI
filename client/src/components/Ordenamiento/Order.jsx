import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  orderDog,
  orderDogByWeigth,
  filterDogByAPIDB,
} from "../../redux/action";
function Order() {
  const dispatch = useDispatch();
  const [orderType, setOrderType] = useState("A");
  const [weigthOrderType, setWeigthOrderType] = useState("WEIGTH ⬇");
  const [apiDbFilter, setApiDbFilter] = useState("All");
  console.log(apiDbFilter, "esto es apidbfilter");

  const handleOrderChange = (e) => {
    setOrderType(e.target.value);
    dispatch(orderDog(e.target.value));
  };

  const handleWeigthOrderChange = (e) => {
    setWeigthOrderType(e.target.value);
    dispatch(orderDogByWeigth(e.target.value));
  };

  const handleApiDbFilterChange = (e) => {
    setApiDbFilter(e.target.value);
    dispatch(filterDogByAPIDB(e.target.value));
  };

  return (
    <div>
      <select value={orderType} onChange={handleOrderChange}>
        <option value="Alphabetic Order" placeholder="Alphabetic Order">
          Alphabetic Order
        </option>
        <option value="A">Ascending</option>
        <option value="D">Descending</option>
      </select>

      <select value={weigthOrderType} onChange={handleWeigthOrderChange}>
        <option value="WEIGTH ⬇">Weight Descending</option>
        <option value="WEIGTH ⬆">Weight Ascending</option>
      </select>

      <select value={apiDbFilter} onChange={handleApiDbFilterChange}>
        <option value="All">All</option>
        <option value="Api">Api</option>
        <option value="DB">Db</option>
      </select>
    </div>
  );
}

export default Order;
