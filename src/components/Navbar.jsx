import React from "react";
import "./Navbar.css";
import { Navbar, Nav, Button, Container, Row, Col } from "react-bootstrap";
import logo from "../assets/img/LogoConNombre.png";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const MyNavbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('token') !== null;
  const userRole = localStorage.getItem('role');
  const handleLogout = () => {
    navigate('/*');
    localStorage.clear();
    window.location.reload();
  };

  const returnLinks = () => {
    if (isLoggedIn) {
      if (userRole === "ADMIN_APP") {
        return (
          <>
            <Nav.Link href="/Informe/Grafica" className="navbar-button">
              Gráficas
            </Nav.Link>
          </>
        );
      } else if (userRole === "ADMIN_HOTEL") {
        return (
          <>
            <Nav.Link href="/AdminPanel" className="navbar-button">
              Administrar mi hotel
            </Nav.Link>
          </>
        );
      } else {
        return (
          <>
            <Nav.Link className="navbar-button" href="/">
              Inicio
            </Nav.Link>
            <Nav.Link href="/HotelContainer" className="navbar-button">
              Hoteles
            </Nav.Link>
            <Nav.Link href="/BookingContainer" className="navbar-button">
              Reservas
            </Nav.Link>
          </>
        );
      }
    }
  };

  return (
    <Navbar className="navbar-background" expand="lg">
      <Container fluid>
        <Row className="w-100">
          <Col>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Navbar.Brand>
                  <img src={logo} alt="" width="90px" />
                </Navbar.Brand>

                {returnLinks()}

              </Nav>
            </Navbar.Collapse>
          </Col>
          <Col xs="auto">
            {isLoggedIn ? (
              <Nav.Link
                className="navbar-button"
                href="/settingUser"
                style={{ marginTop: '48%' }}
              >
                Mi Cuenta
              </Nav.Link>
            ) : (
              <Nav.Link
                className="navbar-button"
                href="/login"
                style={{ marginTop: '55%' }}
              >
                Login
              </Nav.Link>
            )}
          </Col>
          <Col xs="auto">
            {isLoggedIn ? (
              <Nav.Link
                className="navbar-button"
                onClick={handleLogout}
                style={{ marginTop: '35%' }}
              >
                Cerrar Sesión
              </Nav.Link>
            ) : (
              <Nav.Link
                className="navbar-button"
                href="/registro"
                style={{ marginTop: '35%' }}
              >
                Registrar
              </Nav.Link>
            )}
          </Col>
        </Row>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
