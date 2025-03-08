import React, { useState, useEffect } from "react";

const URL = "https://ophthalmologicalclinicback.onrender.com";




const AdminPage = () => {
  const [header, setHeader] = useState({ title: '', paragraph: '', link: '' });
  const [about, setAbout] = useState({ paragraph: '' });
  const [fotoDescription, setFotoDescription] = useState("");
  const [fotoUrl, setFotoUrl] = useState("");
  const [fotos, setFotos] = useState([]);
  const [doctores, setDoctores] = useState([]);
  const [doctorData, setDoctorData] = useState({
    nombre: '',
    especialidad: '',
    descripcion: '',
    titulo: 'NUESTROS PROFESIONALES',
    introduccion: 'Conoce a los profesionales dedicados a brindarte el mejor servicio.',
    photo: '',
  });
  const [cirugias, setCirugias] = useState([]);
  const [info, setinfo] = useState([{ title: '', largeImage: '', smallImage: '' }]);
  const [services, setServices] = useState([]);

  
  const [newService, setNewService] = useState({ texto1: "", texto2: "", link: "" });



  const deleteCirugia = async (id) => {
    try {
      const response = await fetch(`${URL}/cirugias/deleteCirugia/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        console.log(`Cirugía con ID ${id} eliminada con éxito`);
        // Aquí puedes agregar lógica adicional, como actualizar la lista de cirugías en la UI.
      } else {
        console.error(`Error al eliminar la cirugía con ID ${id}:`, response.statusText);
        // Aquí puedes agregar lógica para manejar errores.
      }
      alert("cirugia elimianda correctamente")
    
    } catch (error) {
      console.error(`Error al eliminar la cirugía con ID ${id}:`, error);
      // Aquí puedes manejar errores de red o excepciones.
    }
  };

  const eliminarFoto = async (id) => {
    try {
      const response = await fetch(`${URL}/gallery/deleteGallery/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Error al eliminar la foto");
      }

      console.log(`Foto con ID ${id} eliminada`);
      alert("Foto eliminada con exito")
      fetchFotos();
    } catch (error) {
      console.error("Error al eliminar la foto:", error);
      alert("Error al eliminar la foto")
    }
  };

  useEffect(() => {
    const fetchFotos = async () => {
      try {
        const response = await fetch(`${URL}/gallery/getAllGallery`);
        if (!response.ok) {
          throw new Error("Error al obtener las fotos");
        }
        const data = await response.json();
        setFotos(data);
      } catch (error) {
        console.error("Error al cargar las fotos:", error);
      }
    };

    fetchFotos();
  }, []);








  useEffect(() => {
    const fetchCirugias = async () => {
      try {
        const response = await fetch(`${URL}/cirugias/getAllCirugias`);
        if (response.ok) {
          const data = await response.json();
          setCirugias(data);
        } else {
          console.error('Error al obtener las cirugías:', response.statusText);
        }
      } catch (error) {
        console.error('Error al obtener las cirugías:', error);
      }
    };

    fetchCirugias();
  }, []);



  

  
  const fetchFotos = async () => {
    try {
      const response = await fetch(`${URL}/gallery/getAllGallery`);
      if (!response.ok) {
        throw new Error("Error al obtener las fotos");
      }
      const data = await response.json();
      setFotos(data);
    } catch (error) {
      console.error("Error al cargar las fotos:", error);
    }
  };

  const handleHeaderChange = (event) => {
    const { name, value } = event.target;
    setHeader((prevHeader) => ({
      ...prevHeader,
      [name]: value,
    }));
  };
  const cargarFoto = async (event) => {
    event.preventDefault(); // Prevenir la recarga de la página
  
    console.log("este es mi info de la FOTO ", fotoUrl);
    try {
      const response = await fetch(`${URL}/gallery/createGallery`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          imageUrl: fotoUrl,
          description: fotoDescription,
        }),
      });
  
      if (!response.ok) {
        throw new Error("Error al cargar la foto");
      }
  
      const result = await response.json();
      console.log("Foto cargada:", result);
      setFotoDescription("");
      setFotoUrl("");
      alert("Foto cargada con exito");
  
    } catch (error) {
      console.error("Error al cargar la foto:", error);
      alert("Error al cargar la foto");
    }
  };



  const crearCirugia = async () => {
    try {
      const response = await fetch(`${URL}/cirugias/createCirugia`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          texto1: newService.texto1,
          texto2: newService.texto2,
          link: newService.link,
        }),
      });

      if (response.ok) {
        console.log('Cirugía creada con éxito');
        // Aquí puedes agregar lógica adicional, como limpiar el formulario o mostrar un mensaje de éxito.
      } else {
        console.error('Error al crear la cirugía:', response.statusText);
        // Aquí puedes agregar lógica para manejar errores.
      }
    } catch (error) {
      console.error('Error al crear la cirugía:', error);
      // Aquí también puedes manejar errores de red o excepciones.
    }
  };


  const handleAboutChange = (event) => {
    const { name, value } = event.target;
    setAbout((prevAbout) => ({
      ...prevAbout,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const dataToSend = {
      texto1: header.title,
      texto2: header.paragraph,
      link: header.link,
    };

    try {
      const response = await fetch(`${URL}/inicio/updateInicio/1`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        throw new Error("Error al enviar los datos al servidor");
      }

      const result = await response.json();
      console.log("Respuesta del servidor:", result);
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };





  const handleDoctorChange = (event) => {
    const { name, value } = event.target;
    setDoctorData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const createDoctor = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`${URL}/doctores/createDoctor`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(doctorData),
      });

      if (!response.ok) {
        throw new Error("Error al enviar los datos al servidor");
      }

      const result = await response.json();
      console.log("Respuesta del servidor:", result);

      fetch("{URL}/doctores/getAllDoctors")
        .then(response => response.json())
        .then(data => setDoctores(data))
        .catch(error => console.error("Error al recargar doctores:", error));

      setDoctorData({
        nombre: '',
        especialidad: '',
        descripcion: '',
        titulo: 'NUESTROS PROFESIONALES',
        introduccion: 'Conoce a los profesionales dedicados a brindarte el mejor servicio.',
        photo: '',
      });

    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch(`${URL}/servicios/getAllServices`);
        if (!response.ok) {
          throw new Error("Error al obtener los servicios");
        }
        const data = await response.json();
        setServices(data);
      } catch (error) {
        console.error("Error al cargar los servicios:", error);
      }
    };

    fetchServices();
  }, []);

  const handleNewServiceChange = (event) => {
    const { name, value } = event.target;
    setNewService((prevService) => ({
      ...prevService,
      [name]: value,
    }));
  };

  const handleNewServiceSubmit = async (event) => {
    event.preventDefault();

    const { texto1, texto2, link } = newService;

    if (!texto1 || !texto2 || !link) {
      alert("Todos los campos son obligatorios");
      return;
    }

    try {
      const response = await fetch(`${URL}/servicios/createService`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newService),
      });

      if (!response.ok) {
        throw new Error("Error al crear el nuevo servicio");
      }

      const createdService = await response.json();
      setServices((prevServices) => [...prevServices, createdService]);
      setNewService({ texto1: "", texto2: "", link: "" });
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  const handleDeleteService = async (id) => {
    try {
      const response = await fetch(`${URL}/servicios/deleteService/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Error al eliminar el servicio");
      }

      setServices((prevServices) => prevServices.filter((service) => service.servicioId !== id));
    } catch (error) {
      console.error("Error al eliminar el servicio:", error);
    }
  };

  const deleteDoctor = async (id) => {
    try {
      const response = await fetch(`${URL}/doctores/deleteDoctor/${id}`);
      setDoctores((prevDoctors) => prevDoctors.filter((doctor) => doctor.id !== id));
    } catch (error) {
      console.error("Error al eliminar el empleado:", error);
    }
  }

  useEffect(() => {
    const fetchDoctores = async () => {
      try {
        const response = await fetch(`${URL}/doctores/getAllDoctors`);
        if (!response.ok) {
          throw new Error("Error al obtener los empleados");
        }
        const data = await response.json();
        setDoctores(data);
      } catch (error) {
        console.error("Error al cargar los empleados:", error);
      }
    };

    fetchDoctores();
  }, []);

  const createDoctors = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`${URL}/doctores/createDoctor`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(doctorData),
      });

      if (!response.ok) {
        throw new Error("Error al enviar los datos al servidor");
      }

      const result = await response.json();
      console.log("Respuesta del servidor:", result);
      fetch("{URL}/doctores/getAllDoctors")
        .then(response => response.json())
        .then(data => setDoctores(data))
        .catch(error => console.error("Error al recargar doctores:", error));
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px', marginTop: "200px", maxWidth: '800px', margin: 'auto', backgroundColor: '#f9f9f9', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />

      <h1 style={{ textAlign: 'center', color: '#333' }}>Admin Page</h1>
      <form onSubmit={handleSubmit}>

        <div style={{ marginBottom: '20px' }}>
          <h2 style={{ color: '#444' }}>Inicio</h2>
          <label htmlFor="headerTitle" style={{ fontWeight: 'bold', marginBottom: '5px' }}>Title:</label>
          <input
            type="text"
            id="headerTitle"
            name="title"
            value={header.title}
            onChange={handleHeaderChange}
            style={{ width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
          />
          <label htmlFor="headerParagraph" style={{ fontWeight: 'bold', marginBottom: '5px' }}>Paragraph:</label>
          <textarea
            id="headerParagraph"
            name="paragraph"
            value={header.paragraph}
            onChange={handleHeaderChange}
            style={{ width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
          ></textarea>
          <label htmlFor="headerLink" style={{ fontWeight: 'bold', marginBottom: '5px' }}>Link:</label>
          <input
            type="text"
            id="headerLink"
            name="link"
            value={header.link}
            onChange={handleHeaderChange}
            style={{ width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
          />
          <button
            type="button"
            onClick={handleSubmit}
            style={{ backgroundColor: '#28a745', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          >
            Crear Inicio
          </button>
        </div>

        <div style={{ fontFamily: "Arial, sans-serif", padding: "20px", maxWidth: "800px", margin: "auto", backgroundColor: "#f9f9f9", borderRadius: "8px", boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" }}>
          <h1 style={{ textAlign: "center", color: "#333" }}>Gestión de Servicios</h1>
          <br />
          <br />

          <div style={{ marginBottom: "20px" }}>
            <h2 style={{ color: "#444" }}>Servicios Cargados</h2>
            {services.map((service) => (
              <div key={service.id} style={{ marginBottom: "15px", padding: "10px", backgroundColor: "#fff", border: "1px solid #ccc", borderRadius: "4px" }}>
                <p><strong>Texto 1:</strong> {service.texto1}</p>
                <p><strong>Texto 2:</strong> {service.texto2}</p>
                <p><strong>Link:</strong> <a href={service.link} target="_blank" rel="noopener noreferrer">{service.link}</a></p>
                <button
                  onClick={() => handleDeleteService(service.servicioId)}
                  style={{ backgroundColor: "#d9534f", color: "white", padding: "10px 20px", border: "none", borderRadius: "4px", cursor: "pointer" }}
                >
                  Eliminar
                </button>
              </div>
            ))}
          </div>

          <form >
            <h2 style={{ color: "#444" }}>Agregar Nuevo Servicio</h2>
            <label htmlFor="texto1" style={{ fontWeight: "bold", marginBottom: "5px" }}>Texto 1:</label>
            <textarea id="texto1" name="texto1" value={newService.texto1} onChange={handleNewServiceChange} style={{ width: "100%", padding: "10px", marginBottom: "10px", border: "1px solid #ccc", borderRadius: "4px" }}></textarea>
            <label htmlFor="texto2" style={{ fontWeight: "bold", marginBottom: "5px" }}>Texto 2:</label>
            <textarea id="texto2" name="texto2" value={newService.texto2} onChange={handleNewServiceChange} style={{ width: "100%", padding: "10px", marginBottom: "10px", border: "1px solid #ccc", borderRadius: "4px" }}></textarea>
            <label htmlFor="link" style={{ fontWeight: "bold", marginBottom: "5px" }}>Link:</label>
            <input type="text" id="link" name="link" value={newService.link} onChange={handleNewServiceChange} style={{ width: "100%", padding: "10px", marginBottom: "10px", border: "1px solid #ccc", borderRadius: "4px" }} />
            <button type="submit" style={{ backgroundColor: "#007bff", color: "white", padding: "10px 20px", border: "none", borderRadius: "4px", cursor: "pointer" }} onClick={handleNewServiceSubmit}>Agregar Servicio</button>
          </form>
        </div>

        <div style={{ fontFamily: "Arial, sans-serif", padding: "20px", maxWidth: "800px", margin: "auto", backgroundColor: "#f9f9f9", borderRadius: "8px", boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" }}>
          <h1 style={{ textAlign: "center", color: "#333" }}>Gestión de Doctores</h1>

          <div style={{ marginBottom: "20px" }}>
            <h2 style={{ color: "#444" }}>Empleados Cargados</h2>
            {doctores.map((doctor) => (
              <div key={doctor.id} style={{ marginBottom: "15px", padding: "10px", backgroundColor: "#fff", border: "1px solid #ccc", borderRadius: "4px" }}>
                <p><strong>Nombre:</strong> {doctor.nombre}</p>
                <p><strong>Especialidad:</strong> {doctor.especialidad}</p>
                <p><strong>Descripción:</strong> {doctor.descripcion}</p>
                <p><strong>Titulo:</strong> {doctor.titulo}</p>
                <p><strong>introduccion:</strong> {doctor.descripcion}</p>
                <p><strong>Foto:</strong> {doctor.photo}</p>
                <button
                  onClick={() => deleteDoctor(doctor.id)}
                  style={{ backgroundColor: "#dc3545", color: "white", padding: "5px 10px", border: "none", borderRadius: "4px", cursor: "pointer", marginTop: '10px' }}
                >
                  Eliminar
                </button>
              </div>
            ))}
          </div>

          <form>
            <h1>Crear Nuevo Empleado</h1>
            <label htmlFor="nombre" style={{ fontWeight: "bold", marginBottom: "5px" }}>Nombre:</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={doctorData.nombre}
              onChange={handleDoctorChange}
              style={{ width: "100%", padding: "10px", marginBottom: "10px", border: "1px solid #ccc", borderRadius: "4px" }}
            />
            <label htmlFor="especialidad" style={{ fontWeight: "bold", marginBottom: "5px" }}>Especialidad:</label>
            <input
              type="text"
              id="especialidad"
              name="especialidad"
              value={doctorData.especialidad}
              onChange={handleDoctorChange}
              style={{ width: "100%", padding: "10px", marginBottom: "10px", border: "1px solid #ccc", borderRadius: "4px" }}
            />
            <label htmlFor="introduccion" style={{ fontWeight: "bold", marginBottom: "5px" }}>introduccion:</label>
            <input
              type="text"
              id="introduccion"
              name="introduccion"
              value={doctorData.introduccion}
              onChange={handleDoctorChange}
              style={{ width: "100%", padding: "10px", marginBottom: "10px", border: "1px solid #ccc", borderRadius: "4px" }}
            />
            <label htmlFor="titulo" style={{ fontWeight: "bold", marginBottom: "5px" }}>titulo:</label>
            <input
              type="text"
              id="titulo"
              name="titulo"
              value={doctorData.titulo}
              onChange={handleDoctorChange}
              style={{ width: "100%", padding: "10px", marginBottom: "10px", border: "1px solid #ccc", borderRadius: "4px" }}
            />
            <label htmlFor="descripcion" style={{ fontWeight: "bold", marginBottom: "5px" }}>Descripción:</label>
            <textarea
              id="descripcion"
              name="descripcion"
              value={doctorData.descripcion}
              onChange={handleDoctorChange}
              style={{ width: "100%", padding: "10px", marginBottom: "10px", border: "1px solid #ccc", borderRadius: "4px" }}
            ></textarea>
            <label htmlFor="photo" style={{ fontWeight: "bold", marginBottom: "5px" }}>Photo:</label>
            <input
              type="text"
              id="photo"
              name="photo"
              value={doctorData.photo}
              onChange={handleDoctorChange}
              style={{ width: "100%", padding: "10px", marginBottom: "10px", border: "1px solid #ccc", borderRadius: "4px" }}
            />
            <button
              type="button"
              onClick={createDoctor}
              style={{ backgroundColor: "#007bff", color: "white", padding: "10px 20px", border: "none", borderRadius: "4px", cursor: "pointer" }}
            >
              Agregar Doctor
            </button>
          </form>
        </div>

        <h2>Gestion de Fotos</h2>
<br />

<div style={{ marginBottom: "20px" }}>
        <h2 style={{ color: "#444" }}>Fotos Cargadas</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {fotos.map((foto) => (
            
            <div key={foto.id} style={{ margin: "10px", textAlign: "center" }}>
              <img src={foto.imageUrl} alt={foto.description} style={{ maxWidth: "200px", maxHeight: "150px" }} />
              <p>{foto.description}</p>
              <button onClick={() => eliminarFoto(foto.galleryId)} style={{ backgroundColor: "#dc3545", color: "white", padding: "5px 10px", border: "none", borderRadius: "4px", cursor: "pointer", marginTop: '10px' }}>
                Eliminar
              </button>
            </div>
          ))}
        </div>
      </div>


      <h2>Cargar Nueva Foto</h2>


      <form> 
  <input
    type="text"
    placeholder="Descripción"
    value={fotoDescription}
    onChange={(e) => setFotoDescription(e.target.value)}
    style={{ width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
  />
  <input
    type="text"
    placeholder="Cargar foto (URL)"
    value={fotoUrl}
    onChange={(e) => setFotoUrl(e.target.value)}
    style={{ width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
  />
  <button 
    type="button" // Cambiado a "button" para evitar el envío del formulario
    onClick={cargarFoto} // Agregado onClick para ejecutar la función
    style={{ backgroundColor: '#007bff', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
  >
    Cargar foto
  </button>
</form>

        <div style={{ fontFamily: "Arial, sans-serif", padding: "20px", maxWidth: "800px", margin: "auto", backgroundColor: "#f9f9f9", borderRadius: "8px", boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" }}>
          <h1 style={{ textAlign: "center", color: "#333" }}>Gestión de Cirugías</h1>
          <br />
          <div style={{ marginBottom: "20px" }}>
        <h2 style={{ color: "#444" }}>Cirugías Cargadas</h2>
        {cirugias.map((cirugia) => (
          <div key={cirugia.cirugiasId} style={{ marginBottom: "15px", padding: "10px", backgroundColor: "#fff", border: "1px solid #ccc", borderRadius: "4px" }}>
            <p><strong>Texto 1:</strong> {cirugia.texto1}</p>
            <p><strong>Texto 2:</strong> {cirugia.texto2}</p>
            <p><strong>Link:</strong> <a href={cirugia.link} target="_blank" rel="noopener noreferrer">{cirugia.link}</a></p>
            <button
              onClick={() => deleteCirugia(cirugia.id)}
              style={{ backgroundColor: "#d9534f", color: "white", padding: "10px 20px", border: "none", borderRadius: "4px", cursor: "pointer" }}
            >
              Eliminar
            </button>
          </div>
        ))}
      </div>
              <form>
      <h2 style={{ color: "#444" }}>Agregar Nueva Cirugías</h2>
      <label htmlFor="texto1" style={{ fontWeight: "bold", marginBottom: "5px" }}>Texto 1:</label>
      <textarea
        id="texto1"
        name="texto1"
        value={newService.texto1}
        onChange={handleNewServiceChange}
        style={{ width: "100%", padding: "10px", marginBottom: "10px", border: "1px solid #ccc", borderRadius: "4px" }}
      ></textarea>
      <label htmlFor="texto2" style={{ fontWeight: "bold", marginBottom: "5px" }}>Texto 2:</label>
      <textarea
        id="texto2"
        name="texto2"
        value={newService.texto2}
        onChange={handleNewServiceChange}
        style={{ width: "100%", padding: "10px", marginBottom: "10px", border: "1px solid #ccc", borderRadius: "4px" }}
      ></textarea>
      <label htmlFor="link" style={{ fontWeight: "bold", marginBottom: "5px" }}>Link:</label>
      <input
        type="text"
        id="link"
        name="link"
        value={newService.link}
        onChange={handleNewServiceChange}
        style={{ width: "100%", padding: "10px", marginBottom: "10px", border: "1px solid #ccc", borderRadius: "4px" }}
      />
      <button
        type="button"
        onClick={crearCirugia}
        style={{ backgroundColor: "#007bff", color: "white", padding: "10px 20px", border: "none", borderRadius: "4px", cursor: "pointer" }}
      >
        Agregar Servicio
      </button>
    </form>
            </div>

            <button type="submit" style={{ backgroundColor: '#007bff', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Cargar</button>
          </form>
        </div>
      );
    };

    export default AdminPage;