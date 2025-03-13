import React, { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";

const URL = "https://ophthalmologicalclinicback.onrender.com";

export const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedService, setSelectedService] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${URL}/servicios/getAllServices`);
        if (!response.ok) {
          throw new Error("No se pudo obtener la información de los servicios.");
        }
        const data = await response.json();
        setServices(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <div
          style={{
            border: "8px solid #f3f3f3",
            borderTop: "8px solid #3498db",
            borderRadius: "50%",
            width: "50px",
            height: "50px",
            animation: "spin 2s linear infinite",
            margin: "20px auto",
          }}
        ></div>
        <p>Cargando servicios...</p>
      </div>
    );
  }

  if (error) {
    return <div style={{ textAlign: "center", padding: "50px" }}>{error.message}</div>;
  }

  if (services.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <p>No se encontraron servicios disponibles.</p>
      </div>
    );
  }

  const handleServiceClick = (service) => {
    setSelectedService(service);
  };

  const handleCloseModal = () => {
    setSelectedService(null);
  };

  return (
    <div
      id="services"
      style={{
        textAlign: "center",
        padding: "40px 20px",
        background: "linear-gradient(135deg, #f0f2f5, #e0e5ec)",
        minHeight: "100vh",
      }}
    >
      <div style={{ marginBottom: "30px" }}>
        <h2 style={{ color: "#333" }}>Nuestros Servicios</h2>
        <p style={{ color: "#333" }}>Explora los servicios que ofrecemos para ti.</p>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px",
          justifyContent: "center",
        }}
      >
        {services.map((service) => (
          <AnimatedService key={service.inicioId} service={service} onServiceClick={handleServiceClick} />
        ))}
      </div>
      {selectedService && (
        <ServiceModal service={selectedService} onClose={handleCloseModal} />
      )}
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          @keyframes fadeIn {
            0% { opacity: 0; transform: translateY(20px); }
            100% { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </div>
  );
};

const AnimatedService = ({ service, onServiceClick }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div
      ref={ref}
      style={{
        borderRadius: "15px",
        overflow: "hidden",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        transition: "transform 0.3s ease",
        backgroundColor: "white",
        animation: inView ? "fadeIn 0.8s ease-out" : "none",
        padding: "20px",
        height: "400px",
      }}
    >
      <h3 style={{ fontWeight: "bold", color: "#333" }}>{service.texto1}</h3>
      <p style={{ color: "#333", marginBottom: "10px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
        {service.texto2}
      </p>
      {service.link && (
        <img
          src={service.link}
          alt={service.texto1}
          style={{ width: "100%", height: "200px", objectFit: "cover", marginBottom: "10px" }}
        />
      )}
      <button
        onClick={() => onServiceClick(service)}
        style={{
          backgroundColor: "#007bff",
          color: "white",
          padding: "10px 20px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          transition: "background-color 0.3s ease",
        }}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#0056b3")}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#007bff")}
      >
        Más información
      </button>
    </div>
  );
};

const ServiceModal = ({ service, onClose }) => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "15px",
          maxWidth: "80%",
          maxHeight: "80%",
          overflow: "auto",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
          <img
            src={service.link}
            alt={service.texto1}
            style={{ width: "100px", height: "100px", objectFit: "cover", marginRight: "20px" }}
          />
          <div>
            <h3 style={{ fontWeight: "bold", marginBottom: "10px", color: "#333" }}>{service.texto1}</h3>
            <p style={{ lineHeight: "1.6", color: "#333" }}>{service.texto2}</p>
          </div>
        </div>
        <button onClick={onClose} style={{ color: "#333" }}>Cerrar</button>
      </div>
    </div>
  );
};