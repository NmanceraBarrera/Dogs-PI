import React from "react";
import style from "./LandingPage.module.css";
import { NavLink } from "react-router-dom";
import { GiJumpingDog } from "react-icons/gi";
import hueso from "../../assets/hueso.png";

function LandingPage() {
  //   function onClick(element) {
  //     useEffect((onClick) => {
  //       document.body.style.backgroundImage = `url(
  //       'https://images8.alphacoders.com/909/909638.png'
  //     )`;
  //       return () => {
  //         document.body.style.backgroundImage = null;
  //       };
  //     }, []);
  //   }

  return (
    <div className={style.landing}>
      <NavLink to={"/home"} className={style.Navlink}>
        <div className={style.containerButton}>
          <h2 className={style.h3}>
            Entrar <GiJumpingDog />
          </h2>
          <div className={style.a}></div>
        </div>
      </NavLink>
    </div>
  );
}

export default LandingPage;
