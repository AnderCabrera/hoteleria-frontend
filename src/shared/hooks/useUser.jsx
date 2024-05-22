import { useState } from 'react';
import {
  registerRequest,
  deleteUserRequest,
  getUsersRequest,
  updateUserRequest,
} from '../../services/api';
import toast from 'react-hot-toast';

export const newUser = () => {
  const [isLoading, setIsLoading] = useState(false);

  const register = async (
    name,
    lastname,
    username,
    email,
    password,
    role,
    tp_status,
  ) => {
    setIsLoading(true);
    const user = {
      name,
      lastname,
      username,
      email,
      password,
      role,
      tp_status,
    };
    const response = await registerRequest(user);
    setIsLoading(false);
    if (response.error) {
      if (response?.err?.response?.data?.errors) {
        let arr = response?.err?.response?.data?.errors;
        for (const error of arr) {
          return toast.error(error.msg);
        }
      }
      return toast.error(
        response?.err?.response?.data?.msg ||
          response?.err?.data?.msg ||
          'Error al registrar el usuario, intenta de nuevo.',
      );
    } else if (response) {
      return toast.success('Usuario agregado exitosamente');
    }
    console.log(response);
  };

  return {
    register,
    isLoading,
  };
};

export const getUsers = () => {
  const [users, setUsers] = useState(null);
  const getUsers = async () => {
    const response = await getUsers();
    if (response.error) {
      if (response?.err?.response?.data?.errors) {
        let arr = response?.err?.response?.data?.errors;
        for (const error of arr) {
          return toast.error(error.msg);
        }
      }
      return toast.error(
        response?.err?.response?.data?.msg ||
          response?.err?.data?.msg ||
          'Error obteniendo usuarios',
      );
    } else if (response) {
      return toast.success('Usuarios obtenidos correctamente');
    }
    setUsers(response.data);
  };
  return {
    users,
    isFetching: !users,
    getUsers,
  };
};

export const deleteUser = (id) => {
  const deleteUser = async () => {
    const response = await deleteUserRequest(id);
    if (response.error) {
      if (response?.err?.response?.data?.errors) {
        let arr = response?.err?.response?.data?.errors;
        for (const error of arr) {
          return toast.error(error.msg);
        }
      }
      return toast.error(
        response?.err?.response?.data?.msg ||
          response?.err?.data?.msg ||
          'Error eliminando usuario',
      );
    } else if (response) {
      return toast.success('Usuario eliminado correctamente');
    }
  };
  return {
    deleteUser,
  };
};

export const updateUser = (id, name, lastname, username, email, password) => {
  const updateUser = async () => {
    const user = {
      name,
      lastname,
      username,
      email,
      password,
    };
    const response = await updateUserRequest(id, user);
    if (response.error) {
      if (response?.err?.response?.data?.errors) {
        let arr = response?.err?.response?.data?.errors;
        for (const error of arr) {
          return toast.error(error.msg);
        }
      }
      return toast.error(
        response?.err?.response?.data?.msg ||
          response?.err?.data?.msg ||
          'Error actualizando usuario',
      );
    } else if (response) {
      return toast.success('Usuario actualizado correctamente');
    }
  };
  return {
    updateUser,
  };
};
