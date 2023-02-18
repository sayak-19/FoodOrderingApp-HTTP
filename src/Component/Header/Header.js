import React, { Fragment } from "react";
import styles from "./Header.module.css";
import mealsImg from "../../assets/meals.jpg";
import HeaderCardButton from "./HeaderCardButton";

function Header(props) {
  return (
    <Fragment>
      <header className={styles.header}>
        <h1>React Meals</h1>
        <HeaderCardButton onClick={props.onCartBtnClick} />
      </header>
      <div className={styles["main-image"]}>
        <img src={mealsImg} alt="ImageofFood" />
      </div>
    </Fragment>
  );
}

export default Header;
