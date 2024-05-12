import { Routes, Route } from 'react-router-dom';

import { hotelGet } from '../../shared/hooks/hotelGet.jsx';
import HomePage from '../HomePage/HomePage.jsx';
import HotelesCard from '../../components/HotelesCard.jsx';




export const Dashboard = () => {
  return (
    <div>
      <Routes>
        <Route path='/hoteles' element={<HotelesCard />} />
      </Routes>
    </div>
  )

}

