import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MyNavbar from '../../components/Navbar';
import { addBookingRequest, getDateRequest, getServices } from '../../services/api';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';

export const InformationService = () => {
    const navigate = useNavigate();
    const idUser = localStorage.getItem('_id');
    const location = useLocation();
    const { rooms } = location.state;
    const [services, setServices] = useState([]);
    const [dates, setDates] = useState([]);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [selectedServices, setSelectedServices] = useState([]);

    useEffect(() => {
        getServices(rooms.idHotel)
            .then((response) => {
                setServices(response.data.foundedServices);
            })
            .catch((error) => {
                console.error('Error fetching services:', error);
            });
    }, [rooms.idHotel]);

    useEffect(() => {
        getDateRequest(rooms._id)
            .then((response) => {
                setDates(response.data);
            })
            .catch((error) => {
                console.error('Error fetching dates:', error);
            });
    }, [rooms._id]);

    const handleButtonNext = () => {
        const formattedStartDate = startDate ? format(startDate, 'yyyy-MM-dd') : null;
        const formattedEndDate = endDate ? format(endDate, 'yyyy-MM-dd') : null;
        const data = {
            date_start: formattedStartDate,
            date_end: formattedEndDate
        };
        addBookingRequest(rooms._id, idUser, data)
            .then(() => {
                navigate('/Reservation', { state: { selectedServices, rooms } });
            })
            .catch((error) => {
                console.error('Error adding booking:', error);
            });
    };

    const getDisabledIntervals = () => {
        const today = new Date();
        const intervals = [
            { start: new Date('1900-01-01'), end: new Date(today.setDate(today.getDate() - 1)) }
        ];

        dates.forEach((date) => {
            const start = new Date(date.date_start);
            const end = new Date(new Date(date.date_end).setDate(new Date(date.date_end).getDate() + 1));
            intervals.push({ start, end });
        });

        return intervals;
    };

    const disabledIntervals = getDisabledIntervals();

    const handleDateChange = (dates) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
    };

    const handleServiceClick = (service) => {
        setSelectedServices((prevSelected) => {
            const isAlreadySelected = prevSelected.some(s => s._id === service._id);
            if (isAlreadySelected) {
                return prevSelected.filter(s => s._id !== service._id);
            } else {
                return [...prevSelected, service];
            }
        });
    };

    return (
        <>
            <MyNavbar />
            <p className='name'>Seleccione una fecha de inicio y fin</p>
            <div className='container-date'>
                <div className='calendar-container'>
                    <DatePicker
                        selected={startDate}
                        onChange={handleDateChange}
                        startDate={startDate}
                        endDate={endDate}
                        selectsRange
                        inline
                        excludeDateIntervals={disabledIntervals}
                        dateFormat="yyyy-MM-dd"
                    />
                </div>
            </div>
            <div>
                <p className='name'>Selecciona los servicios</p>
            </div>
            {services.length === 0 ? (
                <div className='container-null'>No hay servicios disponibles para este cuarto</div>
            ) : (
                services.map((service) => (
                    <div key={service._id} className='card'>
                        <div className='card-info'>
                            <p className='card-name'>{service.name}</p>
                            <p className='card-name'>{service.description}</p>
                            <p className='card-name'>${service.price}</p>
                            <button
                                className='card-button'
                                onClick={() => handleServiceClick(service)}
                            >
                                {selectedServices.some(s => s._id === service._id) ? 'Eliminar' : 'Agregar'}
                            </button>
                        </div>
                    </div>
                ))
            )}
            <div className='container-button-next'>
                <button className='button-next' onClick={handleButtonNext}>Confirmar reservación</button>
            </div>
        </>
    );
};

export default InformationService;

