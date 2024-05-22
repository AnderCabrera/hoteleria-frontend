import React, { useState } from 'react';
import { getUserRequest } from '../../services/api.js';

export const getUser = () => {
  const [users, setUsers] = useState(null);
  const getUsers = async () => {
    const id = localStorage.getItem('_id');
    const response = await getUserRequest(id);
    if (response.error) {
      alert(response.err.data.message || 'Error con el usuario');
    }
    setUsers(response.data);
  };
  return {
    users,
    isFetching: !users,
    getUsers,
  };
};
