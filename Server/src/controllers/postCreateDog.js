const { Dog } = require("../db"); // Asegúrate de que esta ruta sea correcta

const createDog = async (req, res) => {
  try {
    const {
      image,
      name,
      height,
      weight,
      lifespan,
      temperament = [],
    } = req.body;
    const newDog = await Dog.create({
      image,
      name,
      height,
      weight,
      lifespan,
      temperament,
    });

    res.status(200).json(newDog);
  } catch (error) {
    res.status(404).send(error.message);
  }
};
module.exports = createDog;
