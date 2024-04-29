import { useState } from 'react'
import  './Pages/Dashboard/Dashboard.css'
import { Dashboard } from './Pages/Dashboard/Dashboard.jsx'
import Instagram from '../src/assets/img/Instagram.png'
import Facebook from '../src/assets/img/Facebook.png'
import Telefono from '../src/assets/img/Telefono.png'
import WhatsApp from '../src/assets/img/WhatsApp.png'


function App() {
  return (
    <>
    <Dashboard/>
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
        <h4>©Copyright 2023 Kina Stay All Rights Reserved</h4>
      </div>
    </footer>
    </>
  )
}

export default App
