import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Login from "../components/Login.jsx"; // Asumiendo que esta es la ruta correcta

import SignUp from "../components/SingUp.jsx"; // Asumiendo que esta es la ruta correcta
import {About} from "../components/about.jsx"; // Asumiendo que esta es la ruta correcta
import {Contact} from "../components/contact.jsx"; // Asumiendo que esta es la ruta correcta

import ProtectedRoute from "../routes/ProtectedRoutes.jsx";

import NavBar from "../components/navigation.jsx"; // Asumiendo que esta es la ruta correcta

import AdminPage from "../components/admin.jsx"; // Asumiendo que esta es la ruta correcta
import AdminRoute from './adminRoute.jsx';

import { Header } from "../components/header.jsx";
import { Features } from "../components/features";
import {Team} from "../components/Team";
import { Services } from "../components/services";
import { Gallery } from "../components/gallery";
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <NavBar />
        <Header data={Header} />
        <Team data={Team} />
        <Features data={Features} />
        <About data={About} />
        <Services data={Services} />
        <Gallery data={Gallery} />
        <Contact data={Contact} />
      </>
      
    ),
  },
  {
    path: "about",
    element: <About />,
  },
  {
    path: "admin",
    element: (
      <AdminRoute>
        <AdminPage />
      </AdminRoute>
    ),
  },
  {
    path: "contact",
    element: <Contact />,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "singup",
    element: <SignUp />,
  },
]);

const MyRoutes = () => {
  return <RouterProvider router={router} />;
};

export default MyRoutes;