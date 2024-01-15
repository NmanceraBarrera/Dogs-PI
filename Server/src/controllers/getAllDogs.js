const axios = require("axios");
const { Dog } = require("../db");
const API_KEY = process.env.API_KEY;

const getAllDogs = async (req, res) => {
  const URL = `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`;
  let breeds;

  try {
    const response = await axios.get(URL);
    data = response.data;

    breeds = data.map((dog) => ({
      id: dog.id,
      weight: dog.weight,
      height: dog.height,
      name: dog.name,
      bred_for: dog.bred_for,
      breed_group: dog.breed_group,
      life_span: dog.life_span,
      temperament: dog.temperament,
      origin: dog.origin,
      image: dog.image.url,
    }));

    const dogFromDb = await Dog.findAll();
    if (dogFromDb) {
      for (let i = 0; i < dogFromDb.length; i++) {
        breeds.push(dogFromDb[i]);
      }
      return res.json(breeds);
    } else if (data && !dogFromDb) {
      return res.json(breeds);
    } else {
      res.status(404).json({ message: "No breed found" });
      return;
    }
  } catch (error) {
    console.error("Error fetching dog breeds:", error.message);
  }
};

module.exports = getAllDogs;
