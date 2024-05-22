import { addRoomRequest } from "../../services/api.js";

export const addRoom = () => {
  const saveRoom = async (idUser, roomData) => {
    const response = await addRoomRequest(idUser, roomData);
    if (response.error) {
      return alert("Error al agregar la habitación");
    }
  };

  return { saveRoom };
};
