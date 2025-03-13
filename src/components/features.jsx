import React, { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";

export const Features = () => {
  const [cirugiaData, setCirugiaData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://ophthalmologicalclinicback.onrender.com/cirugias/getAllCirugias"
        );
        if (!response.ok) {
          throw new Error("No se pudo obtener la información de la cirugía.");
        }
        const data = await response.json();
        setCirugiaData(data);
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
        <p>Cargando información de cirugías...</p>
      </div>
    );
  }

  if (error) {
    return <div style={{ textAlign: "center", padding: "50px" }}>{error.message}</div>;
  }

  if (!cirugiaData) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <p>No se encontró información de la cirugía.</p>
      </div>
    );
  }

  let services = cirugiaData;

  if (!Array.isArray(services)) {
    services = [services];
  }

  return (
    <div
      id="features"
      style={{
        textAlign: "center",
        padding: "40px 20px",
        background: "linear-gradient(135deg, #f0f2f5, #e0e5ec)",
        minHeight: "100vh",
      }}
    >
      <div style={{ marginBottom: "30px" }}>
        <h2>Cirugías</h2>
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
          <AnimatedCard key={service.id} service={service} />
        ))}
      </div>
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

const AnimatedCard = ({ service }) => {
  const [ref, inView] = useInView({
    triggerOnce: true, // La animación solo se ejecuta una vez
    threshold: 0.1, // El 10% del elemento debe estar visible
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
        animation: inView ? "fadeIn 0.8s ease-out" : "none", // Aplica la animación si está en vista
      }}
      onMouseOver={(e) => (e.currentTarget.style.transform = "translateY(-5px)")}
      onMouseOut={(e) => (e.currentTarget.style.transform = "translateY(0)")}
    >
      <img
        src={service.link}
        alt={service.texto1}
        style={{ width: "100%", height: "150px", objectFit: "cover" }}
      />
      <div style={{ padding: "20px" }}>
        <h5 style={{ fontWeight: "bold" }}>{service.texto1}</h5>
        <p style={{ color: "#333" }}>{service.texto2}</p>
        {service.link && (
          <a
            href={service.link}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#007bff", textDecoration: "none" }}
          >
            Más información
          </a>
        )}
      </div>
    </div>
  );
};