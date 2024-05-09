import React, { useState, useEffect } from 'react';
import MyNavbar from '../../components/Navbar.jsx';
import fondo from '../../assets/img/FondoVistaPrincipal.jpg';
import logoNombre from '../../assets/img/LogoConNombre.png'
import './HomePage.css';
import HotelesCard from '../../components/HotelesCard.jsx'
import { hotelGet } from '../../shared/hooks/hotelGet.jsx';
import Card from '../../components/HotelesCard.jsx';
const cardProps = {
  image: 'https://definicion.de/wp-content/uploads/2009/09/hotel.jpg',
  name: 'Nombre del hotel',
  info: 'Información adicional sobre el hotel'
};


const countries = ['Guatemala', 'Canadá', 'México', 'Estados Unidos', 'Argentina', 'Brasil', 'España', 'Francia', 'Italia', 'China'];


export const HomePage = () => {
    const { hoteles, isFetching, getHoteles } = hotelGet(); // Llama a hotelGet dentro del cuerpo del componente

    useEffect(() => {
      // Llama a la función para obtener datos de hoteles cuando el componente se monta
      getHoteles();
      console.log(hoteles)
      // Llama a la función getHoteles del hook dentro de useEffect
    }, []);
  

  const [currentCountryIndex, setCurrentCountryIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentCountryIndex(prevIndex =>
        prevIndex === countries.length - 1 ? 0 : prevIndex + 1
      );
    }, 2000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <MyNavbar  />
      <div className='img-container'>
        <img className='img-Fondo' src={fondo} alt="" />
        <div className='text-overlay'>
          <h1 style={{color: 'black'}}>Bienvenido a Kinal Stay <br /> Visita: {countries[currentCountryIndex]}</h1>
        </div>
      </div>
      <div className='container-cards'>
          <Card {...cardProps} />
          <Card {...cardProps} />
          <Card {...cardProps} />
          <Card {...cardProps} />
          <Card {...cardProps} />
          <Card {...cardProps} />
          <Card {...cardProps} />
          <Card {...cardProps} />
          <Card {...cardProps} />
      </div>
      <div className='container-letters'>
        <h1>CONOCE MÁS SOBRE NOSOTROS</h1>
        <br /><br />
      </div>
      <div className='container-information'>
        <div className='container-information-left'>
          <img src={logoNombre} alt="" />
        </div>
        <div className='container-information-right'>
            <h2>¿QUIENES SOMOS?</h2>
            <p className='container-information-letter'>
              Kinal Stay S.A, Somos una Empresa de hotelería dedicada a proporcionar servicios de alojamiento y hospitalidad a los huéspedes que viajan por placer o negocios.Trabajamos con diferentes hoteles alrededor del mundo que operan hoteles, resorts, posadas u otras formas de alojamiento temporal.
            </p>
            <br /><br />
            <h2>MISIÓN</h2>
            <p className='container-information-letter'>
              Nuestra misión es ofrecer un servicio seguro, confiable y eficaz a todos nuestros clientes, contamos con distintos precios, muy accesibles y cómodos..
            </p>
        </div>
      </div>
    </>
  );
};

export default HomePage;