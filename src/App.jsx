import React, { useState } from "react";
import Nav from "./components/Nav/Nav";
import Header from "./components/Header/Header";
import MainPage from "./pages/MainPage/MainPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import ApprovalPage from "./pages/ApprovalPage/ApprovalPage";
import RejectedPage from "./pages/RejectedPage/RejectedPage";
import LoginPage from "./pages/LoginPage/LoginPage"; // Импортируем компонент страницы авторизации
import classes from "./App.module.css";

const App = () => {
  const [activePage, setActivePage] = useState("Авторизация"); // Начальное состояние - страница авторизации
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Состояние для авторизации

  const handleLoginSuccess = () => {
    setIsAuthenticated(true); // Пользователь авторизован
    setActivePage("Главная"); // Перенаправляем на главную страницу
  };
  const handleLogout = () => {
    setIsAuthenticated(false); // Сбрасываем авторизацию
    setActivePage("login"); // Перенаправляем на страницу авторизации
    console.clear(); // Очищаем консоль
  };
  return (
    <div className={classes.app}>
        <>
        {!isAuthenticated ? (
          <LoginPage onLoginSuccess={handleLoginSuccess} /> // Отображаем страницу авторизации
        ) : (
          <div className={classes.content}>
          <Header />
          <Nav setActivePage={setActivePage} activePage={activePage} onLogout={handleLogout} />
            {activePage === "Главная" && <MainPage />}
            {activePage === "Реестр" && <RegisterPage />}
            {activePage === "На согласование" && <ApprovalPage />}
            {activePage === "Отклоненные" && <RejectedPage />}
      </div>
        )}
          </>
    </div>
  );
};

export default App;
