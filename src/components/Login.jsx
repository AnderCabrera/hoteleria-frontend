import React, { useState } from "react";
import "./Auth.css";
import { Input } from "./Input.jsx";
import {
  validateUsername,
  usernameValidationMessage,
} from "../shared/validators/username.validator.js";
import {
  passwordValidationMessage,
  validatePassword,
} from "../shared/validators/password.validator.js";
import { LogoSinLetras } from "./logoSinLetras.jsx";
import { useLogin } from "../shared/hooks/useLogin.jsx";

export const Login = () => {
  const { login, isLoading } = useLogin();

  const [formData, setFormData] = useState({
    username: {
      value: "",
      isValid: false,
      showError: false,
    },
    password: {
      value: "",
      isValid: false,
      showError: false,
    },
  });

  const onValueChange = (value, field) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: {
        ...prevData[field],
        value,
      },
    }));
  };

  const handleValidationOnBlur = (value, field) => {
    let isValid = false;
    switch (field) {
      case "username":
        isValid = validateUsername(value);
        break;
      case "password":
        isValid = validatePassword(value);
        break;
      default:
        break;
    }
    setFormData((prevData) => ({
      ...prevData,
      [field]: {
        ...prevData[field],
        isValid,
        showError: !isValid,
      },
    }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    login(formData.username.value, formData.password.value);
  };

  return (
    <div className="registro template d-flex justify-content-center align-items-center 100-w vh-100">
      <LogoSinLetras text={"Kinal Stay"} />
      <div className="form-container 40-w p-5 rounded">
        <form onSubmit={handleLogin}>
          <div className="mb-2">
            <Input
              field="username"
              label="Usuario"
              value={formData.username.value}
              onChangeHandler={onValueChange}
              type="text"
              onBlurHandler={handleValidationOnBlur}
              showErrorMessage={formData.username.showError}
              validationMessage={usernameValidationMessage}
              placeholder="Escribe aqui tu correo usuario"
            />
          </div>
          <div className="mb-2">
            <Input
              field="password"
              label="Contraseña"
              value={formData.password.value}
              onChangeHandler={onValueChange}
              type="password"
              onBlurHandler={handleValidationOnBlur}
              showErrorMessage={formData.password.showError}
              validationMessage={passwordValidationMessage}
              placeholder="Escribe aqui tu contraseña"
            />
          </div>
          <div className="button-container">
            <button className="btn btn-primary">Iniciar Sesión</button>
          </div>
          <p className="mt-3">
            ¿No tienes una cuenta?
            <a href="/registro">Registrate</a>
          </p>
        </form>
      </div>
    </div>
  );
};
