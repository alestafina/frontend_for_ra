import React, { useState } from "react";
import Select from "react-select"; // Импортируем Select из react-select
import Button from "../Button/Button";
import classes from "./NewNoteContent.module.css"; // Предполагаем, что у вас есть файл стилей

const measurementUnits = [
  { value: "кг", label: "Килограмм" },
  { value: "шт", label: "Штука" },
  { value: "м", label: "Метр" },
  { value: "л", label: "Литр" },
  { value: "другое", label: "Другое..." },
];

const NewNoteContent = ({ onSubmit }) => {
  const [entries, setEntries] = useState([{ position: "", quantity: "", unit: "" }]);

  const handleAddEntry = (e) => {
    e.preventDefault();
    setEntries([...entries, { position: "", quantity: "", unit: "" }]);
  };

  const handleChange = (index, field, value) => {
    const newEntries = [...entries];
    newEntries[index][field] = value;
    setEntries(newEntries);
  };

  const handleDeleteEntry = (index) => {
    setEntries(entries.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Заглушка для отправки данных на сервер
    console.log("Данные служебной записки:", entries);

    // Здесь можно вызвать функцию для отправки данных на сервер
    // sendDataToServer(entries);
    onSubmit(); // Вызываем функцию для обработки завершения
  };

  return (
    <div className={classes.container}>
      <h2 className={classes.title}>Заполните содержание служебной записки</h2>
      <form onSubmit={handleSubmit} className={classes.form}>
        {entries.map((entry, index) => (
          <div key={index} className={classes.entry}>
            <input
              type="text"
              placeholder="Позиция"
              value={entry.position}
              onChange={(e) => handleChange(index, "position", e.target.value)}
              className={classes.inputField}
            />
            <input
              type="number"
              placeholder="Кол-во"
              value={entry.quantity}
              onChange={(e) => handleChange(index, "quantity", e.target.value)}
              className={classes.inputField}
            />
            <Select
              value={entry.unit ? { value: entry.unit, label: entry.unit } : null}
              onChange={(selectedOption) => handleChange(index, "unit", selectedOption ? selectedOption.value : "")}
              options={measurementUnits}
              className={classes.selectField}
              placeholder="Ед. изм."
            />
            <div className={classes.delete}>
              <Button onClick={() => handleDeleteEntry(index)} text="Удалить" />
            </div>
          </div>
        ))}
        <div className={classes.buttonGroup}>
          <Button onClick={handleAddEntry} text="Добавить запись" />
          <Button type="submit" text="Подтвердить" />
        </div>
      </form>
    </div>
  );
};

export default NewNoteContent;
