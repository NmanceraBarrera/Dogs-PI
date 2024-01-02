const axios = require("axios");

const getAllDogs = async (req, res) => {
  const URL = `https://api.thedogapi.com/v1/breeds`;

  try {
    const response = await axios.get(URL);
    const dogBreeds = response.data.map((dog) => ({
      breed_group: dog.breed_group,
    }));
    res.json(dogBreeds);
  } catch (error) {
    console.error("Error fetching dog breeds:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = getAllDogs;
