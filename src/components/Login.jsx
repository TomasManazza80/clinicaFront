import { useContext, useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import * as Yup from "yup";
import authContext from "../store/store";

const containerStyle = {
  maxWidth: '400px',
  margin: '0 auto',
  padding: '20px',
  border: '1px solid #ccc',
  borderRadius: '5px',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  backgroundColor: '#fff',
  textAlign: 'center'
};

const formGroupStyle = {
  marginBottom: '15px',
  textAlign: 'left'
};

const labelStyle = {
  display: 'block',
  marginBottom: '5px',
  fontWeight: 'bold'
};

const inputStyle = {
  width: '100%',
  padding: '10px',
  border: '1px solid #ccc',
  borderRadius: '3px'
};

const buttonStyle = {
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  padding: '10px 20px',
  textTransform: 'uppercase',
  cursor: 'pointer',
  margin: '5px',
  transition: 'background-color 0.3s ease'
};

const buttonHoverStyle = {
  backgroundColor: '#0056b3'
};

function Login() {
  const navigate = useNavigate();
  const authCtx = useContext(authContext);
  const [hover, setHover] = useState(false);

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid Email").required("Required"),
    password: Yup.string().required("Required"),
  });

  const onSubmit = async (values) => {
    console.log("Form data", values);
    try {
      const data = {
        email: values.email,
        password: values.password,
      };

      axios
        .post(`https://ophthalmologicalclinicback.onrender.com/login`, data)
        .then((response) => {
          console.log(response);
          alert(`Welcome back! ${response.data.email}`);
          authCtx.setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          navigate("/admin");
        })
        .catch((error) => {
          console.log("Error of", error);
          alert("Login failed: " + error.response.data);
        });
    } catch (error) {
      alert(error.message);
      console.log(error.message);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    authCtx.setToken(token);
    if (token) {
      // navigate("/");
    }
  }, [authCtx, navigate]);

  return (
    <div style={containerStyle} className="login-container">
      <h2>Login</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form>
          <div style={formGroupStyle} className="form-group">
            <label style={labelStyle} htmlFor="email">Correo electrónico</label>
            <Field
              type="email"
              name="email"
              id="email"
              style={inputStyle}
              placeholder="Email"
            />
            <p style={{ color: 'red' }}>
              <ErrorMessage name="email" />
            </p>
          </div>
          <div style={formGroupStyle} className="form-group">
            <label style={labelStyle} htmlFor="password">Contraseña</label>
            <Field
              type="password"
              name="password"
              id="password"
              style={inputStyle}
              placeholder="Password"
            />
            <p style={{ color: 'red' }}>
              <ErrorMessage name="password" />
            </p>
          </div>
          <button
            type="submit"
            style={hover ? { ...buttonStyle, ...buttonHoverStyle } : buttonStyle}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            Login
          </button>
        </Form>
      </Formik>
      <p>
        Don't have an account? &nbsp;
        <NavLink to="/signup" style={{ color: 'red' }}>
          Sign Up
        </NavLink>
      </p>
    </div>
  );
}

export default Login;
