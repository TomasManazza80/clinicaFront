import React, { useEffect, useState } from "react";
import axios from "axios";
const URL = "https://ophthalmologicalclinicback.onrender.com";

export const Gallery = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Fetch gallery data from the API
    axios
      .get(`${URL}/gallery/getAllGallery`)
      .then((response) => {
        if (response.data) {
          setData(response.data); // Store the gallery data in state
        }
      })
      .catch((error) => {
        console.error("Error fetching gallery data:", error);
      });
  }, []);

  return (
    <div id="portfolio" className="text-center">
      <div className="container">
        <div className="section-title">
          <h2>Gallery</h2>
          <p>
            Explore our collection of images showcasing our expertise and
            commitment to excellence.
          </p>
        </div>
        <div className="row">
          <div className="portfolio-items">
            {data
              ? data.map((d, i) => (
                  <div
                    key={`gallery-${d.galleryId}-${i}`}
                    className="col-sm-6 col-md-4 col-lg-4"
                    style={{ padding: "10px" }}
                  >
                    <div style={{ position: "relative", width: "100%", height: "200px" }}>
                      <img
                        src={d.imageUrl}
                        alt={d.description}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                      <p style={{ position: "absolute", bottom: "10px", left: "10px", color: "white", backgroundColor: "rgba(0,0,0,0.5)", padding: "5px" }}>
                        {d.description}
                      </p>
                    </div>
                  </div>
                ))
              : "Loading..."}
          </div>
        </div>
      </div>
    </div>
  );
};
