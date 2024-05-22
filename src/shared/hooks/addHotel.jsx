import React from 'react';
import { addHotelRequest } from '../../services/api';

export const addHotel = () => {
  const saveHotel = async (hotel) => {
    const response = await addHotelRequest(hotel);
    if (response.error) {
      return alert('Error al agregar hotel');
    }
  };
  return {
    saveHotel,
  };
};
