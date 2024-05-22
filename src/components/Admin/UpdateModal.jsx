import { useState } from 'react';
import { updateUser } from '../../services/user.service';

export const UpdateModal = ({ user, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    name: user.name,
    lastname: user.lastname,
    username: user.username,
    email: user.email,
    password: user.password,
    role: user.role,
    tp_status: user.tp_status,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    updateUser(user._id, {
      name: formData.name,
      lastname: formData.lastname,
      username: formData.username,
      email: formData.email,
      password: formData.password,
      role: formData.role,
      tp_status: formData.tp_status,
    }).then(() => {
      onUpdate();
      onClose();
    });
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center ">
      <div className="bg-[#222] p-8 rounded-lg w-96">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2">
              Usuario
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Usuario"
              onChange={handleChange}
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
              placeholder="Correo electrónico"
              onChange={handleChange}
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
              placeholder="Contraseña"
              onChange={handleChange}
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
              onChange={handleChange}
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
              onChange={handleChange}
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
              onChange={handleChange}
              className={
                'border rounded py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline'
              }
              value={role}
            >
              <option>Administrador Plataforma</option>
              <option>Administrador Hotel</option>
              <option>Usuario</option>
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
              onChange={handleChange}
              className={
                'border rounded py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline'
              }
              value={tp_status}
            >
              <option>Activo</option>
              <option>Eliminado</option>
              <option>Restringido</option>
            </select>
          </div>
          <div className="flex justify-center w-full gap-4">
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-1/2"
              onClick={onClose}
            >
              Cancelar
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-1/2"
              type="submit"
            >
              Actualizar Usuario
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
