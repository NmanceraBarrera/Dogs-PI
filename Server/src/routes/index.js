const { Router } = require("express");
const getAllDogs = require("../controllers/getAllDogs");
const getDogById = require("../controllers/getDogById");
const getDogByName = require("../controllers/getDogByName");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

router.get("/dogs", getAllDogs);
router.get("/dogs/:idRaza", getDogById);
router.get("/dogs/name", getDogByName);

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

module.exports = router;
