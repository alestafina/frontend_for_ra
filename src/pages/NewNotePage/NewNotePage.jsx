import React, { useState, useEffect } from "react";
import Select from "react-select"; // Импортируем Select
import DatePicker from "react-datepicker"; // Импортируем компонент DatePicker
import "react-datepicker/dist/react-datepicker.css"; // Импортируем стили
import classes from "./NewNotePage.module.css";
import Button from "../../components/Button/Button";
import NewNoteContent from "../../components/NewNoteContent/NewNoteContent"; // Импортируем новый компонент

function NewNotePage({ onClose }) {
  const [departments, setDepartments] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [noteTheme, setNoteTheme] = useState(""); // Тема
  const [noteDescription, setNoteDescription] = useState(""); // Обоснование
  const [executionDate, setExecutionDate] = useState(null); // Дата исполнения
  const [showWarning, setShowWarning] = useState(false); // Состояние для предупреждения
  const [showNoteContent, setShowNoteContent] = useState(false); // Состояние для показа формы содержания

  // Пример данных отделов и исполнителей
  const exampleDepartments = [
    { id: 1, name: "Отдел разработки" },
    { id: 2, name: "Отдел маркетинга" },
    { id: 3, name: "Отдел продаж" },
  ];

  const exampleEmployeesByDepartment = {
    1: [
      { id: 1, name: "Иван Иванов" },
      { id: 2, name: "Петр Петров" },
    ],
    2: [
      { id: 3, name: "Мария Смирнова" },
      { id: 4, name: "Алексей Алексеев" },
    ],
    3: [
      { id: 5, name: "Ольга Сидорова" },
      { id: 6, name: "Дмитрий Дмитриев" },
    ],
  };

  // Имитируем получение данных с сервера при загрузке
  useEffect(() => {
    setDepartments(exampleDepartments);
  }, []);

  // Функция для загрузки исполнителей по отделу
  const fetchEmployees = (departmentId) => {
    const data = { employees: exampleEmployeesByDepartment[departmentId] };
    setEmployees(data.employees);
  };

  // Обработчик выбора отдела
  const handleDepartmentChange = (selectedOption) => {
    setSelectedDepartment(selectedOption);
    fetchEmployees(selectedOption.value); // Загружаем исполнителей для выбранного отдела
  };

  // Обработчик изменения даты
  const handleDateChange = (date) => {
    setExecutionDate(date); // Сохраняем выбранную дату
  };

  // Обработчик сохранения формы
  const handleSubmit = (e) => {
    e.preventDefault(); // Предотвращаем перезагрузку страницы

    if (!noteTheme || !noteDescription || !selectedDepartment || !selectedEmployee || !executionDate) {
      setShowWarning(true);
      return; // Не продолжаем, если поля пустые
    }

    const formattedDate = `${executionDate.getFullYear()}-${String(executionDate.getMonth() + 1).padStart(2, '0')}-${String(executionDate.getDate()).padStart(2, '0')}`;

    const newNoteData = {
      theme: noteTheme,
      description: noteDescription,
      department: selectedDepartment.value,
      employee: selectedEmployee.value,
      executionDate: formattedDate,
    };

    console.log("Данные новой служебной записки:", newNoteData);

    // Здесь можно вызвать функцию для отправки данных на сервер
    // sendDataToServer(newNoteData);

    // После успешного подтверждения показываем содержание
    setShowNoteContent(true);
  };

  // Обработчик для закрытия окна и очистки полей
  const handleClose = () => {
    setNoteTheme("");
    setNoteDescription("");
    setSelectedDepartment("");
    setSelectedEmployee("");
    setExecutionDate(null);
    onClose(); // Вызываем функцию для закрытия модального окна
  };

  // Обработчик для отправки данных содержания
  const handleNoteContentSubmit = () => {
    console.log("Содержание записки успешно отправлено!");
    handleClose(); // Закрываем модальное окно
  };

  // Обработчик для отмены и возврата к предыдущему экрану
  const handleCancelNoteContent = () => {
    setShowNoteContent(false);
  };

  return (
    <div className={classes.modalOverlay}>
      <div className={classes.modal}>
        <button className={classes.closeButton} onClick={handleClose}>✖</button>
        {showNoteContent ? (
          <NewNoteContent onSubmit={handleNoteContentSubmit} onCancel={handleCancelNoteContent} />
        ) : (
          <>
            <h2>Заполните основную информацию о служебной записке</h2>
            {showWarning && (
              <div className={classes.warningMessage}>Пожалуйста, заполните все поля!</div>
            )}
            <form onSubmit={handleSubmit}>
              <div className={classes.formGroup}>
                <input
                  type="text"
                  value={noteTheme}
                  onChange={(e) => setNoteTheme(e.target.value)}
                  placeholder="Тема служебной записки"
                  // className={classes.inputField}
                />
              </div>
              <div className={classes.formGroup}>
                <textarea
                  type="text"
                  value={noteDescription}
                  onChange={(e) => setNoteDescription(e.target.value)}
                  placeholder="Обоснование"
                  className={classes.inputField}
                />
              </div>
              <div className={classes.formGroup}>
                <Select
                  value={selectedDepartment}
                  onChange={handleDepartmentChange}
                  options={departments.map(dept => ({ value: dept.id, label: dept.name }))}
                  className={classes.selectField}
                  placeholder="Отдел"
                />
              </div>
              <div className={classes.formGroup}>
                <Select
                  value={selectedEmployee}
                  onChange={(selectedOption) => setSelectedEmployee(selectedOption)}
                  options={employees.map(emp => ({ value: emp.id, label: emp.name }))}
                  className={classes.selectField}
                  placeholder="Исполнитель"
                  isDisabled={!selectedDepartment}
                />
              </div>
              <div className={classes.formGroup}>
                <label htmlFor="datePicker" className={classes.dateLabel}>Дата исполнения</label>
                <DatePicker
                  selected={executionDate}
                  onChange={handleDateChange}
                  dateFormat="dd.MM.yyyy"
                  className={classes.datePicker} // Используем кастомные стили
                  placeholderText="Выберите дату"
                  minDate={new Date()}
                />
              </div>
              <Button onClick={handleSubmit} text="Подтвердить" />
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default NewNotePage;
