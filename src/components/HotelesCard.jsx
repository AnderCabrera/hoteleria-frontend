import React, { useState } from 'react';
import './HotelCard.css';

export const HotelesCard = ({hoteles =[]}) => {
    return(
      <div>hola</div>
    )
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
};

export default HotelesCard;
