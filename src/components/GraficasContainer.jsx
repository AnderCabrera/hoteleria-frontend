import React from "react";
import { Route, Routes } from "react-router-dom";
import Graficas from "./Graficas";
import MyNavbar from "./Navbar";

export const GraficasContainer = () => {
  return (
    <div>
      <MyNavbar />
      <Routes>
        <Route path="Grafica" element={<Graficas />} />
      </Routes>
    </div>
  );
};

export default GraficasContainer;
