import React, { useState, useEffect } from 'react';

const URL = 'https://ophthalmologicalclinicback.onrender.com';

const AdminPage = () => {
  const [doctores, setDoctores] = useState([]);
  const [services, setServices] = useState([]);
  const [newService, setNewService] = useState({
    texto1: '',
    texto2: '',
    link: '',
  });
  const [doctorData, setDoctorData] = useState({
    nombre: '',
    especialidad: '',
    descripcion: '',
    titulo: 'NUESTROS PROFESIONALES',
    introduccion: 'Conoce a los profesionales dedicados a brindarte el mejor servicio.',
    photo: '',
  });

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch(`${URL}/servicios/getAllServices`);
        if (!response.ok) {
          throw new Error('Error al obtener los servicios');
        }
        const data = await response.json();
        setServices(data);
      } catch (error) {
        console.error('Error al cargar los servicios:', error);
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
      alert('Todos los campos son obligatorios');
      return;
    }

    try {
      const response = await fetch(`${URL}/servicios/createService`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newService),
      });

      if (!response.ok) {
        throw new Error('Error al crear el servicio');
      }

      const result = await response.json();
      console.log('Respuesta del servidor:', result);

      setServices((prevServices) => [...prevServices, result]);
      setNewService({
        texto1: '',
        texto2: '',
        link: '',
      });
    } catch (error) {
      console.error('Error al crear el servicio:', error);
    }
  };

  const handleDeleteService = async (id) => {
    try {
      const response = await fetch(`${URL}/servicios/deleteService/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Error al eliminar el servicio');
      }

      const result = await response.json();
      console.log('Respuesta del servidor:', result);

      setServices((prevServices) => prevServices.filter((service) => service.id !== id));
    } catch (error) {
      console.error('Error al eliminar el servicio:', error);
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
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(doctorData),
      });

      if (!response.ok) {
        throw new Error('Error al enviar los datos al servidor');
      }

      const result = await response.json();
      console.log('Respuesta del servidor:', result);

      setDoctores((prevDoctores) => [...prevDoctores, result]);
      setDoctorData({
        nombre: '',
        especialidad: '',
        descripcion: '',
        titulo: 'NUESTROS PROFESIONALES',
        introduccion: 'Conoce a los profesionales dedicados a brindarte el mejor servicio.',
        photo: '',
      });
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  return (
    <div>
      {/* ... */}
    </div>
  );
};

export default AdminPage;