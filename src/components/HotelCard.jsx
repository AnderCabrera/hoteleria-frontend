import React from 'react';
import './HotelCard.css';

const Card = ({ image, name, info }) => {
  return (
    <div className="card">
      <img src={image} alt={name} className="card-image" />
      <div className="card-info">
        <p className="card-name">{name}</p>
        <p className="card-info-text">{info}</p>
        <button className="card-button">Reserva ahora</button>
      </div>
    </div>
  );
};

export default Card;
