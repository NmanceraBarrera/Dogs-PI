const axios = require("axios");
const { Dog } = require("../db"); // Asegúrate de que esta ruta sea correcta
const API_KEY = process.env.API_KEY;

const getDogById = async (req, res) => {
  const { idRaza } = req.params;
  const URL = `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`;

  try {
    if (!isNaN(idRaza)) {
      // Si el ID es un número, busca en la API
      const { data } = await axios.get(URL);
      const dogFromAPI = data.find((dog) => dog.id === parseInt(idRaza));

      if (!dogFromAPI) {
        res.status(404).json({ message: "No breed found" });
        return;
      }

      res.json(dogFromAPI);
    } else {
      // Si el ID es una cadena, busca en la base de datos
      const dogFromDb = await Dog.findOne({ where: { id: idRaza } });

      if (!dogFromDb) {
        res.status(404).json({ message: "No breed found" });
        return;
      }

      res.json(dogFromDb);
    }
  } catch (error) {
    console.error("Error fetching dog breed:", error.message);
  }
};

module.exports = getDogById;
