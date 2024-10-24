import React, { useState } from "react";
import arrow from "../../assets/arrow.png";
import classes from "./NotesList.module.css";
import Content from "../Content/Content";
import Button from "../Button/Button";

function NotesList() {
  // Массив для хранения служебных записок
  const [notes] = useState([
    {
      id: 1,
      theme: "Тема служебной записки 1",
      status: "Статус",
      department: "---",
      responsible: "Ответственный",
      creationDate: "12.10.2024",
      executionDate: "20.10.2024",
    },
    {
      id: 2,
      theme: "Тема служебной записки 2",
      status: "Статус",
      department: "---",
      responsible: "Ответственный",
      creationDate: "12.10.2024",
      executionDate: "20.10.2024",
    },
    // больше записок по необходимости
  ]);

  // Массив для хранения состояния открытия каждой записки
  const [openNotes, setOpenNotes] = useState([]);

  const toggleNote = (id) => {
    setOpenNotes((prevOpenNotes) =>
      prevOpenNotes.includes(id)
        ? prevOpenNotes.filter((noteId) => noteId !== id)
        : [...prevOpenNotes, id]
    );
  };

  const content = [
    {
      position: 1,
      name: "название",
      quantity: 5,
      unit: "кг",
      status: "текст",
      contract: "-",
      deliveryDate: "10.10.24",
    },
    {
      position: 2,
      name: "название",
      quantity: 5,
      unit: "шт",
      status: "текст",
      contract: "-",
      deliveryDate: "10.10.24",
    },
    // другие строки
  ];

  const [contentOpen, setContentOpen] = useState(false);
  const handleOpenContent = () => setContentOpen(true);

  return (
    <div className={classes.NotesList}>
      {notes.map((note) => {
        const isOpen = openNotes.includes(note.id);
        return (
          <div key={note.id} className={classes.noteItem}>
            <div className={classes.noteHeader}>
              <span>{note.theme}</span>
              <span>{note.status}</span>
              <button
                className={classes.arrowButton}
                onClick={() => toggleNote(note.id)}
              >
                <img
                  src={arrow}
                  className={isOpen ? classes.arrowOpen : classes.arrowClose}
                  alt={isOpen ? "Arrow Open" : "Arrow Close"}
                />
              </button>
            </div>
            <div
              className={`${classes.noteDetails} ${
                isOpen ? classes.open : classes.close
              }`}
            >
              <p className={classes.data}>Дата создания: {note.creationDate}</p>
              <p className={classes.data}>Отдел/цех: {note.department}</p>
              <p className={classes.data}>Ответственный: {note.responsible}</p>
              <p className={classes.data}>Дата исполнения: {note.executionDate}</p>
              <Button onClick={handleOpenContent} text="Открыть содержание" />
              {contentOpen && (
                <Content onClose={() => setContentOpen(false)} content={content} />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default NotesList;
