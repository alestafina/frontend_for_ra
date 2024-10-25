import React from "react";
import Button from "../Button/Button";
import classes from "./LogoutConfirm.module.css";

const LogoutConfirm = ({ onConfirm, onCancel }) => {
  return (
    <div className={classes.modalOverlay}>
      <div className={classes.modal}>
        <h2>Вы уверены, что хотите выйти?</h2>
        <div className={classes.buttons}>
          <div className={classes.yes}><Button onClick={onConfirm} text="Подтвердить" /></div>
          <div className={classes.no}><Button onClick={onCancel} text="Отмена" /></div>
        </div>
      </div>
    </div>
  );
};

export default LogoutConfirm;
