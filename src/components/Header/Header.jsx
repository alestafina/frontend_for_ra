import React from "react";
import {useState, useEffect} from "react";
import Loader from "../Loader/Loader";
import api from "../../api/api";
import classes from "./Header.module.css";

function Header() {
    const [info, setInfo] = useState({name: "", position: ""});
    const [loader, setLoader] = useState(false);

    useEffect(() => {
      getInfo();
    }, [])

    const getInfo = async () => {
      try {
        setLoader(true);
        const data = await api.get("/");
        const name = `${data.data.SURNAME} ${data.data.NAME} ${data.data.PATRONYMIC}`;
        setInfo({name: name, position: data.data.POSITION});
      } catch (error) {
        console.error(error);
      } finally {
        setLoader(false);
      }
    };

  return (
    <div className={classes.header}>
      {loader && <Loader/>}
      <img src="https://posever.ru/wp-content/uploads/2022/09/logo-sever-nsk1-200x66-1.png" alt="иконка" className={classes.icon}></img>
      <div className={classes.userInfo}>
        <div>{info.name}</div>
        <div>{info.position}</div>
      </div>
    </div>
  );
};

export default Header;
