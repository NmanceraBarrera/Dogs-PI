const axios = require("axios");

const getDogById = async (req, res) => {
  const { idRaza } = req.params;
  const URL = `https://api.thedogapi.com/v1/breeds/${idRaza}`;

  try {
    const response = await axios.get(URL);
    const dogDetails = {
      id: response.data.id,
      name: response.data.name,
      bred_for: response.data.bred_for,
      breed_group: response.data.breed_group,
      life_span: response.data.life_span,
      temperament: response.data.temperament,
      origin: response.data.origin,
      reference_image_id: response.data.reference_image_id,
    };

    res.json(dogDetails);
  } catch (error) {
    console.error("Error fetching dog details:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = getDogById;
