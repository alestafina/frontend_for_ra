import React, { useState, useEffect } from "react";
import Loader from "../Loader/Loader";
import arrow from "../../assets/arrow.png";
import classes from "./NotesList.module.css";
import api from "../../api/api";

function NotesList(status) {
  const [notes, setNotes] = useState([]);
  const [content, setContent] = useState([]);
  const [openNotes, setOpenNotes] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      const { notes, content } = await getNoteInfo();
      setNotes(notes);
      setContent(content);
    };
    loadData();
  }, []);

  const getNoteInfo = async () => {
    try {
      setLoader(true);
      const response = await api.get("/form_memo");
      const data = response.data;

      const notes = [
        {
          id: data.ID_MEMO,
          theme: data.INFO,
          status: data.STATUS_TEXT,
          department: data.CREATOR.DEPARTMENT,
          info: data.INFO,
          responsible: `${data.EXECUTOR.NAME} ${data.EXECUTOR.SURNAME}`,
          creationDate: data.DATE_OF_CREATION,
          executionDate: data.DATE_OF_APPOINTMENT,
        },
      ];

      const content = data.DESCRIPTION.map((descItem, index) => ({
        position: index + 1,
        name: descItem.NAME,
        quantity: descItem.COUNT,
        unit: descItem.UNIT_TEXT,
        responsible: `${descItem.EXECUTOR.NAME} ${descItem.EXECUTOR.SURNAME}`,
        status: descItem.STATUS_TEXT,
        contract: descItem.CONTRACT,
        deliveryDate: descItem.DATE_OF_DELIVERY,
      }));

      return { notes, content };
    } catch (error) {
      console.error("Ошибка при получении данных:", error);
      return { notes: [], content: [] };
    } finally {
      setLoader(false);
    }
  };

  const toggleNote = (id) => {
    setOpenNotes((prevOpenNotes) =>
      prevOpenNotes.includes(id)
        ? prevOpenNotes.filter((noteId) => noteId !== id)
        : [...prevOpenNotes, id]
    );
  };

  return (
    <div className={classes.NotesList}>
      {loader && <Loader/>}
      {notes.map((note) => {
        const isOpen = openNotes.includes(note.id);
        return (
          <div key={note.id} className={classes.noteItem}>
            <div className={classes.noteHeader}>
              <span className={classes.theme}>{note.theme}</span>
              <div className={classes.statusContainer}>
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
            </div>
            <div
              className={`${classes.noteDetails} ${
                isOpen ? classes.open : classes.close
              }`}
            >
              <p className={classes.data}>Дата создания: {note.creationDate}</p>
              <p className={classes.data}>Отдел/цех: {note.department}</p>
              <p className={classes.data}>
                Дата исполнения: {note.executionDate}
              </p>
              <p className={classes.data}>Обоснование: {note.info}</p>

              <div className={classes.modalOverlay}>
                <div className={classes.modal}>
                  <p className={classes.data}>Содержание служебной записки:</p>
                  <table className={classes.table}>
                    <thead>
                      <tr>
                        <th>№ позиции</th>
                        <th>Наименование</th>
                        <th>Кол-во</th>
                        <th>Ед. изм</th>
                        <th>Ответственный</th>
                        <th>Статус</th>
                        <th>Договор</th>
                        <th>Дата поставки</th>
                      </tr>
                    </thead>
                    <tbody>
                      {content.map((item, index) => (
                        <tr key={index}>
                          <td>{item.position}</td>
                          <td>{item.name}</td>
                          <td>{item.quantity}</td>
                          <td>{item.unit}</td>
                          <td>{item.responsible}</td>
                          <td>{item.status}</td>
                          <td>{item.contract}</td>
                          <td>{item.deliveryDate}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default NotesList;
