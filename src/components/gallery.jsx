import React, { useEffect, useState } from "react";
import { Image } from "./image";
import axios from "axios";
const URL = "https://ophthalmologicalclinicback.onrender.com";

export const Gallery = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Fetch gallery data from the API
    axios
      .get(`${URL}/gallery/getAllGallery)`)
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
                  >
                    <Image
                      title={d.description} // Using the description as the title
                      largeImage={d.imageUrl} // URL for a larger view
                      smallImage={d.imageUrl} // URL for a thumbnail view
                    />
                  </div>
                ))
              : "Loading..."}
          </div>
        </div>
      </div>
    </div>
  );
};
