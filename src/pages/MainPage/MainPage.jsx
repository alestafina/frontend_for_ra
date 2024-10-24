import React from "react";
import classes from "./MainPage.module.css";

function MainPage() {
  return (
    <>
      <h1 className={classes.title}>Главная</h1>
      <div className={classes.info}>Информация и графики здесь</div>
    </>
  );
}

export default MainPage;
