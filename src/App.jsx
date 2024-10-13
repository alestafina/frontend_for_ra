import React, { useState } from "react";
import Nav from "./components/Nav/Nav";
import Header from "./components/Header/Header";
import MainPage from "./pages/MainPage/MainPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import ApprovalPage from "./pages/ApprovalPage/ApprovalPage";
import RejectedPage from "./pages/RejectedPage/RejectedPage";
import classes from "./App.module.css";

const App = () => {
  const [activePage, setActivePage] = useState("Главная");

  return (
    <div className={classes.app}>
      <Header />
      <Nav setActivePage={setActivePage} activePage={activePage} />
      <div className={classes.content}>
        {activePage === "Главная" && <MainPage />}
        {activePage === "Реестр" && (
          <RegisterPage />
        )}
        {activePage === "На согласование" && <ApprovalPage />}
        {activePage === "Отклоненные" && <RejectedPage />}
      </div>
    </div>
  );
};

export default App;
