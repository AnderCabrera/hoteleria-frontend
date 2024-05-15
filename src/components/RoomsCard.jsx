import React from 'react'
import './HotelCard.css'

const RoomsCard = ({image, name, info}) => {
  return (
    <div className='card'>
        <div className='card-info'>
        <img src={image} alt={name} className='card-image'/>
            <p className='card-name'>{name}</p>
            <p className='card-info-text'>{info}</p>
            <button className='card-button'>información</button>
        </div>
    </div>
  )
}


export default RoomsCard;