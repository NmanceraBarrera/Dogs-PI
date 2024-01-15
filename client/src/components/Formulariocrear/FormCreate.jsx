import React, { useState } from "react";
import axios from "axios"; // Asegúrate de importar axios si aún no lo has hecho
import style from "./formCreate.module.css";
import { createDog } from "../../redux/action";
import { useDispatch } from "react-redux";

function FormCreate({ temps }) {
  const dispatch = useDispatch();
  const tFiltrados = temps.tFinal;
  const [selectedTemperaments, setSelectedTemperaments] = useState([]);
  const [create, setCreate] = useState({
    name: "",
    breedFor: "",
    weightMin: "",
    weightMax: "",
    heightMin: "",
    heightMax: "",
    lifeSpanMin: "",
    lifeSpanMax: "",
    temperament: [], // Ahora es un array para múltiples temperamentos
    image: new File([], ""),
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    const newValue = type === "file" ? e.target.files[0] : value;

    setCreate((prevCreate) => ({
      ...prevCreate,
      [name]: newValue,
    }));
  };

  const handleTemperamentoChange = (e) => {
    const selectedTemperamento = e.target.value;

    // Verifica si el temperamento ya está seleccionado
    if (!selectedTemperaments.includes(selectedTemperamento)) {
      // Agrega el nuevo temperamento a la lista de seleccionados
      setSelectedTemperaments((prevSelectedTemperaments) => [
        ...prevSelectedTemperaments,
        selectedTemperamento,
      ]);
    }

    // Actualiza el estado de create.temperament con la lista de temperamentos seleccionados
    setCreate((prevCreate) => ({
      ...prevCreate,
      temperament: selectedTemperaments,
    }));
  };

  const sendFormData = async () => {
    try {
      // Realiza la concatenación aquí antes de enviar los datos al servidor
      const weight = create.weightMin + " - " + create.weightMax;
      const height = create.heightMin + " - " + create.heightMax;
      const lifespan = create.lifeSpanMin + " - " + create.lifeSpanMax;

      // Crea el objeto de datos a enviar al servidor
      const formData = {
        name: create.name,
        // breedFor: create.breedFor,
        weight,
        height,
        lifespan,
        temperament: create.temperament,
        image: create.image.name,
      };

      // Envía los datos al servidor (ajusta la URL según tu configuración)
      dispatch(createDog(formData));

      console.log("Respuesta del servidor:", formData);
    } catch (error) {
      console.error("Error al enviar los datos:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendFormData(); // Llama a la función para enviar los datos al servidor
  };

  return (
    <div className={style.Card}>
      <form onSubmit={handleSubmit}>
        {/* Columna Izquierda */}
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
            {/* <input
              type="text"
              name="breedFor"
              value={create.breedFor}
              onChange={handleChange}
              placeholder="Breed For"
              className={style.breedFor}
            /> */}
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
            <input
              type="text"
              name="weightMax"
              value={create.weightMax}
              onChange={handleChange}
              placeholder="Peso Max"
              className={style.weightMax}
            />
          </div>
          <div className={style.height}>
            {" "}
            <input
              type="text"
              name="heightMin"
              value={create.heightMin}
              onChange={handleChange}
              placeholder="Altura Min"
              className={style.heightMin}
            />
            <input
              type="text"
              name="heightMax"
              value={create.heightMax}
              onChange={handleChange}
              placeholder="Altura Max"
              className={style.heightMax}
            />
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
            <input
              type="text"
              name="lifeSpanMax"
              value={create.lifeSpanMax}
              onChange={handleChange}
              placeholder="LifeSpan Max"
              className={style.lifeSpanMax}
            />
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
          </div>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className={style.imagen}
          />

          <input type="submit" value="Submit" className={style.submitButton} />
        </div>
      </form>
    </div>
  );
}

export default FormCreate;
