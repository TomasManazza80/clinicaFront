import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../auth/authProvieder';
import { Link } from 'react-scroll';

const navigationStyles = {
  backgroundColor: '#fff', // Cambia a blanco
  color: '#333', // Cambia el color del texto a negro
  padding: '10px 20px',
  borderRadius: '5px',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  zIndex: 1000,
};
const buttonStyles = {
  backgroundColor: '#000', // Cambia a negro
  color: '#fff', // El texto del botón será blanco
  border: 'none',
  padding: '10px 20px',
  textTransform: 'uppercase',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease',
  borderRadius: '5px',
};

const Navigation = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState("guest"); // Inicializa con "guest"
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user && user.role && user.isAuthenticated) {
      console.log('User:', user);
      console.log('Role:', user.role);
      setRole(user.role);
    }
  }, [user]);

  console.log('Role:', role);

  const handleRedirectAdmin = () => {
    navigate("/admin");
  };

  const handlePanelAdmin = () => {
    navigate("/admin-panel");
  };

  return (
    <nav id="menu" style={navigationStyles}>
      <div className="container">
        <div className="navbar-header">
          <button
            type="button"
            className="navbar-toggle collapsed"
            data-toggle="collapse"
            data-target="#bs-example-navbar-collapse-1"
          >
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          
          <a className="navbar-brand center-text" href="#page-top" style={{ color: 'black', marginLeft: '-200px', display: 'flex', alignItems: 'center' }}>
  <img src="/img/ojoLogo.gif" alt="Logo" style={{ width: '60px', height: '60px', marginRight: '10px' }} />
  CLINICA OFTALMOLOGICA VISAGE
</a>
        </div>

        <div
          className="collapse navbar-collapse"
          id="bs-example-navbar-collapse-1"
        >
         <ul className="nav navbar-nav navbar-right">
  <li>
    <Link to="header" smooth={true} duration={500} className="page-scroll" style={{ color: '#000', textDecoration: 'none' }}>
      Inicio
    </Link>
  </li>
  <li>
    <Link to="features" smooth={true} duration={500} className="page-scroll" style={{ color: '#000', textDecoration: 'none' }}>
      Cirugías
    </Link>
  </li>
  <li>
    <Link to="about" smooth={true} duration={500} className="page-scroll" style={{ color: '#000', textDecoration: 'none' }}>
      Nosotros
    </Link>
  </li>
  <li>
    <Link to="services" smooth={true} duration={500} className="page-scroll" style={{ color: '#000', textDecoration: 'none' }}>
      Servicios
    </Link>
  </li>
  <li>
    <Link to="team" smooth={true} duration={500} className="page-scroll" style={{ color: '#000', textDecoration: 'none' }}>
      Doctores
    </Link>
  </li>
  <li>
    <Link to="portfolio" smooth={true} duration={500} className="page-scroll" style={{ color: '#000', textDecoration: 'none' }}>
      Galeria
    </Link>
  </li>
  <li>
    <Link to="contact" smooth={true} duration={500} className="page-scroll" style={{ color: '#000', textDecoration: 'none' }}>
      Contacto
    </Link>
  </li>
  {role === "admin" && (
    <>
      <li>
      <button
            style={buttonStyles}
            onClick={handleRedirectAdmin}
          >
            Admin
          </button>
        </li>
        <li>
          <button
            style={buttonStyles}
            onClick={handlePanelAdmin}
          >
            Panel de Admin
          </button>
        </li>
      </>
    )}
  </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;