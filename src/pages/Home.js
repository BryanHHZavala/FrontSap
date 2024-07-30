import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../assets/styles/Home.css";
import { carreras } from "../config/routesConfig";

const Home = () => {
  return (
    <>
      <div className="fondo">
        <div className="container mt-5">
          <div className="row text-center">
            {carreras.map((carrera, index) => (
              <div className="col-md-6 mb-3" key={index}>
                <Link to={carrera.path} className="btn btn-dark w-75">
                  {carrera.name}{" "}
                  <i className={`bi ${getIconClass(carrera.name)} ms-2 text-white`}></i>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

// Función para obtener la clase del icono basado en el nombre de la carrera
const getIconClass = (name) => {
  switch (name) {
    case "SISTEMAS":
      return "bi-laptop";
    case "CIVIL":
      return "bi-building";
    case "INDUSTRIAL":
      return "bi-tools";
    case "DERECHO":
      return "bi-bank";
    case "MEDICINA":
      return "bi-hospital";
    case "GESTION":
      return "bi-clipboard2-data";
    case "MERCADOTECNIA":
      return "bi-lightbulb";
    case "PSICOLOGIA":
      return "bi-heart-pulse";
    default:
      return "";
  }
};

export default Home;
