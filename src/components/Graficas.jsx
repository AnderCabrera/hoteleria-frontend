import React, { useEffect, useState } from "react";
import { Chart, registerables } from "chart.js";
import { Bar } from "react-chartjs-2";
import { getBookingRequest } from "../services/api"; // Asegúrate de tener el path correcto

Chart.register(...registerables);

const Graficas = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    const fetchBookingData = async () => {
      const response = await getBookingRequest();
      if (!response.error) {
        const data = response.data.bookingsByHotel;
        const labels = Object.keys(data);
        const counts = Object.values(data);

        setChartData({
          labels: labels,
          datasets: [
            {
              label: "Reservaciones por Hotel",
              backgroundColor: "rgba(75,192,192,0.2)",
              borderColor: "rgba(75,192,192,1)",
              borderWidth: 1,
              hoverBackgroundColor: "rgba(75,192,192,0.4)",
              hoverBorderColor: "rgba(75,192,192,1)",
              data: counts,
            },
          ],
        });
      }
    };

    fetchBookingData();
  }, []);

  const options = {
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <h2>Reservaciones por Hotel</h2>
      <div style={{ height: "500px" }}>
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};

export default Graficas;
