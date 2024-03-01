const axios = require("axios");
const { Temperament } = require("../db"); // Asegúrate de que esta ruta sea correcta
const API_KEY = process.env.API_KEY;

const getAllTemperaments = async (req, res) => {
  const URL = `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`;
  let temperaments;

  try {
    const response = await axios.get(URL);
    temperaments = response.data;
    tFind = [];
    tFinal = [];

    for (let i = 0; i < temperaments.length; i++) {
      if (temperaments[i].temperament) tFind.push(temperaments[i].temperament);
    }

    var tFiltrado = tFind.join(", ");

    var tUnico = new Set(tFiltrado.split(", "));

    // Convertir el Set a un array
    var tFinal = Array.from(tUnico).sort();

    for (let i = 0; i < tFinal.length; i++) {
      await Temperament.findOrCreate({
        where: { name: tFinal[i] },
      });
    }

    res.json({ tFinal });
  } catch (error) {
    console.error("Error fetching temperaments:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
    return;
  }

  // Obtener los temperamentos de la base de datos
  // temperaments = await Temperaments.findAll();
};

module.exports = getAllTemperaments;
