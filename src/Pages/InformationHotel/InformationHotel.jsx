import React, { useEffect, useState } from 'react'
import MyNavbar from '../../components/Navbar'
import './InformationHotel.css'
import { getTypeRoomRequest } from '../../services/api'


const InformationHotel = () => {
  const [typeRoom, setTypeRoom] = useState([])

  useEffect(() => {
    getTypeRoomRequest()
      .then((typeRoom) => typeRoom.data)
      .then((typeRoom) => {
        setTypeRoom(typeRoom.typeRoomsFounded)
      })
  }, [])
  console.log(typeRoom)



  return (
    <>
      <MyNavbar />
        <p className='name'>Tipo de Habitaciones</p>
       <br />
      <div className='d-flex'>
        {
          typeRoom.map((typeRoom) => (
            <button key={typeRoom._id} className='button-typeRoom'>{typeRoom.name} </button>
          ))
        }
      </div>
      <br />
      <p className='name'>Habitaciones disponibles</p>


    </>
  )
}

export default InformationHotel
