import React, { useState } from "react";
import classes from "./RegisterPage.module.css";
import NotesList from "../../components/NotesList/NotesList";
import Button from "../../components/Button/Button";
import NewNotePage from "../NewNotePage/NewNotePage"; 

function RegisterPage() {
  const [isModalOpen, setIsModalOpen] = useState(false); 

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <h1 className={classes.title}>Реестр служебных записок</h1>
      <div className={classes.button}>
        <Button onClick={handleOpenModal} text="Создать служебную записку" />
      </div>
      
      {isModalOpen && (
        <div className={classes.modalOverlay}>
          <div className={classes.modalContent}>
            <NewNotePage onClose={handleCloseModal} />
          </div>
        </div>
      )}
      <NotesList />
    </>
  );
}

export default RegisterPage;
