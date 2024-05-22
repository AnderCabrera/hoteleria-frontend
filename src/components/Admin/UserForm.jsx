import { useEffect, useState } from 'react';
import { addUser } from '../../services/user.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import withReactContent from 'sweetalert2-react-content';

const ReactSwal = withReactContent(Swal);

export const UserForm = ({ onUserAdded }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    name: '',
    lastname: '',
    role: '',
    tp_status: '',
  });

  const { username, email, password, name, lastname, role, tp_status } =
    formData;

  const handleSubmit = (e) => {
    e.preventDefault();
    addUser({
      username,
      email,
      password,
      name,
      lastname,
      role,
      tp_status,
    })
      .then(() => {
        onUserAdded();
        setFormData({
          username: '',
          email: '',
          password: '',
          name: '',
          lastname: '',
          role: '',
          tp_status: '',
        });
        ReactSwal.fire({
          title: 'Success',
          text: 'User added successfully',
          icon: 'success',
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        ReactSwal.fire({
          title: 'Error',
          text: error.message,
          icon: 'error',
          showConfirmButton: true,
        });
      });
  };

  const changeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });

    if (e.target.id === 'taskStatus') {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value === 'true',
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#333] shadow-lg rounded p-4 mb-6 w-[50%]"
    >
      <div className="mb-4">
        <label
          className="block text-white text-sm font-bold mb-2"
          htmlFor="username"
        >
          Usuario
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
          id="username"
          type="text"
          placeholder="Usuario"
          onChange={changeHandler}
          value={username}
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-white text-sm font-bold mb-2"
          htmlFor="email"
        >
          Correo electrónico
        </label>
        <textarea
          className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
          id="email"
          type="email"
          placeholder="Correo electrónico"
          onChange={changeHandler}
          value={email}
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-white text-sm font-bold mb-2"
          htmlFor="password"
        >
          Contraseña
        </label>
        <textarea
          className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
          id="password"
          type="password"
          placeholder="Contraseña"
          onChange={changeHandler}
          value={password}
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-white text-sm font-bold mb-2"
          htmlFor="name"
        >
          Nombre
        </label>
        <textarea
          className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
          id="name"
          placeholder="Nombre"
          onChange={changeHandler}
          value={name}
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-white text-sm font-bold mb-2"
          htmlFor="lastname"
        >
          Apellido
        </label>
        <textarea
          className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
          id="lastname"
          placeholder="Apellido"
          onChange={changeHandler}
          value={lastname}
        />
      </div>
      <div className="mb-6 flex flex-col">
        <label
          className="block text-white text-sm font-bold mb-2"
          htmlFor="role"
        >
          Rol
        </label>
        <select
          id="role"
          name="role"
          onChange={changeHandler}
          className={
            'border rounded py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline'
          }
          value={role}
        >
          <option value="">Seleccione un rol</option>
          <option value="ADMIN_APP">Administrador Plataforma</option>
          <option value="ADMIN_HOTEL">Administrador Hotel</option>
          <option value="CLIENT">Usuario</option>
        </select>
      </div>
      <div className="mb-6 flex flex-col">
        <label
          className="block text-white text-sm font-bold mb-2"
          htmlFor="tp_status"
        >
          Status
        </label>
        <select
          id="tp_status"
          name="tp_status"
          onChange={changeHandler}
          className="border rounded py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
          value={tp_status}
        >
          <option value="">Seleccione un estado</option>
          <option value="ACTIVE">Activo</option>
          <option value="DELETED">Eliminado</option>
          <option value="BANNED">Restringido</option>
        </select>
      </div>
      <div className="flex items-center justify-between">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Agregar usuario
        </button>
      </div>
    </form>
  );
};
