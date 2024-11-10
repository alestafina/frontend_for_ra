import React, { useState, useEffect } from "react";
import Select from "react-select";
import Button from "../Button/Button";
import Loader from "../Loader/Loader";
import api from "../../api/api";
import classes from "./NewNoteContent.module.css";

const NewNoteContent = ({ onSubmit }) => {
  const [entries, setEntries] = useState([
    { position: "", quantity: "", unit: "" },
  ]);
  const [units, setUnits] = useState([]);
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    getUnits();
  }, []);

  const getUnits = async () => {
    try {
      const response = await api.get("/get_selectors");
      const unitsData = response.data.UNITS;
      const formattedUnits = unitsData.map((unit) => ({
        value: unit.SHORT_NAME || unit.FULL_NAME,
        label: unit.FULL_NAME,
      }));

      setUnits(formattedUnits);
    } catch (error) {
      console.error("Ошибка при получении данных: ", error);
    }
  };

  const postMemo = async (memoData) => {
    try {
      setLoader(true);
      const response = await api.post("/form", memoData);
      return response.data;
    } catch (error) {
      console.error("Ошибка при отправке данных:", error);
      throw error;
    } finally {
      setLoader(false);
    }
  };

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
    const newEntries = entries.filter((_, i) => i !== index);
    setEntries(newEntries);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const memoData = {
      description: entries.map((entry, index) => ({
        position: index + 1,
        name: entry.position,
        quantity: entry.quantity,
        unit: entry.unit,
      })),
    };

    try {

      const result = postMemo(memoData);
      console.log("Ответ от сервера:", result);
      onSubmit(); 
    } catch (error) {
      console.error("Ошибка при отправке данных:", error);
    }    
  };

  return (
    <div className={classes.container}>
      {loader && <Loader/>}
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
              value={
                entry.unit ? { value: entry.unit, label: entry.unit } : null
              }
              onChange={(selectedOption) =>
                handleChange(
                  index,
                  "unit",
                  selectedOption ? selectedOption.value : ""
                )
              }
              options={units}
              className={classes.selectField}
              placeholder="Ед. изм."
            />
            <div className={classes.delete}>
              <Button
                type="button"
                onClick={() => handleDeleteEntry(index)}
                text="Удалить"
              />
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
