import { useEffect, useState } from "react";
import MyNavbar from "../../components/Navbar";
import "./InformationHotel.css";

import {
  getRoomRequest,
  getTypeRoomRequest,
  getImgRoomRequest,
} from '../../services/api';
import { useLocation, useNavigate } from 'react-router-dom';

const InformationHotel = () => {
  const [typeRoom, setTypeRoom] = useState([]);
  const location = useLocation();
  const { hotel } = location.state;
  const [room, setRoom] = useState([]);
  const [imgRooms, setImgRooms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getTypeRoomRequest()
      .then((response) => response.data)
      .then((data) => {
        setTypeRoom(data.typeRoomsFounded);
      })
      .catch((error) => {
        console.error('Error fetching room types:', error);
      });
  }, []);

  const handleOnClick = (idRoom) => {
    getRoomRequest(hotel._id, idRoom)
      .then((response) => response.data)
      .then((data) => {
        setRoom(data.foundedRooms);
      })
      .catch((error) => {
        console.error('Error fetching rooms:', error);
      });
  };

  useEffect(() => {
    const fetchImgHotel = async () => {
      const imgPromises = room.map((rooms) => getImgRoomRequest(rooms._id));
      const imgResults = await Promise.all(imgPromises);

      const imgUrls = imgResults.map((imgResult) => {
        if (imgResult.data.foundedImageRoom.length > 0) {
          return imgResult.data.foundedImageRoom.map(
            (image) => image.image_url,
          );
        }
      });
      setImgRooms(imgUrls);
    };
    fetchImgHotel();
  }, [room]);

  const handleChange = (rooms) => {
    navigate('/InformationService', { state: { rooms } });
    console.log(rooms);
  };

  return (
    <>
      <MyNavbar />
      <p className="name">Tipo de Habitaciones</p>
      <br />
      <div className="d-flex">
        {typeRoom.map((typeRoom) => (
          <button
            onClick={() => handleOnClick(typeRoom._id)}
            key={typeRoom._id}
            className="button-typeRoom"
          >
            {typeRoom.name}
          </button>
        ))}
      </div>
      <br />
      <p className="name">Habitaciones disponibles</p>
      {room === null ? (
        <div className="container-null"></div>
      ) : room.length === 0 ? (
        <div className="container-null">
          No hay habitaciones disponibles por el momento
        </div>
      ) : (
        <div className="container-cards">
          {room.map((rooms, index) => (
            <div className="card" key={rooms._id}>
              <div className="card-info">
                {imgRooms[index] ? (
                  <img
                    src={imgRooms[index]}
                    alt={`Imagen de la habitación ${rooms._id}`}
                    className="card-image"
                  />
                ) : (
                  <div className="card-image-placeholder">
                    Imagen no disponible
                  </div>
                )}
                <p className="card-name">
                  Capacidad de personas: {rooms.peopleCapacity}
                </p>
                <p className="card-name">
                  Precio por Noche: $.{rooms.nightPrice}.00
                </p>
                <p className="card-name">Descripción: {rooms.description}</p>
                <button
                  className="card-button"
                  onClick={() => handleChange(rooms)}
                >
                  Reservar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default InformationHotel;
