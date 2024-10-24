import React from "react";
import classes from "./ApprovalPage.module.css";
import NotesList from "../../components/NotesList/NotesList";

function ApprovalPage() {
  return (
    <>
      <h1 className={classes.title}>Служебные записки на согласование</h1>
      <div className={classes.info}><NotesList /></div>
    </>
  );
}

export default ApprovalPage;
