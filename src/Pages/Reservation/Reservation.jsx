import React, { useEffect, useState } from 'react';
import MyNavbar from '../../components/Navbar';
import { useLocation } from 'react-router-dom';
import { searchHotelRequest } from '../../services/api';

export const Reservation = () => {
  const location = useLocation();
  const [hotel, setHotel] = useState({});
  const { selectedServices, rooms } = location.state;
  const [currentSelectedServices, setCurrentSelectedServices] =
    useState(selectedServices);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    searchHotelRequest(rooms.idHotel)
      .then((response) => {
        if (
          response.data &&
          response.data.hotelsFound &&
          response.data.hotelsFound.length > 0
        ) {
          setHotel(response.data.hotelsFound[0]);
        } else {
          console.error('No hotels found');
        }
      })
      .catch((error) => {
        console.error('Error fetching hotels:', error);
      });
  }, [rooms.idHotel]);

  useEffect(() => {
    const total = currentSelectedServices.reduce(
      (sum, service) => sum + service.price,
      0,
    );
    setTotalPrice(total + rooms.nightPrice);
  }, [currentSelectedServices, rooms.nightPrice]);

  const handleRemoveService = (serviceId) => {
    setCurrentSelectedServices((prevSelected) =>
      prevSelected.filter((service) => service._id !== serviceId),
    );
  };

  return (
    <>
      <MyNavbar />
      <p className="name">{hotel.name}</p>
      <br />
      <br />
      <div className="row justify-content-center">
        <div className="col-md-6">
          <p className="text text-subtitle">Ciudad:</p>
          <p className="text-info-Hotel"> {hotel.country}</p>
        </div>
        <div className="col-md-6">
          <p className="text text-subtitle">Dirección:</p>
          <p className="text-info-Hotel"> {hotel.address} </p>
        </div>
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <p className="text text-subtitle">Descripción de la habitación</p>
      <div className="container-price">
        <p className="text-info-Hotel">{rooms.description}</p>
      </div>
      <br />
      <br />
      <p className="text text-subtitle">Precio por la habitación</p>
      <div className="container-price">
        <p className="text-info-Hotel">${rooms.nightPrice}.00</p>
      </div>
      <br />
      <p className="name">Servicios que seleccionaste</p>
      {currentSelectedServices.length === 0 ? (
        <div className="container-null">No agregaste servicios extra</div>
      ) : (
        currentSelectedServices.map((service) => (
          <div key={service._id} className="card">
            <div className="card-info">
              <p className="card-name">{service.name}</p>
              <p className="card-name">{service.description}</p>
              <p className="card-name">${service.price}</p>
              <button
                className="card-button"
                onClick={() => handleRemoveService(service._id)}
              >
                Eliminar
              </button>
            </div>
          </div>
        ))
      )}
      <div className="container-price">
        <p className="text-info-Hotel">Total Servicios: ${totalPrice}.00</p>
      </div>
      <div className="container-button-next">
        <button className="button-next">Reservar</button>
      </div>
    </>
  );
};

export default Reservation;
