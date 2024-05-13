import { useEffect, useState } from 'react';
import './HotelCard.css'; // Importar el CSS aquí
import { getHotelRequest, getImgHotelRequest } from '../services/api';
import { useNavigate } from 'react-router-dom';


const Card = () => {
  const [hotels, setHotels] = useState([]);
  const [imgHotels, setImgHotels] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getHotelRequest()
      .then((response) => {
        setHotels(response.data.hotelsFound);
      })
      .catch((error) => {
        console.error('Error fetching hotels:', error);
      });
  }, []);

  useEffect(() => {
    const fetchImgHotels = async () => {
      // Obtener las URLs de las imágenes de los hoteles
      const imgPromises = hotels.map((hotel) => getImgHotelRequest(hotel._id));
      const imgResults = await Promise.all(imgPromises);

      // Mapear las URLs de las imágenes de todos los hoteles
      const imgUrls = imgResults.map((imgResult) => {
        // Si hay imágenes encontradas para el hotel
        if (imgResult.data.foundedImages.length > 0) {
          // Mapear las URLs de las imágenes
          return imgResult.data.foundedImages.map(image => image.image_url);
        } else {
          // Si no hay imágenes encontradas, devolver un arreglo vacío
          return [];
        }
      });

      // Guardar las URLs de las imágenes en el estado
      setImgHotels(imgUrls);
    };

    fetchImgHotels();
  }, [hotels]);
  console.log(imgHotels)

  const getHotel = (hotel) => {
    navigate('/HotelPage', { state: { hotel } });
  };

  const handleHeartClick = (index) => {
    setHotels((prevHotels) => {
      const updatedHotels = [...prevHotels];
      updatedHotels[index] = { ...updatedHotels[index], selected: !updatedHotels[index].selected };
      return updatedHotels;
    });
  };

  return (
    <>
      <div className='d-flex container-cards'> {/* Agregamos la clase container-cards */}
        {
          hotels.map((hotel, index) => (
            <div key={index} className="card">
              <div className="card-info">
                <img src={imgHotels[index]} alt={`Imagen de ${hotel.name}`} className="card-image" />
                <p className="card-name">{hotel.name}</p>
                <p className="card-info-text">{hotel.description}</p>
                <button onClick={() => getHotel(hotel)} className="card-button">Información</button>
                <div
                  className={`heart ${hotel.selected ? 'selected' : ''}`}
                  onClick={() => handleHeartClick(index)}
                >
                  {/* No se necesita contenido */}
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </>
  );
};

export default Card;
