const { Dog } = require("../db"); // Asegúrate de que esta ruta sea correcta

const createDog = async (req, res) => {
  try {
    const { imagen, name, alturaCm, peso, añosVida } = req.body;
    const newDog = await Dog.create({
      imagen,
      name,
      alturaCm,
      peso,
      añosVida,
    });

    res.status(200).json(newDog);
  } catch (error) {
    res.status(404).send(error.message);
  }
};
module.exports = createDog;
