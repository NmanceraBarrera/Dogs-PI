const axios = require("axios");
const { Dog } = require("../db"); // Asegúrate de que esta ruta sea correcta
const { Op } = require("sequelize");
const API_KEY = process.env.API_KEY;

const getDogByName = async (req, res) => {
  const name = req.query.name;
  const nameLowerCase = name.toLowerCase();
  const URL = `https://api.thedogapi.com/v1/breeds/?api_key=${API_KEY}search?q=${nameLowerCase}`;

  ///////////////////////////////////////////
  //   const dbPokemon = await Pokemon.findOne({
  //     where: {
  //         name: {
  //             [Op.iLike]: lowerCaseName
  //         }
  //     }
  // });

  // if (dbPokemon) {
  //     return res.status(200).json(dbPokemon);
  // }
  //////////////////////////////////////////
  if (!nameLowerCase) {
    return res.status(400).json({ message: "nombre no existe" });
  }
  try {
    const dogFromDb = await Dog.findOne({
      where: {
        name: {
          [Op.iLike]: nameLowerCase,
        },
      },
    });
    if (dogFromDb) {
      return res.status(200).json(dogFromDb);
    }
    const response = await axios.get(URL);

    breeds = response.data;
    res.json(breeds);
  } catch (error) {
    console.error("Error fetching dog breeds:", error.message);
  }
};

module.exports = getDogByName;
