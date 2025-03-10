import React, { useState, useEffect } from "react";
const URL = "https://ophthalmologicalclinicback.onrender.com";

export const Features = () => {
  const [cirugiaData, setCirugiaData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://ophthalmologicalclinicback.onrender.com/cirugias/getAllCirugias`);
        if (!response.ok) {
          throw new Error("No se pudo obtener la información de la cirugía.");
        }
        const data = await response.json();
        setCirugiaData(data); // Asignamos el objeto directamente
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
      <div id="features" className="text-center">
        <div className="container">
          <div className="col-md-10 col-md-offset-1 section-title">
            <h2>Cirugías</h2>
          </div>
          <div className="row">
            <p>Cargando...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div id="features" className="text-center">
        <div className="container">
          <div className="col-md-10 col-md-offset-1 section-title">
            <h2>Cirugías</h2>
          </div>
          <div className="row">
            <p>Error: {error.message}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!cirugiaData) {
    return (
      <div id="features" className="text-center">
        <div className="container">
          <div className="col-md-10 col-md-offset-1 section-title">
            <h2>Cirugías</h2>
          </div>
          <div className="row">
            <p>No se encontró información de la cirugía.</p>
          </div>
        </div>
      </div>
    );
  }
  
  let services = cirugiaData;
  
  if (!Array.isArray(services)) {
    services = [services];
  }
  
  return (
    <div id="features" className="text-center">
      <div className="container">
        <div className="col-md-10 col-md-offset-1 section-title">
          <h2>Cirugías</h2>
        </div>
        <div className="row">
          {services.map((service) => (
            <div key={service.id} className="col-md-4">
              <div className="card">
                <img src={service.link} alt={service.texto1} className="card-img-top" style={{ width: '100%', height: '150px', objectFit: 'cover' }} />
                <div className="card-body">
                  <h5 className="card-title">{service.texto1}</h5>
                  <p className="card-text">{service.texto2}</p>
                  {service.link && (
                    <a href={service.link} target="_blank" rel="noopener noreferrer">
                      Más información
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};