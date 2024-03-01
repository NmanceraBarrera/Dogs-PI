import axios from "axios";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import style from "./detail.module.css";
import { TiArrowBack } from "react-icons/ti";
const URL_API = import.meta.env.VITE_URL_API;

export default function Detail(props) {
  const { id } = useParams();
  const [dog, setDog] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    axios(`${URL_API}/dogs/${id}`).then(({ data }) => {
      if (data.name) {
        setDog(data);
        console.log(dog, "este es dog");
      } else {
        window.alert("No hay personajes con ese ID");
      }
    });
    return setDog({});
  }, [id]);

  function onBack() {
    navigate("/home");
  }
  console.log(dog, "este es dog");
  return (
    <div className={style.bg}>
      <button onClick={onBack} className={style.back}>
        <p className={style.arrow}>
          <TiArrowBack />
        </p>
      </button>
      {dog.name ? (
        <div className={style.containerCard}>
          <div className={style.name}>
            <h1>{dog.name}</h1>
          </div>
          <div className={style.info}>
            <div className={style.imgs}>
              <img src={dog.image.url} alt={dog.name} />
            </div>
            <div className={style.data}>
              <p>Peso: {dog.weight.metric}</p>
              <p>Altura: {dog.height.metric}</p>
              <p>Años de vida: {dog.life_span}</p>
            </div>
          </div>
          <div className={style.cajatemperamentos}>
            <p className={style.tbox}>
              {dog.temperament.split(", ").map((temperament, index) => (
                <span key={index} className={style.temperamentBox}>
                  {temperament}
                </span>
              ))}
            </p>
          </div>
        </div>
      ) : (
        <p>...Cargando</p>
      )}
    </div>
  );
}
