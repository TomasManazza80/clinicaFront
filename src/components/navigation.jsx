import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../auth/authProvieder';

const buttonStyle = {
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  padding: '10px 20px',
  textTransform: 'uppercase',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease',
  borderRadius: '5px',
};

const buttonHoverStyle = {
  backgroundColor: '#0056b3',
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
    <nav id="menu" className="navbar navbar-default navbar-fixed-top navBarMain">
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
          <a className="navbar-brand center-text" href="#page-top">
            CLINICA OFTALMOLOGICA VISAGE
          </a>
        </div>

        <div
          className="collapse navbar-collapse"
          id="bs-example-navbar-collapse-1"
        >
          <ul className="nav navbar-nav navbar-right">
            <li>
              <a href="#Header" className="page-scroll">
                Inicio
              </a>
            </li>
            <li>
              <a href="#features" className="page-scroll">
                Cirugías
              </a>
            </li>
            <li>
              <a href="#aboutus" className="page-scroll">
                About Us
              </a>
            </li>
            <li>
              <a href="#services" className="page-scroll">
                Servicios
              </a>
            </li>
            <li>
              <a href="#doctors" className="page-scroll">
                Doctores
              </a>
            </li>
            <li>
              <a href="#gallery" className="page-scroll">
                Gallery
              </a>
            </li>
            <li>
              <a href="#contact" className="page-scroll">
                Contacto
              </a>
            </li>
            {role === "admin" && (
              <>
                <li>
                  <button
                    style={buttonStyle}
                    onClick={handleRedirectAdmin}
                  >
                    Admin
                  </button>
                </li>
                <li>
                  <button
                    style={buttonStyle}
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