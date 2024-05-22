import { useState } from 'react';
import { getHotelRequest } from '../../services/api';

export const hotelGet = () => {
  const [hoteles, setHoteles] = useState(null);

  const getHoteles = async () => {
    const response = await getHotelRequest();
    if (response.error) {
      alert(
        response.err.response.data.message || 'Error al obtener los hoteles',
      );
    }
    setHoteles(response.data);
  };
  console.log(hoteles);
  return {
    hoteles,
    isFetching: !hoteles,
    getHoteles,
  };
};
