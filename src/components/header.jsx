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
          paragraph: "En nuestra clínica, ofrecemos cirugías gratuitas de cataratas para pacientes con ciertas obras sociales. Consulta con nosotros para verificar tu cobertura y acceder a este beneficio. ¡Recupera tu visión sin costo!",
          link: data.link
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
      <header id="header" className="intro" style={{ backgroundColor: "#333" }}>
        <div className="overlay" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
          <div className="container">
            <div className="row">
              <div className="col-md-8 col-md-offset-2 intro-text" style={{ color: "#fff" }}>
                <h1 style={{ fontSize: 36, fontWeight: 700, color: "#fff" }}>Cargando...</h1>
                <p style={{ fontSize: 18, color: "#fff" }}>Cargando información del encabezado...</p>
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }

  if (error) {
    return (
      <header id="header" className="intro" style={{ backgroundColor: "#333" }}>
        <div className="overlay" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
          <div className="container">
            <div className="row">
              <div className="col-md-8 col-md-offset-2 intro-text" style={{ color: "#fff" }}>
                <h1 style={{ fontSize: 36, fontWeight: 700, color: "#fff" }}>Error</h1>
                <p style={{ fontSize: 18, color: "#fff" }}>Error al cargar la información: {error.message}</p>
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }

  if (!headerData) {
    return (
      <header id="header" className="intro" style={{ backgroundColor: "#333" }}>
        <div className="overlay" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
          <div className="container">
            <div className="row">
              <div className="col-md-8 col-md-offset-2 intro-text" style={{ color: "#fff" }}>
                <h1 style={{ fontSize: 36, fontWeight: 700, color: "#fff" }}>Sin datos</h1>
                <p style={{ fontSize: 18, color: "#fff" }}>No se encontraron datos para el encabezado.</p>
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header id="header" style={{
      backgroundImage: `url(${headerData.link})`, // Utiliza la propiedad link para establecer la imagen de fondo
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      display: "table",
      width: "100%",
      padding: "0",
      backgroundColor: "rgba(0, 0, 0, 0.5)"
    }}>
      <div className="overlay" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-md-offset-2 intro-text" style={{ color: "#fff", textAlign: "left", marginLeft: "-250px" }}>
            <h1 style={{ fontSize: 36, fontWeight: 700, color: "#fff" }}>{headerData.title}</h1>
              <span></span>
              <p style={{ fontSize: 18, color: "#fff" }}>{headerData.paragraph}</p>
              <a
                href="#features"
                className="btn btn-custom btn-lg page-scroll"
                style={{ color: "#fff", backgroundColor: "#333", border: "none", padding: "10px 20px", borderRadius: "5px" }}
              >
                Información
              </a>{" "}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};