import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // Importar useLocation y useNavigate
import MyNavbar from '../../components/Navbar';
import './HotelPage.css'
import { getImgHotelRequest } from '../../services/api';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css'; 

const HotelPage = () => {
  const [imgHotel,setImgHotel] = useState([])
  const location = useLocation();
  const { hotel } = location.state;
  const navigate = useNavigate(); // Obtener la función navigate

  useEffect(() => {
    getImgHotelRequest(hotel._id)
      .then((response) => {
        setImgHotel(response.data.foundedImages)
      })
      .catch((error) => {
        console.error('Error fetching hotels:', error);
      });
  }, []);
  
  console.log(imgHotel);

  const handleNavigate =()=>{
      navigate('/InformationHotel'); // Redirigir al usuario a '/InformationHotel'
  }

  return (
    <>
      <MyNavbar />
      <div className=''>
        {imgHotel.length === 1 ? (
          <div className='carousel-container-full-width'>
            <img src={imgHotel[0].image_url} alt={`Imagen 0`} className='carousel-image-full-width img-carousel' />
          </div>
        ) : (
          <div className='carousel-container'>
            <Slider autoplay={true} autoplaySpeed={2000}> {/* Autoplay y velocidad de 2 segundos */}
              {imgHotel.map((image, index) => (
                <div key={index}>
                  <img src={image.image_url} alt={`Imagen ${index}`} className='carousel-image img-carousel' />
                </div>
              ))}
            </Slider>
          </div>
        )}
        
        <div className='container'>
          <div className='name'>
              <h2 className='name text'>{hotel.name}</h2>
          </div>
          <br/><br/>
          <div className='row justify-content-center'>
            <div className='col-md-6'>
              <p className='text text-subtitle'>Ciudad:</p>
              <p className='text-info-Hotel'> {hotel.country}</p>
            </div>
            <div className='col-md-6'>
              <p className='text text-subtitle'>Dirección:</p>
              <p className='text-info-Hotel'> {hotel.address} </p>
            </div>
          </div>
          <br /><br />
          <div className='container-text'>
              <h2 className='title-description text'>Descripción</h2>
          </div>
          <br />
          <div className='row justify-content'>
            <div className='container-description'>
              <p  className='text-info-description'>{hotel.description} </p>
            </div>
          </div>
          <br /><br /><br />
          
          <div className='container-text'>
            <button className='reserve-button' onClick={handleNavigate}> Reservar Habitación</button>
          </div>
        </div>
      </div>
      <br /><br /><br />
    </>
  );
};

export default HotelPage;
