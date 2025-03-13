import React, { useEffect, useState } from "react";
import axios from "axios";
import { useInView } from "react-intersection-observer";

const URL = "https://ophthalmologicalclinicback.onrender.com";

export const Gallery = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${URL}/gallery/getAllGallery`);
        setData(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching gallery data:", err);
        setError("Hubo un error al cargar la galería. Inténtalo de nuevo más tarde.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <div
          style={{
            border: "8px solid #f3f3f3",
            borderTop: "8px solid #3498db",
            borderRadius: "50%",
            width: "50px",
            height: "50px",
            animation: "spin 2s linear infinite",
            margin: "20px auto",
          }}
        ></div>
        <p>Cargando galería...</p>
      </div>
    );
  }

  if (error) {
    return <div style={{ textAlign: "center", padding: "50px" }}>{error}</div>;
  }

  return (
    <div
      id="portfolio"
      style={{
        textAlign: "center",
        padding: "40px 20px",
        background: "linear-gradient(135deg, #f0f2f5, #e0e5ec)",
        minHeight: "100vh",
      }}
    >
      <div className="section-title" style={{ marginBottom: "30px" }}>
        <h2 style={{ color: "#333" }}>Galería</h2>
        <p style={{ color: "#333" }}>
          Explora nuestra colección de imágenes que muestran nuestra experiencia y compromiso con la excelencia.
        </p>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px",
          justifyContent: "center",
        }}
      >
        {data &&
          data.map((d, i) => (
            <AnimatedImage
              key={`gallery-${d.galleryId}-${i}`}
              imageUrl={d.imageUrl}
              description={d.description}
              onClick={() => handleImageClick(d.imageUrl)}
            />
          ))}
      </div>
      {selectedImage && (
        <ImageModal imageUrl={selectedImage} onClose={handleCloseModal} />
      )}
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          @keyframes fadeIn {
            0% { opacity: 0; transform: translateY(20px); }
            100% { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </div>
  );
};

const AnimatedImage = ({ imageUrl, description, onClick }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div
      ref={ref}
      style={{
        borderRadius: "15px",
        overflow: "hidden",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        transition: "transform 0.3s ease",
        backgroundColor: "white",
        animation: inView ? "fadeIn 0.8s ease-out" : "none",
        position: "relative",
        cursor: "pointer",
      }}
      onClick={onClick}
    >
      <img
        src={imageUrl}
        alt={description}
        style={{ width: "100%", height: "200px", objectFit: "cover" }}
      />
      <p
        style={{
          position: "absolute",
          bottom: "10px",
          left: "10px",
          color: "white",
          backgroundColor: "rgba(0,0,0,0.5)",
          padding: "5px",
        }}
      >
        {description}
      </p>
    </div>
  );
};

const ImageModal = ({ imageUrl, onClose }) => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "15px",
          maxWidth: "80%",
          maxHeight: "80%",
          overflow: "auto",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <img src={imageUrl} alt="Imagen de la galería" style={{ width: "100%" }} />
        <button onClick={onClose} style={{ marginTop: "20px" }}>
          Cerrar
        </button>
      </div>
    </div>
  );
};