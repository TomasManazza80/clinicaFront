import React, { useState, useEffect } from "react";
import axios from "axios";

export const Team = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  const imgStyle = {
    width: "200px", // Ajusta el tamaño según tus necesidades
    height: "200px", // Ajusta el tamaño según tus necesidades
    objectFit: "cover", // Mantiene la proporción de la imagen
    borderRadius: "15px",
  };

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get("https://ophthalmologicalclinicback.onrender.com/doctores/getAllDoctors");
        setDoctors(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener la información de los doctores:", error);
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  return (
    <div id="team" className="text-center">
      <div className="container">
        <div className="col-md-8 col-md-offset-2 section-title">
          <h2>{loading ? "Cargando..." : doctors[0]?.titulo || "Nuestros Profesionales"}</h2>
          <p>{loading ? "" : doctors[0]?.introduccion || "Conoce a los profesionales dedicados a brindarte el mejor servicio."}</p>
        </div>
        <div id="row">
          {loading ? (
            "Cargando..."
          ) : (
            doctors.map((doctor) => (
              <div key={doctor.doctorId} className="col-md-3 col-sm-6 team">
                <div className="thumbnail">
                  <img
                    src={doctor.img || "data:image/png;base64,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"} // Agrega una imagen por defecto si no hay una en los datos
                    alt={`Imagen de ${doctor.nombre}`}
                    className="team-img"
                    style={imgStyle}
                  />
                  <div className="caption">
                    <h4>{doctor.nombre}</h4>
                    <p>{doctor.especialidad}</p>
                    <p>{doctor.descripcion}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
