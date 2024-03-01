import React, { useState } from "react";
import axios from "axios";
import style from "./formCreate.module.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createDog } from "../../redux/action";
import validate from "../../utils/Validation"; // Asegúrate de importar la función de validación desde tu archivo
function FormCreate({ temps, myDogs }) {
  const tFiltrados = temps.tFinal;
  const [errors, setErrors] = useState({});
  const [randomImage, setRandomImage] = useState("");
  const [selectedTemperaments, setSelectedTemperaments] = useState([]);
  const [create, setCreate] = useState({
    name: "",
    weightMin: "",
    weightMax: "",
    heightMin: "",
    heightMax: "",
    lifeSpanMin: "",
    lifeSpanMax: "",
    temperament: selectedTemperaments
      ? selectedTemperaments.map((temp) => temp.name)
      : [],
    image: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCreate((prevCreate) => ({ ...prevCreate, [name]: value }));

    // Validación en vivo
    const validationErrors = validate({ ...create, [name]: value });
    setErrors(validationErrors);
  };

  const handleTemperamentoChange = (e) => {
    const selectedOptions = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    const limitedSelection = selectedOptions.slice(0, 6);

    setSelectedTemperaments(limitedSelection);
    setCreate((prevCreate) => ({
      ...prevCreate,
      temperament: limitedSelection,
    }));
  };

  const handleGoBack = () => {
    navigate("/");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación final antes de enviar
    const validationErrors = validate(create);
    if (Object.keys(validationErrors).length === 0) {
      sendFormData();
    } else {
      setErrors(validationErrors);
    }
  };

  const sendFormData = () => {
    const weight = `${create.weightMin} - ${create.weightMax}`;
    const height = `${create.heightMin} - ${create.heightMax}`;
    const life_span = `${create.lifeSpanMin} - ${create.lifeSpanMax}`;

    const formData = {
      name: create.name,
      weight,
      height,
      life_span,
      temperament: create.temperament,
      image: create.image,
    };

    dispatch(createDog(formData));
    console.log("Perro creado con éxito:", formData);
  };

  const handleRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * myDogs.length);
    const randomDog = myDogs[randomIndex];

    setCreate((prevCreate) => ({
      ...prevCreate,
      image: randomDog.image,
    }));
    setRandomImage(randomDog.image);
  };

  return (
    <div className={style.bg}>
      <img
        src="./src/assets/sonrisa.png"
        alt="sonrisa"
        className={style.sonrisa}
      />
      <div className={style.Card}>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className={style.option}>
            <div className={style.nameBreed}>
              <input
                type="text"
                name="name"
                value={create.name}
                onChange={handleChange}
                placeholder="Nombre del perro"
                className={style.nombre}
              />
              <p className={style.error}>{errors.name ? errors.name : null}</p>
            </div>
            <div className={style.weight}>
              <input
                type="text"
                name="weightMin"
                value={create.weightMin}
                onChange={handleChange}
                placeholder="Peso Mínimo"
                className={style.weightMin}
              />
              <p className={style.error}>
                {errors.weightMin ? errors.weightMin : null}
              </p>
              <input
                type="text"
                name="weightMax"
                value={create.weightMax}
                onChange={handleChange}
                placeholder="Peso Max"
                className={style.weightMax}
              />
              <p className={style.error}>
                {errors.weightMax ? errors.weightMax : null}
              </p>
            </div>
            <div className={style.height}>
              <input
                type="text"
                name="heightMin"
                value={create.heightMin}
                onChange={handleChange}
                placeholder="Altura Min"
                className={style.heightMin}
              />
              <p className={style.error}>
                {errors.heightMin ? errors.heightMin : null}
              </p>
              <input
                type="text"
                name="heightMax"
                value={create.heightMax}
                onChange={handleChange}
                placeholder="Altura Max"
                className={style.heightMax}
              />
              <p className={style.error}>
                {errors.heightMax ? errors.heightMax : null}
              </p>
            </div>
            <div className={style.lifeSpan}>
              <input
                type="text"
                name="lifeSpanMin"
                value={create.lifeSpanMin}
                onChange={handleChange}
                placeholder="LifeSpan Min"
                className={style.lifeSpanMin}
              />
              <p className={style.error}>
                {errors.lifeSpanMin ? errors.lifeSpanMin : null}
              </p>
              <input
                type="text"
                name="lifeSpanMax"
                value={create.lifeSpanMax}
                onChange={handleChange}
                placeholder="LifeSpan Max"
                className={style.lifeSpanMax}
              />
              <p className={style.error}>
                {errors.lifeSpanMax ? errors.lifeSpanMax : null}
              </p>
            </div>
            <div className={style.temp}>
              <select
                name="temperamento"
                value={selectedTemperaments}
                onChange={handleTemperamentoChange}
                multiple
                className={style.temperamento}
              >
                <option value="Select Temperament...">
                  Select Temperament...
                </option>
                {tFiltrados.map((temp, index) => (
                  <option key={index} value={temp}>
                    {temp}
                  </option>
                ))}
              </select>
              <p className={style.error}>
                {/* {errors.temperamento ? errors.temperamento : null} */}
              </p>
            </div>
            <button type="button" onClick={handleRandomImage}>
              Seleccionar Imagen Aleatoria
            </button>
            {randomImage && (
              <img
                src={randomImage}
                alt="Random Preview"
                className={style.previewImage}
              />
            )}

            <input
              type="submit"
              value="Submit"
              className={style.submitButton}
            />
          </div>
        </form>
      </div>
      <button className={style.goBack} onClick={handleGoBack}>
        Home
      </button>
    </div>
  );
}

export default FormCreate;
