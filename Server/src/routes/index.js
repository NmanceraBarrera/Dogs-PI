const express = require("express");
const router = express.Router();

// Importar los controladores
const getAllDogs = require("../controllers/getAllDogs");
const getDogById = require("../controllers/getDogById");
const getDogByName = require("../controllers/getDogByName");
const createDog = require("../controllers/postCreateDog");
const getAllTemperaments = require("../controllers/getTemperaments");
const deleteById = require("../controllers/deleteById");

// Definir las rutas
router.get("/dogs", getAllDogs);
router.get("/dogs/name", getDogByName);
router.get("/dogs/:idRaza", getDogById);
router.post("/dogs", createDog);
router.get("/temperaments", getAllTemperaments);
router.delete("/dogs/:idRaza", deleteById);

module.exports = router;
