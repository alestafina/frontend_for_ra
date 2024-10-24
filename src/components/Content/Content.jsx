import React from 'react';
import classes from './Content.module.css'; 
import Button from '../Button/Button';

function Content({ onClose, content }) {
  return (
    <div className={classes.modalOverlay}>
      <div className={classes.modal}>
        <h2>Содержание служебной записки</h2>
        <table className={classes.table}>
          <thead>
            <tr>
              <th>№ позиции</th>
              <th>Наименование</th>
              <th>Кол-во</th>
              <th>ед. изм</th>
              <th>Статус</th>
              <th>Договор</th>
              <th>Дата поставки</th>
            </tr>
          </thead>
          <tbody>
            {content.map((item, index) => (
              <tr key={index}>
                <td>{item.position}</td>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>{item.unit}</td>
                <td>{item.status}</td>
                <td>{item.contract}</td>
                <td>{item.deliveryDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Button onClick={onClose} text="Закрыть" />
      </div>
    </div>
  );
};

export default Content;
