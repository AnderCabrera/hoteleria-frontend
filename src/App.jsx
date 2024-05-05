import  './Pages/HomePage/HomePage.css'
import Instagram from '../src/assets/img/Instagram.png'
import Facebook from '../src/assets/img/Facebook.png'
import Telefono from '../src/assets/img/Telefono.png'
import WhatsApp from '../src/assets/img/WhatsApp.png'
import { Toaster } from "react-hot-toast"
import { useRoutes } from "react-router-dom"
import { routes } from "./routes.jsx"
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {

  const element = useRoutes(routes)

  return (
    <>
    {element}
    <Toaster position="bottom-rigth" reverseOrder={false}/>
    <footer>
      <div className='container-letters'>
        <br />
        <h2>Kinal Stay</h2>
        <br />
        <div className='img-footer'>
            <img className='img-footer-icon'   src={Instagram} alt="" />
            <img className='img-footer-icon' src={Facebook} alt="" />
            <img className='img-footer-icon' src={Telefono} alt="" />
            <img className='img-footer-icon' src={WhatsApp} alt="" />
        </div>
        <br />
        <h4>©Copyright 2023 Kinal Stay All Rights Reserved</h4>
      </div>
    </footer>
    </>
  )
}

export default App
