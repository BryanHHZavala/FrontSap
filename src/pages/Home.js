import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../assets/styles/Home.css"; // Asegúrate de tener un archivo CSS para los estilos adicionales
import derecho from "../assets/images/DERECHO.jpg";
import civil from "../assets/images/CIVIL.jpg";
import industrial from "../assets/images/INDUSTRIAL.jpg";
import sistemas from "../assets/images/SISTEMAS.jpg";
import gestion from "../assets/images/GESTION.jpg";
import medicina from "../assets/images/MEDICINA.jpg";
import merca from "../assets/images/MERCADOTECNIA.PNG";
import psico from "../assets/images/PSICOLOGIA.jpg";

const Home = () => {
  return (
    <>
      <div class="container text-center">
        <div class="row align-items-center">
          <div class="col">
            <div className="container mt-5">
              <a href="/facu" class="btn">
                <img src={derecho} className="card-img-top" alt="Derecho" />
              </a>
              <h3>Derecho</h3>
            </div>
          </div>
          <div class="col">
            <div className="container mt-5">
              <a href="/facu" class="btn">
                <img
                  src={civil}
                  className="card-img-top"
                  alt="Descripción de la imagen"
                />
              </a>
              <h3 className="ms-3">Ingenieria civil</h3>
            </div>
          </div>
          <div class="col">
            <div className="container mt-5">
              <a href="/facu" class="btn">
                <img
                  src={industrial}
                  className="card-img-top"
                  alt="Descripción de la imagen"
                />
              </a>
              <h3 className="ms-3">Ingenieria industrial</h3>
            </div>
          </div>
          <div class="col">
            <div className="container mt-5">
              <a href="/facu" class="btn">
                <img
                  src={sistemas}
                  className="card-img-top"
                  alt="Descripción de la imagen"
                />
              </a>
              <h3 className="ms-4">Ingenieria en ciencias de la computación</h3>
            </div>
          </div>
        </div>
      </div>
      <div class="container text-center">
        <div class="row align-items-center">
          <div class="col">
            <div className="container mt-5">
              <a href="/facu" class="btn">
                <img
                  src={psico}
                  className="card-img-top"
                  alt="Descripción de la imagen"
                />
              </a>
              <h3 className="">Psicologia</h3>
            </div>
          </div>
          <div class="col">
            <div className="container mt-5">
              <a href="/facu" class="btn">
                <img
                  src={gestion}
                  className="card-img-top"
                  alt="Descripción de la imagen"
                />
              </a>
              <h3 className="ms-1">Gestion estrategica de empresa</h3>
            </div>
          </div>
          <div class="col">
            <div className="container mt-5">
              <a href="/facu" class="btn">
                <img
                  src={medicina}
                  className="card-img-top"
                  alt="Descripción de la imagen"
                />
              </a>
              <h3>Medicina</h3>
            </div>
          </div>
          <div class="col">
            <div className="container mt-5">
              <a href="/facu" class="btn">
                <img
                  src={merca}
                  className="card-img-top"
                  alt="Descripción de la imagen"
                />
              </a>
              <h3 className="">Mercadoctenia</h3>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
