import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "../Button/Button";
import LogoutConfirm from "../LogoutConfirm/LogoutConfirm";
import classes from "./Nav.module.css";

const Nav = ({ onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [showSubmenu, setShowSubmenu] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // Функция для переключения маршрута
  const handleClick = (page) => {
    navigate(page);
  };

  const toggleSubmenu = () => {
    setShowSubmenu((prev) => !prev);
  };

  const handleExitClick = () => {
    setShowLogoutModal(true);
  };

  const handleConfirmExit = () => {
    setShowLogoutModal(false);
    onLogout();
  };

  const handleCancelExit = () => {
    setShowLogoutModal(false);
  };

  return (
    <>
      <ul className={classes.nav}>
        <li
          className={
            location.pathname === "/"
              ? `${classes.navBtn} ${classes.active}`
              : classes.navBtn
          }
        >
          <Button onClick={() => handleClick("/")} text="Главная" />
        </li>
        <li className={classes.navBtn}>
          <Button onClick={toggleSubmenu} text="Служебные записки" />
          {showSubmenu && (
            <ul className={classes.submenu}>
              <li
                className={
                  location.pathname === "/register"
                    ? `${classes.submenuBtn} ${classes.active}`
                    : classes.submenuBtn
                }
              >
                <Button onClick={() => handleClick("/register")} text="Реестр" />
              </li>
              <li
                className={
                  location.pathname === "/approval"
                    ? `${classes.submenuBtn} ${classes.active}`
                    : classes.submenuBtn
                }
              >
                <Button
                  onClick={() => handleClick("/approval")}
                  text="На согласование"
                />
              </li>
              <li
                className={
                  location.pathname === "/rejected"
                    ? `${classes.submenuBtn} ${classes.active}`
                    : classes.submenuBtn
                }
              >
                <Button
                  onClick={() => handleClick("/rejected")}
                  text="Отклоненные"
                />
              </li>
            </ul>
          )}
        </li>
        <li className={classes.exit}>
          <Button onClick={handleExitClick} text="Выход" />
        </li>
      </ul>
      {showLogoutModal && (
        <LogoutConfirm onConfirm={handleConfirmExit} onCancel={handleCancelExit} />
      )}
    </>
  );
};

export default Nav;
