const { Dog, Temperament } = require("../db");

const createDog = async (req, res) => {
  try {
    const { image, name, height, weight, life_span, temperament } = req.body;

    // Crea el nuevo perro
    const newDog = await Dog.create({
      image,
      name,
      height,
      weight,
      life_span,
    });

    // Asigna los temperamentos al perro creado
    if (temperament && temperament.length > 0) {
      const temperaments = await Temperament.findAll({
        where: { name: temperament },
      });
      await newDog.setTemperaments(temperaments);
    }

    res.status(200).json(newDog);
  } catch (error) {
    res.status(404).send(error.message);
  }
};

module.exports = createDog;

// const { Dog } = require("../db"); // Asegúrate de que esta ruta sea correcta

// const createDog = async (req, res) => {
//   try {
//     const { image, name, height, weight, life_span } = req.body;
//     const newDog = await Dog.create({
//       image,
//       name,
//       height,
//       weight,
//       life_span,
//     });

//     res.status(200).json(newDog);
//   } catch (error) {
//     res.status(404).send(error.message);
//   }
// };
// module.exports = createDog;
