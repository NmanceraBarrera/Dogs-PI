const axios = require("axios");
const { Dog } = require("../db");
const API_KEY = process.env.API_KEY;

const getAllDogs = async (req, res) => {
  const URL = `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`;
  let breeds;

  try {
    const response = await axios.get(URL);
    breeds = response.data;
    const dogFromDb = await Dog.findAll();
    if (dogFromDb) {
      breeds.push(dogFromDb);
    } else {
      res.status(404).json({ message: "No breed found" });
      return;
    }
  } catch (error) {
    console.error("Error fetching dog breeds:", error.message);
  }
  res.json(breeds);
};

module.exports = getAllDogs;
