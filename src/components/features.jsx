import React, { useState, useEffect } from "react";
const URL = "https://ophthalmologicalclinicback.onrender.com";

export const Features = () => {
  const [cirugiaData, setCirugiaData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${URL}/cirugias/getCirugia/1`);
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

  return ( 
    <div id="features" className="text-center">
      <div className="container">
        <div className="col-md-10 col-md-offset-1 section-title">
          <h2>Cirugías</h2>
        </div>
        <div className="row">
          <div className="col-xs-12 col-md-12">
            <h3>{cirugiaData.texto1}</h3>
            <p>{cirugiaData.texto2}</p>
            {cirugiaData.link && (
              <a href={cirugiaData.link} target="_blank" rel="noopener noreferrer">
                Más información
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};