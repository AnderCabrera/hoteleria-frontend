import React from 'react';
import './Navbar.css'
import { Navbar, Nav, Button, Container, Row, Col } from 'react-bootstrap';
import logo from '../assets/img/LogoConNombre.png';

const MyNavbar = () => {
  // Verifica si hay un token en el localStorage
  const isLoggedIn = localStorage.getItem('token') !== null;

  return (
    <Navbar className='navbar-background' expand="lg">
      <Container fluid>
        <Row className="w-100">
          <Col>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Navbar.Brand ><img src={logo} alt="" width='90px'/></Navbar.Brand>
                {isLoggedIn ? (
                  <>
                  <Nav.Link  className='navbar-button' href="/">Inicio</Nav.Link>
                    <Nav.Link  className='navbar-button' href="/Hotel/CardHotel">Hoteles</Nav.Link>
                    <Nav.Link className='navbar-button' href="#">Servicios</Nav.Link>
                    <Nav.Link className='navbar-button' href="#">Reservaciones</Nav.Link>
                  </>
                ) : null}
              </Nav>
            </Navbar.Collapse>
          </Col>
          <Col xs="auto" >
            {isLoggedIn ? (
              <Nav.Link className='navbar-button' href="/settingUser" style={{marginTop: '55%'}}>Mi Cuenta</Nav.Link>
            ) : (
              <Nav.Link className='navbar-button' href="/login" style={{marginTop: '55%'}}>Login</Nav.Link>
            )}
          </Col>
          <Col xs="auto">
            {isLoggedIn ? null : (
              <Nav.Link className='navbar-button' href="/registro" style={{marginTop: '35%'}}>Registrar</Nav.Link>
            )}
          </Col>
        </Row>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
