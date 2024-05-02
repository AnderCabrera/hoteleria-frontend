import {Registro} from './components/Registro.jsx'
import { Login } from './components/Login.jsx'
import { Dashboard } from './Pages/Dashboard/Dashboard.jsx'

export const routes = [
    {path: '/registro', element: <Registro/>},
    {path: '/login', element: <Login/>},
    {path: '/*', element: <Dashboard/>}
]