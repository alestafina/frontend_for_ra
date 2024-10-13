import React, { useState } from "react";
import Button from "../Button/Button";
import classes from "./Nav.module.css";

const Nav = ({ setActivePage, activePage }) => {
  const [showSubmenu, setShowSubmenu] = useState(false);

  const handleClick = (page) => {
    setActivePage(page);
  };

  const toggleSubmenu = () => {
    setShowSubmenu((prev) => !prev);
  };

  const handleExit = () => {
    // Логика выхода
    alert("Вы вышли из системы");
  };

  const handleSettings = () => {
    // настройки!!!!
    alert("Переход в найстройки");
  };

  return (
    <ul className={classes.nav}>
      <li
        className={
          activePage === "Главная"
            ? `${classes.navBtn} ${classes.active}`
            : classes.navBtn
        }
      >
        <Button onClick={() => handleClick("Главная")} text="Главная" />
      </li>
      <li className={classes.navBtn}>
        <Button onClick={toggleSubmenu} text="Служебные записки" />

        {showSubmenu && (
          <ul className={classes.submenu}>
            <li
              className={
                activePage === "Реестр"
                  ? `${classes.submenuBtn} ${classes.active}`
                  : classes.submenuBtn
              }
            >
              <Button onClick={() => handleClick("Реестр")} text="Реестр" />
            </li>
            <li
              className={
                activePage === "На согласование"
                  ? `${classes.submenuBtn} ${classes.active}`
                  : classes.submenuBtn
              }
            >
              <Button
                onClick={() => handleClick("На согласование")}
                text="На согласование"
              />
            </li>
            <li
              className={
                activePage === "Отклоненные"
                  ? `${classes.submenuBtn} ${classes.active}`
                  : classes.submenuBtn
              }
            >
              <Button
                onClick={() => handleClick("Отклоненные")}
                text="Отклоненные"
              />
            </li>
          </ul>
        )}
      </li>
      {/* <li className={classes.navBtn}>
        <Button
          onClick={handleSettings}
          text="Настройки"
        />
      </li> */}
      <li className={classes.exit}>
        <Button onClick={handleExit} text="Выход" />
      </li>
    </ul>
  );
};

export default Nav;
