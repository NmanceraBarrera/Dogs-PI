const { Dog } = require("../db"); // Asegúrate de que esta ruta sea correcta
const API_KEY = process.env.API_KEY;

const deleteById = async (req, res) => {
  const { idRaza } = req.params;
  const URL = `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`;

  try {
    const dogToDelete = await Dog.destroy({ where: { id: idRaza } });

    res.status(200).json({ message: "Dog has been destroy" });
    // res.json(200).json("el perro ha sido eliminado de la base de datos");
    return;
  } catch (error) {
    console.error("Error fetching dog breed:", error.message);
  }
};

module.exports = deleteById;
