import React, { useEffect, useState } from "react";
import MyNavbar from "./Navbar";
import { LogoSinLetras } from "./logoSinLetras.jsx";
import { Input } from "./Input.jsx";
import { deleteUser } from "../shared/hooks/deleteUser.jsx";
import { getUser } from "../shared/hooks/getUser.jsx";
import { getUserRequest } from "../services/api.js";

export const SettingUser = () => {
  // const { users, isFetching, getUsers } = getUser()
  const { usedeleteUser } = deleteUser();
  const id = localStorage.getItem("_id");

  const [user, setUser] = useState({});

  useEffect(() => {
    let idtest = localStorage.getItem("_id");
    getUserRequest(idtest)
      .then((user) => user.data)
      .then((user) => {
        setUser(user.foundedUser);
      });
  }, []);
  const handleChange = (value, field) => {
    setUser((prevData) => ({
      ...prevData,
      [field]: {
        ...prevData[field],
        value,
      },
    }));
  };

  return (
    <>
      <MyNavbar />

      <div className="registro template d-flex justify-content-center align-items-center 110-w vh-110">
        <LogoSinLetras text={"Kinal Stay"} />
        <div className="form-container 50-w p-5 rounded ">
          <form>
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
                placeholder="Escribe aqui la contraseña actual"
                onChangeHandler={handleChange}
              />
            </div>
            <div className="mb-2">
              <Input
                field="passwordConfirm"
                label="Confirmación de contraseña"
                type="password"
                placeholder="Escribe la contraseña nueva"
                onChangeHandler={handleChange}
              />
            </div>
            <div className="button-container d-flex justify-content-between ">
              <button className="btn btn-primary">Actualizar</button>
              <button
                onClick={() => usedeleteUser(id)}
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
