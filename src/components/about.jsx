import React, { useEffect, useState } from "react";
import axios from "axios";

const URL = "https://ophthalmologicalclinicback.onrender.com";

export const About = () => {
  const [data, setData] = useState({
    descripcion: "Somos una clínica oftalmológica líder, comprometida con brindar atención integral y personalizada utilizando tecnología de vanguardia.",
    razones: [
      "Profesionales altamente calificados y con amplia experiencia",
      "Equipos tecnológicos de última generación",
      "Enfoque en el cuidado y bienestar del paciente",
      "Tratamientos innovadores y personalizados"
    ]
  });

  useEffect(() => {
    // Obtener datos desde la API
    axios
      .get(`${URL}/aboutUs/getAllAboutUs`)
      .then((response) => {
        if (response.data && response.data.length > 0) {
          setData(response.data[0]); // Toma el primer elemento del array
        }
      })
      .catch((error) => {
        console.error("Error al obtener los datos de Sobre Nosotros:", error);
      });
  }, []);

  return (
    <div id="about">
      <div className="container">
        <div className="row">
          {/* Sección de Imagen */}
          <div className="col-xs-12 col-md-6">
            <img src="img/team/teamPick.jpg" className="img-responsive" alt="Sobre Nosotros" />
          </div>
          {/* Sección de Texto */}
          <div className="col-xs-12 col-md-6">
            <div className="about-text">
              <h2>Sobre Nosotros</h2>
              {/* Descripción */}
              <p>{data.descripcion}</p>
              <h3>¿Por qué Elegirnos?</h3>
              <div className="list-style">
                {/* Lista de Razones */}
                <div className="col-lg-6 col-sm-6 col-xs-12">
                  <ul>
                    {data.razones.map((razon, index) => (
                      <li key={index}>{razon}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
