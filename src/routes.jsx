import {Registro} from './components/Registro.jsx'
import { Login } from './components/Login.jsx'
import {HotelContainer} from './components/HotelContainer.jsx'
import { Dashboard } from './Pages/Dashboard/Dashboard.jsx'
import HomePage from './Pages/HomePage/HomePage.jsx'
import { SettingUser } from './components/SettingUser.jsx'

export const routes = [
    {path: '/registro', element: <Registro/>},
    {path: '/login', element: <Login/>},
    {path:'/settingUser',element:<SettingUser/> },
    {path: '/Hotel/*', element:<HotelContainer/>},
    {path: '*', element: <HomePage/>}

]