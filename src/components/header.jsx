import React, { useState, useEffect } from "react";
const URL = "https://ophthalmologicalclinicback.onrender.com";

export const Header = () => {
  const [headerData, setHeaderData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${URL}/inicio/getInicio/1`);
        if (!response.ok) {
          throw new Error("No se pudo obtener la información del header.");
        }
        const data = await response.json();
        // Mapear los datos de la API a las propiedades esperadas por el componente
        setHeaderData({
          title: data.texto1,
          paragraph: data.texto2,
          link: data.link,
        });
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
      <header id="header">
        <div className="intro">
          <div className="overlay">
            <div className="container">
              <div className="row">
                <div className="col-md-8 col-md-offset-2 intro-text">
                  <h1>Cargando...</h1>
                  <p>Cargando información del encabezado...</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }

  if (error) {
    return (
      <header id="header">
        <div className="intro">
          <div className="overlay">
            <div className="container">
              <div className="row">
                <div className="col-md-8 col-md-offset-2 intro-text">
                  <h1>Error</h1>
                  <p>Error al cargar la información: {error.message}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }

  if (!headerData) {
    return (
      <header id="header">
        <div className="intro">
          <div className="overlay">
            <div className="container">
              <div className="row">
                <div className="col-md-8 col-md-offset-2 intro-text">
                  <h1>Sin datos</h1>
                  <p>No se encontraron datos para el encabezado.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header id="header">
      <div className="intro">
        <div className="overlay">
          <div className="container">
            <div className="row">
              <div className="col-md-8 col-md-offset-2 intro-text">
                <h1>{headerData.title}</h1>
                <span></span>
                <p>{headerData.paragraph}</p>
                <a
                  href="#features"
                  className="btn btn-custom btn-lg page-scroll"
                >
                  Información
                </a>{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};