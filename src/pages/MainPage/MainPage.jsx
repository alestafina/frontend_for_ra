import React from "react";
import classes from "./MainPage.module.css";

function MainPage() {
  return (
    <>
      <h1>Это главная страница</h1>
      <div className={classes.info}>сюда мы выведем инфу и графики</div>
    </>
  );
}

export default MainPage;
