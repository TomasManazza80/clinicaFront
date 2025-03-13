import React, { useState, useEffect } from "react";
import axios from "axios";
import { useInView } from "react-intersection-observer";

export const Team = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get(
          "https://ophthalmologicalclinicback.onrender.com/doctores/getAllDoctors"
        );
        setDoctors(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error al obtener la información de los doctores:", err);
        setError("Hubo un error al cargar la información. Inténtalo de nuevo más tarde.");
        setLoading(false);
      }
    };

    fetchDoctors();
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
        <p>Cargando información del equipo...</p>
      </div>
    );
  }

  if (error) {
    return <div style={{ textAlign: "center", padding: "50px" }}>{error}</div>;
  }

  return (
    <div
      id="team"
      style={{
        textAlign: "center",
        padding: "40px 20px",
        background: "linear-gradient(135deg, #f0f2f5, #e0e5ec)",
        minHeight: "100vh",
      }}
    >
      <div style={{ marginBottom: "30px" }}>
        <h2>{doctors[0]?.titulo || "Nuestros Profesionales"}</h2>
        <p>
          {doctors[0]?.introduccion ||
            "Conoce a los profesionales dedicados a brindarte el mejor servicio."}
        </p>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px",
          justifyContent: "center",
        }}
      >
        {doctors.map((doctor) => (
          <AnimatedCard key={doctor.doctorId} doctor={doctor} />
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

const AnimatedCard = ({ doctor }) => {
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
      }}
      onMouseOver={(e) => (e.currentTarget.style.transform = "translateY(-5px)")}
      onMouseOut={(e) => (e.currentTarget.style.transform = "translateY(0)")}
    >
      <img
        src={doctor.photo || "https://via.placeholder.com/150"}
        alt={`Imagen de ${doctor.nombre}`}
        style={{ width: "100%", height: "200px", objectFit: "cover" }}
      />
      <div style={{ padding: "20px" }}>
        <h4>{doctor.nombre}</h4>
        <p style={{ fontStyle: "italic", color: "#555", marginBottom: "10px" }}>
          {doctor.especialidad}
        </p>
        <p style={{ color: "#333" }}>{doctor.descripcion}</p>
      </div>
    </div>
  );
};