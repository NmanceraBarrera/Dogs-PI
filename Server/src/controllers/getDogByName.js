const axios = require("axios");
const { Dog } = require("../db"); // Asegúrate de que esta ruta sea correcta
const { Op } = require("sequelize");
const API_KEY = process.env.API_KEY;

const getDogByName = async (req, res) => {
  const name = req.query.name;
  const nameLowerCase = name.toLowerCase();
  const URL = `https://api.thedogapi.com/v1/breeds/search?q=${nameLowerCase}&api_key=${API_KEY}`;

  if (!nameLowerCase) {
    return res.status(400).json({ message: "nombre no existe" });
  }
  try {
    const dogFromDb = await Dog.findOne({
      where: {
        name: {
          [Op.iLike]: `%${nameLowerCase}%`,
        },
      },
    });
    if (dogFromDb) {
    }
    const response = await axios.get(URL);

    breeds = response.data;
    res.json(breeds);
  } catch (error) {
    console.error("Error fetching dog breeds:", error.message);
    res.status(500).json({ message: "Error fetching dog breeds" });
  }
};

module.exports = getDogByName;
