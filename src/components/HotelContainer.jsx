import React, { useEffect } from 'react'
import { hotelGet } from '../shared/hooks/hotelGet';
import { Route,Routes } from 'react-router-dom';
import HotelesCard from './HotelesCard';
import MyNavbar from './Navbar';

export const HotelContainer = () => {
  const { hoteles, isFetching, getHoteles } = hotelGet(); // Llama a hotelGet dentro del cuerpo del componente

  useEffect(() => {
    // Llama a la función para obtener datos de hoteles cuando el componente se monta
    getHoteles();
    console.log(hoteles)
    // Llama a la función getHoteles del hook dentro de useEffect
  }, []);

   return (
      <div>
          <MyNavbar/>
          <Routes>
            <Route path='CardHotel' element={<HotelesCard hoteles={hoteles}/>}  />,
          
          </Routes>
      </div>
   )


}

export default HotelContainer;