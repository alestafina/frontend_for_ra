import React from "react";
import classes from "./RegisterPage.module.css";
import NotesList from "../../components/NotesList/NotesList";

function RegisterPage() {
  return (
    <>
      <h1>Это страница реестра</h1>
      <div className={classes.info}><NotesList /></div>
    </>
  );
}

export default RegisterPage;
