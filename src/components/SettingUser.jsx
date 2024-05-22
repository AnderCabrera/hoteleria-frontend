import React, { useEffect, useState } from "react";
import MyNavbar from "./Navbar";
import { LogoSinLetras } from "./logoSinLetras.jsx";
import { Input } from "./Input.jsx";
import {
  deleteUserRequest,
  getUserRequest,
  updateUserRequest,
} from "../services/api.js";

export const SettingUser = () => {
  const [user, setUser] = useState({
    name: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    const id = localStorage.getItem("_id");
    getUserRequest(id)
      .then((response) => {
        if (!response.error) {
          setUser({
            ...response.data.foundedUser,
            password: "",
            passwordConfirm: "",
          });
        } else {
          setMessage("Error obteniendo datos del usuario");
        }
      })
      .catch((err) => setMessage("Error en la solicitud"));
  }, []);

  const handleChange = (value, field) => {
    setUser((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const id = localStorage.getItem("_id");
    const updateData = {
      name: user.name,
      lastname: user.lastname,
      username: user.username,
      email: user.email,
      password: user.password,
    };

    const response = await updateUserRequest(id, updateData);
    if (!response.error) {
      setMessage("Usuario actualizado correctamente");
    } else {
      setMessage("Error actualizando el usuario");
    }
  };

  const handleDelete = () => {
    const id = localStorage.getItem("_id");
    deleteUserRequest(id)
      .then((response) => {
        if (!response.error) {
          setMessage("Usuario eliminado correctamente");
        } else {
          setMessage("Error eliminando el usuario");
        }
      })
      .catch((err) => setMessage("Error en la solicitud"));
  };

  return (
    <>
      <MyNavbar />
      <div className="registro template d-flex justify-content-center align-items-center 110-w vh-110">
        <LogoSinLetras text={"Kinal Stay"} />
        <div className="form-container 50-w p-5 rounded">
          {message && <div className="alert alert-info">{message}</div>}
          <form onSubmit={handleUpdate}>
            <div className="mb-2">
              <Input
                field="name"
                label="Nombre"
                type="text"
                value={user.name}
                onChangeHandler={handleChange}
              />
            </div>
            <div className="mb-2">
              <Input
                field="lastname"
                label="Apellido"
                type="text"
                value={user.lastname}
                onChangeHandler={handleChange}
              />
            </div>
            <div className="mb-2">
              <Input
                field="username"
                label="Username"
                type="text"
                value={user.username}
                onChangeHandler={handleChange}
              />
            </div>
            <div className="mb-2">
              <Input
                field="email"
                label="Correo electrónico"
                type="email"
                value={user.email}
                onChangeHandler={handleChange}
              />
            </div>
            <div className="mb-2">
              <Input
                field="password"
                label="Contraseña Antigua"
                type="password"
                value={user.password}
                placeholder="Escribe aquí la contraseña actual"
                onChangeHandler={handleChange}
              />
            </div>
            <div className="mb-2">
              <Input
                field="passwordConfirm"
                label="Confirmación de contraseña"
                type="password"
                value={user.passwordConfirm}
                placeholder="Escribe la contraseña nueva"
                onChangeHandler={handleChange}
              />
            </div>
            <div className="button-container d-flex justify-content-between">
              <button type="submit" className="btn btn-primary">
                Actualizar
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="btn btn-primary"
              >
                Eliminar
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
