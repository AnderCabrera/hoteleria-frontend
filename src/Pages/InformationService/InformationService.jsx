import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MyNavbar from "../../components/Navbar";
import {
  addBookingRequest,
  getDateRequest,
  getServices,
} from "../../services/api";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { format } from "date-fns";

export const InformationService = () => {
  const navigate = useNavigate();
  const idUser = localStorage.getItem("_id");
  const location = useLocation();
  const { rooms } = location.state;
  const [services, setServices] = useState([]);
  const [dates, setDates] = useState([]);

  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  const [selectedServices, setSelectedServices] = useState([]);
  const MySwal = withReactContent(Swal);

  useEffect(() => {
    getServices(rooms.idHotel)
      .then((response) => {
        setServices(response.data.foundedServices);
      })
      .catch((error) => {
        console.error("Error fetching services:", error);
      });
  }, [rooms.idHotel]);

  useEffect(() => {
    getDateRequest(rooms._id)
      .then((response) => {
        setDates(response.data);
      })
      .catch((error) => {
        console.error("Error fetching dates:", error);
      });
  }, [rooms._id]);

  const handleButtonNext = () => {
    if (!startDate || !endDate) {
      MySwal.fire({
        icon: "error",
        title: "Oops...",
        text: "Selecciona una fecha de inicio y fin",
      });
      return;
    }

    const data = {
      date_start: format(startDate, "yyyy-MM-dd"),
      date_end: format(endDate, "yyyy-MM-dd"),
      servicesAdquired: selectedServices.map((service) => service._id),
    };

    addBookingRequest(rooms._id, idUser, data)
      .then(() => {
        navigate("/Reservation", { state: { selectedServices, rooms } });
      })
      .catch((error) => {
        console.error("Error adding booking:", error);
      });
  };

  const getDisabledIntervals = () => {
    const intervals = [];

    console.log(new Date(dates[0]?.date_end));

    dates.forEach((date) => {
      const start = new Date(date.date_start);
      const end = new Date(
        new Date(date.date_end).setDate(new Date(date.date_end).getDate() + 1),
      );
      intervals.push({ start, end });
    });

    return intervals;
  };

  const disabledIntervals = getDisabledIntervals();

  const handleServiceClick = (service) => {
    if (selectedServices.some((s) => s._id === service._id)) {
      setSelectedServices((prevSelected) =>
        prevSelected.filter((s) => s._id !== service._id),
      );
    } else {
      setSelectedServices((prevSelected) => [...prevSelected, service]);
    }
  };

  return (
    <>
      <MyNavbar />
      <p className="name">Seleccione una fecha de inicio y fin</p>
      <div className="container-date">
        <div className="calendar-container">
          <DatePicker
            selectsRange={true}
            startDate={startDate}
            endDate={endDate}
            minDate={new Date()}
            excludeDateIntervals={disabledIntervals}
            onChange={(update) => {
              setDateRange(update);
            }}
            withPortal
            inline
            dateFormat="yyyy-MM-dd"
          />
        </div>
      </div>
      <div>
        <p className="name">Selecciona los servicios</p>
      </div>
      {services.length === 0 ? (
        <div className="container-null">
          No hay servicios disponibles para este cuarto
        </div>
      ) : (
        services.map((service, index) => (
          <div key={index} className="card">
            <div className="card-info">
              <p className="card-name">{service.name}</p>
              <p className="card-name">{service.description}</p>
              <p className="card-name">${service.price}</p>
              <button
                className="card-button"
                onClick={() => handleServiceClick(service)}
              >
                {selectedServices.some((s) => s._id === service._id)
                  ? "Eliminar"
                  : "Agregar"}
              </button>
            </div>
          </div>
        ))
      )}
      <div className="container-button-next">
        <button className="button-next" onClick={handleButtonNext}>
          Confirmar reservación
        </button>
      </div>
    </>
  );
};

export default InformationService;
