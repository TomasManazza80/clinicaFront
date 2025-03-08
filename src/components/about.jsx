import React, { useEffect, useState } from "react";
import axios from "axios";
const URL = "https://ophthalmologicalclinicback.onrender.com";

export const About = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Fetching data from the API
    axios
      .get(`${URL}/aboutUs/getAllAboutUs`)
      .then((response) => {
        if (response.data && response.data.length > 0) {
          setData(response.data[0]); // Toma el primer elemento del array
        }
      })
      .catch((error) => {
        console.error("Error fetching the About Us data:", error);
      });
  }, []);

  return (
    <div id="about">
      <div className="container">
        <div className="row">
          {/* Image Section */}
          <div className="col-xs-12 col-md-6">
            <img src="img/about.jpg" className="img-responsive" alt="About Us" />
          </div>
          {/* Text Section */}
          <div className="col-xs-12 col-md-6">
            <div className="about-text">
              <h2>About Us</h2>
              {/* Description */}
              <p>{data ? data.descripcion : "Loading..."}</p>
              <h3>Why Choose Us?</h3>
              <div className="list-style">
                {/* Reasons List */}
                <div className="col-lg-6 col-sm-6 col-xs-12">
                  <ul>
                    {data && data.razones
                      ? data.razones.map((razon, index) => (
                          <li key={index}>{razon}</li>
                        ))
                      : "Loading..."}
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
