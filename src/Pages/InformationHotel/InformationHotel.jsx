import React, { useEffect, useState } from 'react'
import MyNavbar from '../../components/Navbar'
import './InformationHotel.css'

import { getRoomRequest, getTypeRoomRequest } from '../../services/api'
import { useLocation, useNavigate } from 'react-router-dom'


const InformationHotel = () => {
  const [typeRoom, setTypeRoom] = useState([])
  const location = useLocation()
  const {hotel} = location.state
  const [room, setRoom] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    getTypeRoomRequest()
      .then((typeRoom) => typeRoom.data)
      .then((typeRoom) => {
        setTypeRoom(typeRoom.typeRoomsFounded)
      })
  }, [])
    
  const handleOnClick = (idRoom) => {
    console.log(hotel._id)
    getRoomRequest(hotel._id, idRoom)
      .then((room) => room.data)
      .then((room) => {
        setRoom(room.foundedRooms)
      })
      .catch((error) => {
        console.error('Error fetching rooms:', error);
      });
  }



  const hanldleChange = (rooms) =>{
    navigate('/InformationService',{state: rooms})
    console.log(rooms)
  }

  return (
    <>
      <MyNavbar />
      <p className='name'>Tipo de Habitaciones</p>
      <br />
      <div className='d-flex'>
        {
          typeRoom.map((typeRoom) => (
            <button
              onClick={() => handleOnClick(typeRoom._id)}
              key={typeRoom._id}
              className='button-typeRoom'
            >
              {typeRoom.name}
            </button>
          ))
        }
      </div>
      <br />
      <p className='name'>Habitaciones disponibles</p>
      {room === null ? (
        <div className='container-null'> 
        </div>
      ) : room.length === 0 ? ( 
        <div className='container-null'>No hay habitaciones disponibles por el momento</div>
      ) : (
        <div className='container-cards'>
          {
             room.map((rooms)=>(
              <div className='card'>
              <div className='card-info'>
             {/*  <img src={image} alt={name} className='card-image'/> */}
                  <p className='card-name'>Capacidad de personas: {rooms.peopleCapacity}</p>
                  <p className='card-name'>Precio por Noche: $.{rooms.nightPrice}.00</p>
                  <p className='card-name'>Descripción: {rooms.description}</p>
                  <button className='card-button' onClick={() => hanldleChange(rooms)} >Reservar</button>
              </div>
          </div>
            ))
          }
          </div>
      )}
    </>


  )
}

export default InformationHotel
