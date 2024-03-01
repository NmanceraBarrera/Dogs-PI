const axios = require("axios");
const { Dog, Temperament } = require("../db");
const API_KEY = process.env.API_KEY;

const getAllDogs = async (req, res) => {
  const URL = `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`;

  try {
    const apiResponse = await axios.get(URL);
    const apiDogs = apiResponse.data.map((dog) => ({
      id: dog.id,
      weight: dog.weight.metric,
      height: dog.height,
      name: dog.name,
      bred_for: dog.bred_for,
      breed_group: dog.breed_group,
      life_span: dog.life_span,
      temperament: dog.temperament,
      origin: dog.origin,
      image: dog.image.url,
    }));

    const dbDogs = await Dog.findAll({
      include: [
        {
          model: Temperament,
          attributes: ["name"],
          through: { attributes: [] },
        },
      ],
    });

    const mergedDogs = [...apiDogs, ...dbDogs];

    res.json(mergedDogs);
  } catch (error) {
    console.error("Error fetching dog breeds:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = getAllDogs;
