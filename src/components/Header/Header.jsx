import React from "react";
import {useState, useEffect} from "react";
import myImg from "../../assets/icon.png"
import classes from "./Header.module.css";

function Header() {
    const [info, setInfo] = useState({name: "", position: ""});

    useEffect(() => {
      const fetchedInfo = getInfo();
      setInfo(fetchedInfo);
    }, [])

    const getInfo = () => {
      return {
        name: "Имя Фамилия", 
        position: "Должность"
      };
    };

  return (
    <div className={classes.header}>
      <img src="https://posever.ru/wp-content/uploads/2022/09/logo-sever-nsk1-200x66-1.png" alt="иконка" className={classes.icon}></img>
      <div className={classes.userInfo}>
        <div>{info.name}</div>
        <div>{info.position}</div>
      </div>
    </div>
  );
};

export default Header;
