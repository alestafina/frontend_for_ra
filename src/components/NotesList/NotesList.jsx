import React, { useState } from "react";
import arrow from "../../assets/arrow.png";
import classes from "./NotesList.module.css";

const NotesList = () => {
  // Массив для хранения служебных записок
  const [notes, setNotes] = useState([
    {
      id: 1,
      theme: "Тема служебной записки 1",
      status: "Статус",
      department: "---",
      responsible: "Ответственный",
      creationDate: "12.10.2024",
      executionDate: "20.10.2024",
      isOpen: false, // состояние открытия дополнительной информации
    },
    {
      id: 2,
      theme: "Тема служебной записки 2",
      status: "Статус",
      department: "---",
      responsible: "Ответственный",
      creationDate: "12.10.2024",
      executionDate: "20.10.2024",
      isOpen: false,
    },
    // Добавляйте больше записок по необходимости
  ]);

  // Функция для переключения состояния открытия записи
  const toggleNote = (id) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === id ? { ...note, isOpen: !note.isOpen } : note
      )
    );
  };

  return (
    <div className={classes.NotesList}>
      {notes.map((note) => (
        <div key={note.id} className={classes.noteItem}>
          <div className={classes.noteHeader}>
            <span>{note.theme}</span>
            <span>{note.status}</span>
            <button
              className={classes.arrowButton}
              onClick={() => toggleNote(note.id)}
            >
              {note.isOpen ? (
                <img
                  src={arrow}
                  className={classes.arrowOpen}
                  alt="Arrow Open"
                />
              ) : (
                <img
                  src={arrow}
                  className={classes.arrowClose}
                  alt="Arrow Close"
                />
              )}
            </button>
          </div>
          {note.isOpen && (
            <div className={classes.noteDetails}>
              <p>Дата создания: {note.creationDate}</p>
              <p>Отдел/цех: {note.department}</p>
              <p>Ответственный: {note.responsible}</p>
              <p>Дата исполнения: {note.executionDate}</p>
              <button className={classes.openContentButton}>
                Открыть содержание
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default NotesList;
