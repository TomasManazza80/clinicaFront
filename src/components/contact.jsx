import React, { useState } from "react";
import emailjs from "emailjs-com";

const initialState = {
  name: "",
  email: "",
  message: "",
};

export const Contact = (props) => {
  const [{ name, email, message }, setState] = useState(initialState);
  const [status, setStatus] = useState(""); // Estado para el mensaje de confirmación

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const clearState = () => setState({ ...initialState });

  const handleSubmit = (e) => {
    e.preventDefault();
    emailjs
      .sendForm("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", e.target, "YOUR_PUBLIC_KEY")
      .then(
        (result) => {
          console.log(result.text);
          setStatus("El correo se ha enviado correctamente."); // Mensaje de éxito
          clearState();
        },
        (error) => {
          console.log(error.text);
          setStatus("Hubo un error al enviar el correo."); // Mensaje de error
        }
      );
  };

  return (
    <div>
      <div id="contact">
        <div className="container">
          <div className="col-md-8">
            <div className="row">
              <div className="section-title">
                <h2>Ponte en Contacto</h2>
                <p>
                  Estamos aquí para ayudarte. Por favor, completa el formulario de contacto y nos pondremos en contacto contigo lo antes posible para responder a tus preguntas o comentarios.
                </p>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <input
                        type="text"
                        name="name"
                        className="form-control"
                        placeholder="Nombre"
                        required
                        value={name}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <input
                        type="email"
                        name="email"
                        className="form-control"
                        placeholder="Correo Electrónico"
                        required
                        value={email}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <textarea
                    name="message"
                    className="form-control"
                    rows="4"
                    placeholder="Mensaje"
                    required
                    value={message}
                    onChange={handleChange}
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-custom btn-lg">
                  Enviar Mensaje
                </button>
              </form>
              {status && <p className="status-message">{status}</p>} {/* Muestra el mensaje de confirmación */}
            </div>
          </div>
          <div className="col-md-3 col-md-offset-1 contact-info">
            <div className="contact-item">
              <h3>Información de Contacto</h3>
              <p>
                <span>
                  <i className="fa fa-map-marker"></i> Dirección
                </span>
                {props.data ? props.data.address : "cargando..."}
              </p>
            </div>
            <div className="contact-item">
              <p>
                <span>
                  <i className="fa fa-phone"></i> Teléfono
                </span>{" "}
                {props.data ? props.data.phone : "cargando..."}
              </p>
            </div>
            <div className="contact-item">
              <p>
                <span>
                  <i className="fa fa-envelope-o"></i> Correo Electrónico
                </span>{" "}
                {props.data ? props.data.email : "cargando..."}
              </p>
            </div>
          </div>
          <div className="col-md-12">
            <div className="row">
              <div className="map-container" style={{ textAlign: "center" }}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d54348.97396444733!2d-60.7742129783203!3d-31.639028299999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95b5a9be9bb432a3%3A0x43e6c16d833c8bff!2sVisage%20Clinique!5e0!3m2!1ses-419!2sar!4v1741616449544!5m2!1ses-419!2sar"
                  width="100%"
                  height="450"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Ubicación"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="footer">
        <div className="container text-center">
          <p>
            &copy; 2025 todos los derechos reservados Clínica Oftalmológica Franco-Argentino. Diseño por{" "}
            <a href="www.linkedin.com/in/tomasmanazza" rel="nofollow">
              Tomás Manazza
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
