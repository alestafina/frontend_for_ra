import React from "react";
import classes from "./RejectedPage.module.css";
import NotesList from "../../components/NotesList/NotesList";

function RejectedPage() {
  return (
    <>
      <h1 className={classes.title}>Отклоненные служебные записки</h1>
      <div className={classes.info}><NotesList /></div>
    </>
  );
}

export default RejectedPage;
