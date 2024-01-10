const axios = require("axios");
const { Dog } = require("../db"); // Asegúrate de que esta ruta sea correcta
const API_KEY = process.env.API_KEY;

const getDogById = async (req, res) => {
  const idRaza = req.params.idRaza;
  const URL = `https://api.thedogapi.com/v1/breeds/${idRaza}?api_key=${API_KEY}`;
  let breed;

  try {
    const response = await axios.get(URL);
    breed = response.data;

    const dogFromDb = await Dog.findOne({ where: { id: idRaza } });
    if (dogFromDb) {
      breed = dogFromDb;
    } else {
      res.status(404).json({ message: "No breed found" });
      return;
    }
  } catch (error) {
    console.error("Error fetching dog breed:", error.message);

    // Buscar en la base de datos si no se encuentra en la API
  }

  res.json(breed);
};

module.exports = getDogById;

// try {
//   const response = await axios.get(URL);
//   breed = response.data;
//   const { name, origin, temperament } = breed;
//   luchito = { name, origin, temperament };
// } catch (error) {
//   console.error("Error fetching dog breed:", error.message);

// Buscar en la base de datos si no se encuentra en la API
// const dogFromDb = await Dogs.findOne({ where: { id: idRaza } });

// if (dogFromDb) {
//   breed = dogFromDb;
// } else {
//   res.status(404).json({ message: "No breed found" });
//   return;
// }
// }

// res.json(luchito);
