import { Routes,Route } from 'react-router-dom';

import { hotelGet } from '../../shared/hooks/hotelGet.jsx';
import HomePage from '../HomePage/HomePage.jsx';
import HotelesCard from '../../components/HotelesCard.jsx';




export const Dashboard = () => {
  
  const { hoteles, isFetching, getHoteles } = hotelGet(); // Llama a hotelGet dentro del cuerpo del componente

  useEffect(() => {
    // Llama a la función para obtener datos de hoteles cuando el componente se monta
    getHoteles();
    // Llama a la función getHoteles del hook dentro de useEffect
  }, []);

    return (
      <div>
          <Routes>
            <Route path='/hoteles' element ={<HotelesCard hoteles = {hoteles} /> } />
          </Routes>
      </div>
    )

}
  
