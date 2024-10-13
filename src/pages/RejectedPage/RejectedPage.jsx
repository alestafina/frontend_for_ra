import React from "react";
import classes from "./RejectedPage.module.css";

function RejectedPage() {
  return (
    <>
      <h1>Это страница отклоненных</h1>
      <div className={classes.info}>сюда мы выведем инфу и графики</div>
    </>
  );
}

export default RejectedPage;
