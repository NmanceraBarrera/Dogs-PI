import axios from "axios";
import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import LandingPage from "./components/landingPage/landingPage";
import Homepage from "./components/homePage/Homepage";
import { useDispatch, useSelector } from "react-redux";
import {
  filterDog,
  filterDogsbyTemperament,
  getAllDogsAction,
  searchDogByName,
} from "../src/redux/action";
import Detail from "./components/detail/Detail";
import SearchBar from "./components/SearchBar/SearchBar";
import FormCreate from "./components/Formulariocrear/FormCreate";
import Nav from "./components/Navbar/Nav";

function App() {
  const dispatch = useDispatch();
  const myDogs = useSelector((state) => state.myDogs);
  const allDogs = useSelector((state) => state.searchDogName);
  const temps = useSelector((state) => state.searchTemperaments); //? => llamo el estado Global searchTemperaments
  console.log(temps, "xsd");

  const navigate = useNavigate();

  const onClick = (id) => {
    navigate(`/dogs/${id}`);
  };
  const onClickCreate = (id) => {
    navigate(`/dogs`);
  };

  const onSearch = (searchTrim) => {
    dispatch(searchDogByName(searchTrim));
  };

  useEffect(() => {
    dispatch(getAllDogsAction()); //! ACA LLAMO LOS CANCHOSOS
    dispatch(filterDog()); //! ACA LLAMO LOS TEMPERAMENTOS
  }, []);

  const filterDogsByTemp = (dogTemp) => {
    dispatch(filterDogsbyTemperament(dogTemp));
  };

  return (
    <React.Fragment>
      {location.pathname !== "/" && (
        <Nav
          myDogs={myDogs}
          onSearch={onSearch}
          temps={temps}
          filterDogsByTemp={filterDogsByTemp}
        />
      )}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/home"
          element={
            <Homepage
              onClick={onClick}
              myDogs={myDogs}
              allDogs={allDogs}
              onSearch={onSearch}
              temps={temps}
              filterDogsByTemp={filterDogsByTemp}
            />
          }
        />
        <Route path="/dogs/:id" element={<Detail {...myDogs} />} />
        <Route path="/dogs/name" element={<SearchBar {...myDogs} />} />
        {/* <Route path="/dogs/name" element={<Filterbyname {...myDogs} />} /> */}
        <Route
          path="/createdog"
          element={
            <FormCreate
              onClickCreate={onClickCreate}
              temps={temps}
              myDogs={myDogs}
            />
          }
        />
      </Routes>
    </React.Fragment>
  );
}

export default App;
