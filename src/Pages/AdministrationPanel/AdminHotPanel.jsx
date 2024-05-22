import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // Importar useLocation y useNavigate
import MyNavbar from "../../components/Navbar";
import { LogoSinLetras } from "../../components/logoSinLetras";
import { Input } from "../../components/Input.jsx";
import { addRoom } from "../../shared/hooks/addRoom.jsx";
import { getRoomHotelRequest, getImgRoomRequest } from "../../services/api.js";

export const AdminHotPanel = () => {
  const { saveRoom } = addRoom();
  const [room, setRoom] = useState([]);
  const [imgRooms, setImgRooms] = useState([]);

  const [formData, setFormData] = useState({
    description: {
      value: "",
      isValid: false,
      showError: false,
    },
    peopleCapacity: {
      value: "",
      isValid: false,
      showError: false,
    },
    nightPrice: {
      value: "",
      isValid: false,
      showError: false,
    },
    roomType: {
      value: "",
      isValid: false,
      showError: false,
    },
    url: {
      value: "",
      isValid: false,
      showError: false,
    },
  });

  const fetchRoomsAndImages = async () => {
    try {
      const userId = localStorage.getItem("_id");
      if (userId) {
        const roomResponse = await getRoomHotelRequest(userId);
        const rooms = roomResponse.data.foundedRooms;
        setRoom(rooms);

        const imgPromises = rooms.map((room) => getImgRoomRequest(room._id));
        const imgResults = await Promise.all(imgPromises);

        const imgUrls = imgResults.map((imgResult) => {
          if (imgResult.data.foundedImageRoom.length > 0) {
            return imgResult.data.foundedImageRoom.map(
              (image) => image.image_url,
            );
          } else {
            return [];
          }
        });

        setImgRooms(imgUrls);
      }
    } catch (error) {
      console.error("Error fetching rooms or images:", error);
    }
  };

  useEffect(() => {
    fetchRoomsAndImages();
  }, []);

  const onValueChange = (value, field) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: {
        ...prevData[field],
        value,
      },
    }));
  };

  const handleAddRoom = async (e) => {
    e.preventDefault();
    const idUsuario = localStorage.getItem("_id");

    const roomData = {
      description: formData.description.value,
      peopleCapacity: formData.peopleCapacity.value,
      nightPrice: formData.nightPrice.value,
      roomType: formData.roomType.value,
      url: formData.url.value,
    };

    try {
      await saveRoom(idUsuario, roomData);
      await fetchRoomsAndImages();
    } catch (error) {
      console.error("Error saving room:", error);
    }
  };

  return (
    <>
      <MyNavbar />
      <div className="d-flex">
        <div className="w-50">
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
                      Precio por Noche: ${rooms.nightPrice}.00
                    </p>
                    <p className="card-name">
                      Descripción: {rooms.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="w-50">
          <div className="registro template d-flex justify-content-center align-items-center 110-w vh-110">
            <LogoSinLetras text={"Kinal Stay"} />
            <div className="form-container w-50 p-5 rounded ">
              <form onSubmit={handleAddRoom}>
                <div className="mb-2">
                  <Input
                    field="description"
                    label="Descripción"
                    type="text"
                    value={formData.description.value}
                    placeholder="Descripción de la habitación"
                    onChangeHandler={onValueChange}
                  />
                </div>
                <div className="mb-2">
                  <Input
                    field="peopleCapacity"
                    label="Capacidad de Personas"
                    type="text"
                    value={formData.peopleCapacity.value}
                    placeholder="Capacidad"
                    onChangeHandler={onValueChange}
                  />
                </div>
                <div className="mb-2">
                  <Input
                    field="nightPrice"
                    label="Precio por noche"
                    type="text"
                    value={formData.nightPrice.value}
                    placeholder="Precio"
                    onChangeHandler={onValueChange}
                  />
                </div>
                <div className="mb-2">
                  <Input
                    field="roomType"
                    label="Tipo de Habitación"
                    type="text"
                    value={formData.roomType.value}
                    placeholder="Tipo de Habitación"
                    onChangeHandler={onValueChange}
                  />
                </div>
                <div className="mb-2">
                  <Input
                    field="url"
                    label="Imagen de la habitación"
                    type="text"
                    value={formData.url.value}
                    placeholder="Url de la imagen"
                    onChangeHandler={onValueChange}
                  />
                </div>
                <div className="button-container">
                  <button type="submit" className="btn btn-primary">
                    Agregar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
