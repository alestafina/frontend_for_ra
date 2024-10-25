import React, { useState } from "react";
import Button from "../../components/Button/Button";
import classes from "./LoginPage.module.css"; // Создаем стили для этой страницы

const LoginPage = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    // Простая проверка: логин и пароль
    if (username === "admin" && password === "password") {
      onLoginSuccess(); // Успешный вход
    } else {
      setErrorMessage("Неверное имя пользователя или пароль");
    }
  };

  return (
    <div className={classes.loginPage}>
      <h2>Авторизация</h2>
      <form onSubmit={handleLogin} className={classes.form}>
        <label className={classes.label}>Введите почту</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className={classes.inputField}
          placeholder="Почта"
        />
        <label className={classes.label}>Введите пароль</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={classes.inputField}
          placeholder="Пароль"
        />
        {errorMessage && <p className={classes.error}>{errorMessage}</p>}
        <Button text="Войти" />
      </form>
    </div>
  );
};

export default LoginPage;
