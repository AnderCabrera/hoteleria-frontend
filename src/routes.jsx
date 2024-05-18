// Rutas
import { Registro } from './components/Registro.jsx';
import { Login } from './components/Login.jsx';
import { HotelContainer } from './components/HotelContainer.jsx';
import { HomePage } from './Pages/HomePage/HomePage.jsx';
import { SettingUser } from './components/SettingUser.jsx';
import InformationHotel from './Pages/InformationHotel/InformationHotel.jsx';
import { AdminContainer } from './components/Admin/AdminContainer.jsx';
import HotelPage from './Pages/HotelPage/HotelPage.jsx'; // Importar sin llaves
import { InformationService } from './Pages/InformationService/InformationService.jsx';
import { Reservation } from './Pages/Reservation/Reservation.jsx';

export const routes = [
    { path: '/registro', element: <Registro /> },
    { path: '/login', element: <Login /> },
    { path:'/settingUser', element:<SettingUser /> },
    { path: '/Hotel/*', element:<HotelContainer /> },
    { path: '/Admin/*', element:<AdminContainer /> }, 
    { path: '/HotelPage', element:<HotelPage /> },
    {path: '/InformationHotel', element:<InformationHotel/> },
    {path: '/InformationService', element:<InformationService/>},
    {path : '/Reservation', element:<Reservation/> },
    { path: '*', element: <HomePage /> }
];
