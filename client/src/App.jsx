import axios from "axios";
import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./components/landingPage/landingPage";
import Homepage from "./components/homePage/Homepage";
import { useDispatch, useSelector } from "react-redux";
import { getAllDogsAction } from "../src/redux/action";

function App() {
  const myDogs = useSelector((state) => state.myDogs);

  const dispatch = useDispatch();

  useEffect(() => {
    const Dogs = async () => {
      const URL = "http://localhost:3001/dogs";
      try {
        const { data } = await axios.get(URL);

        if (data) {
          dispatch(getAllDogsAction(data));
        }
      } catch (error) {
        console.error("Error al realizar la solicitud:", error.message);
      }
    };
    Dogs();
  }, []);

  return (
    <React.Fragment>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Homepage myDogs={myDogs} />} />
      </Routes>
    </React.Fragment>
  );
}

export default App;
