import { useState } from 'react';
import './HotelCard.css';

const Card = ({ image, name, info }) => {

  const [selected, setSelected] = useState(false);
 
  const handleHeartClick = () => {
    setSelected(!selected);
    console.log(selected)
  };
  return (
    <div className="card">
      <img src={image} alt={name} className="card-image" />
      <div className="card-info">
        <p className="card-name">{name}</p>
        <p className="card-info-text">{info}</p>
        <button className="card-button">Reserva ahora</button>
        <div
            className={`heart ${selected ? 'selected' : ''}`}
            onClick={handleHeartClick}
>
            {/* No se necesita contenido */}
        </div>
      </div>
    </div>
  );
};

export default Card;
/* 
    const [hotel,setHoteles] = useState(
      {
        _id: '',
        name: '',
        description: '',
       
      }
    )
   
    const noData = (
      <>
        <div className="m-5 d-flex align-items-center justify-content-center">
          No hay datos :(
        </div>
      
      </>
  )
    const getHotel = (hotel)=>{
      setHoteles(hotel)
    } 

  return (
    <>
    {
     
        hoteles.map((hotel)=>(
          
          <div  className="card">
          <img   className="card-image" />
          <div className="card-info">
            <p className="card-name">{hotel.name}</p>
            <p className="card-info-text">{hotel.description}</p>
            <button className="card-button">Reserva ahora</button>
          </div>
        </div>
        ))
      
    }
    </>
    
   
    
  );
   */

