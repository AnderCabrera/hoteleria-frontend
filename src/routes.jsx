// Rutas
import { Route } from 'react-router-dom';
import { Registro } from './components/Registro.jsx';
import { Login } from './components/Login.jsx';
import { HotelContainer } from './components/HotelContainer.jsx';
import { Dashboard } from './Pages/Dashboard/Dashboard.jsx';
import { HomePage } from './Pages/HomePage/HomePage.jsx';
import { SettingUser } from './components/SettingUser.jsx';
import { AdminContainer } from './components/Admin/AdminContainer.jsx';
import HotelPage from './Pages/HotelPage/HotelPage.jsx'; // Importar sin llaves

export const routes = [
    { path: '/registro', element: <Registro /> },
    { path: '/login', element: <Login /> },
    { path:'/settingUser', element:<SettingUser /> },
    { path: '/Hotel/*', element:<HotelContainer /> },
    { path: '/Admin/*', element:<AdminContainer /> }, 
    { path: '/HotelPage', element:<HotelPage /> },
    { path: '*', element: <HomePage /> }
];
