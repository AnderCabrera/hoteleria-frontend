import React, { useEffect } from 'react';
import { hotelGet } from '../shared/hooks/hotelGet';
import { Route, Routes } from 'react-router-dom';
import HotelesCard from './HotelesCard';
import MyNavbar from './Navbar';

export const HotelContainer = () => {
  return (
    <div>
      <MyNavbar />
      <Routes>
        <Route path="CardHotel" element={<HotelesCard />} />,
      </Routes>
    </div>
  );
};

export default HotelContainer;
