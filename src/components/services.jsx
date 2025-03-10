import React, { useState, useEffect } from "react";
const URL = "https://ophthalmologicalclinicback.onrender.com";

export const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${URL}/servicios/getAllServices`);
        if (!response.ok) {
          throw new Error("No se pudo obtener la información de los servicios.");
        }
        const data = await response.json();
        setServices(data); // Asignamos los datos de los servicios al estado
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
      <div id="services" className="text-center">
        <div className="container">
          <div className="section-title">
            <h2>Nuestros Servicios</h2>
            <p>Cargando...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div id="services" className="text-center">
        <div className="container">
          <div className="section-title">
            <h2>Nuestros Servicios</h2>
            <p>Error: {error.message}</p>
          </div>
        </div>
      </div>
    );
  }

  if (services.length === 0) {
    return (
      <div id="services" className="text-center">
        <div className="container">
          <div class="section-title">
            <h2>Nuestros Servicios</h2>
            <p>No se encontraron servicios disponibles.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div id="services" className="text-center">
      <div className="container">
        <div className="section-title">
          <h2>Nuestros Servicios</h2>
          <p>Explora los servicios que ofrecemos para ti.</p>
        </div>
        <div className="row">
          {services.map((service) => (
            <div key={service.inicioId} className="col-md-4">
              <div className="service-desc">
                <h3>{service.texto1}</h3>
                <p>{service.texto2}</p>
                {service.link && (
                  <img
                    src={service.link}
                    alt={service.texto1}
                    style={{ width: "100%", height: "200px", objectFit: "cover" }}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
