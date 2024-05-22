import React from 'react';
import { deleteUserRequest } from '../../services/api';

export const deleteUser = () => {
  const usedeleteUser = async (id) => {
    const response = await deleteUserRequest(id);
    if (response.error) {
      alert('error al eliminar');
    }
    alert('usuario eliminado');
  };
  return {
    usedeleteUser,
  };
};
