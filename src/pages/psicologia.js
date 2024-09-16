import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardText,
  Spinner,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/styles/pemsuns.css";
import { ToastContainer, toast } from "react-toastify";

const PSICO = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedClass, setSelectedClass] = useState(null);
  const [formData, setFormData] = useState({
    horaInicio: "",
    idcatedratico: "",
    id_periodo: "",
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [catedraticos, setCatedraticos] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [periodos, setPeriodos] = useState([]);
  const [selectedPeriodo, setSelectedPeriodo] = useState("");

  // Función para obtener datos de clases
  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://apiclasessap-lygw.onrender.com/api/carreras/PS01001/${selectedPeriodo}`
      );
      if (!response.ok) throw new Error("Network response was not ok");
      const result = await response.json();
      console.log("Datos de clases:", result); // Verifica la estructura de los datos
      setData(result || []); // Asegúrate de que `data` sea un array
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedPeriodo]); // Dependencia en `selectedPeriodo` para actualizar datos al cambiar el período

  useEffect(() => {
    const fetchCatedraticos = async () => {
      try {
        const response = await fetch("https://apiclasessap-lygw.onrender.com/api/catedraticos");
        if (!response.ok) throw new Error("Network response was not ok");
        const result = await response.json();
        setCatedraticos(result || []); // Asegúrate de que `catedraticos` sea un array
      } catch (error) {
        console.error("Error fetching catedraticos:", error);
      }
    };

    fetchCatedraticos();
  }, []);

  useEffect(() => {
    const fetchPeriodos = async () => {
      try {
        const response = await fetch("https://apiclasessap-lygw.onrender.com/api/getPeriodos");
        if (!response.ok) throw new Error("Network response was not ok");
        const result = await response.json();
        setPeriodos(result || []); // Asegúrate de que `periodos` sea un array
        if (result.length > 0) {
          setSelectedPeriodo(result[0].id_periodo); // Establece el primer período como seleccionado por defecto
          setFormData((prevData) => ({
            ...prevData,
            id_periodo: result[0].id_periodo, // Establecer id_periodo por defecto
          }));
        }
      } catch (error) {
        console.error("Error fetching periodos:", error);
      }
    };

    fetchPeriodos();
  }, []);

  const handleClassSelect = (classData) => {
    setSelectedClass(classData);
    setFormData({
      horaInicio: classData.hora_inicio || "",
      idcatedratico: classData.id_catedratico || "",
      id_periodo: formData.id_periodo || "",
    });
    setModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    if (selectedClass) {
      try {
        const response = await fetch(
          `https://apiclasessap-lygw.onrender.com/api/detalle_periodo`, // Ruta actualizada
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id_clase: selectedClass.id_clase,
              hora_inicio: formData.horaInicio,
              id_catedratico: formData.idcatedratico,
              id_periodo: formData.id_periodo,
            }),
          }
        );
        if (!response.ok) {
          const errorData = await response.json();
          setErrorMessage(errorData.error || "Error al actualizar la clase.");
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        console.log("Clase actualizada:", result);
        toast.success("Clase actualizada correctamente."); // Notificación de éxito
        await fetchData(); // Actualiza los datos después de la modificación
        setModalOpen(false);
      } catch (error) {
        console.error("Error updating class:", error);
      }
    }
  };
  const handleUpdateClass = async () => {
    if (selectedClass) {
      try {
        const response = await fetch(
          `https://apiclasessap-lygw.onrender.com/api/actualizar_seccion`, // Ruta de la API para actualizar
          {
            method: "PUT", // Cambia a PUT si estás actualizando datos
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id_clase: selectedClass.id_clase,
              hora_inicio: formData.horaInicio,
              id_catedratico: formData.idcatedratico,
              id_periodo: selectedPeriodo.id_periodo,
              seccion: formData.seccion,
            }),
          }
        );
        if (!response.ok) {
          const errorData = await response.json();
          setErrorMessage(errorData.error || "Error al actualizar la clase.");
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        console.log("Clase actualizada:", result);
        toast.success("Clase actualizada correctamente.");
        await fetchData(); // Actualiza los datos después de la modificación
        setModalOpen(false);
      } catch (error) {
        console.error("Error updating class:", error);
      }
    }
  };

  const handleDeleteSection = async () => {
    if (selectedClass && formData.seccion && selectedPeriodo) {
      try {
        const response = await fetch(
          `https://apiclasessap-lygw.onrender.com/api/carreras/${selectedPeriodo}`, // Solo el periodo en la ruta
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id_clase: selectedClass.id_clase,
              id_seccion: formData.seccion,
            }),
          }
        );
        if (!response.ok) {
          const errorData = await response.json();
          setErrorMessage(errorData.error || "Error al eliminar la sección.");
          throw new Error("Network response was not ok");
        }
        toast.success("Sección eliminada correctamente."); // Notificación de éxito
        await fetchData(); // Actualiza los datos después de la eliminación
        setModalOpen(false);
      } catch (error) {
        console.error("Error deleting section:", error);
      }
    } else {
      setErrorMessage("Por favor, seleccione una clase y una sección.");
    }
  };

  const filteredData = (data || [])
    .map((blockData) => ({
      ...blockData,
      clases: (blockData.clases || []).filter((classData) =>
        (classData.nombre_clase || "")
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      ),
    }))
    .filter((blockData) => (blockData.clases || []).length > 0);

  if (loading) {
    return (
      <Container className="text-center spinner-container">
        <Spinner color="primary" />
        <p>Loading...</p>
      </Container>
    );
  }

  return (
    <Container className="page-container" fluid style={{ marginTop: "6rem" }}>
      <Row>
        <Col sm="12">
          <div className="headerBanner">
            Psicologia
          </div>
        </Col>
      </Row>

      <Row>
        <Col sm="12" className="mb-4">
          <FormGroup row className="form-group-custom">
            <Col sm="6">
              <Label for="searchInput" className="form-label-custom">
                Buscar Clase
              </Label>
              <Input
                type="text"
                id="searchInput"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Ingrese nombre de clase, use tildes de ser necesario"
                style={{ width: "100%" }}
              />
            </Col>
            <Col sm="6">
              <FormGroup>
                <Label for="periodoSelect" className="form-label-custom">
                  Periodo Actual
                </Label>
                <Input
                  type="select"
                  id="periodoSelect"
                  value={selectedPeriodo}
                  onChange={(e) => {
                    setSelectedPeriodo(e.target.value);
                    setFormData((prevData) => ({
                      ...prevData,
                      id_periodo: e.target.value, // Actualizar id_periodo
                    }));
                  }}
                >
                  {periodos.map((p) => (
                    <option key={p.id_periodo} value={p.id_periodo}>
                      {p.id_periodo}
                    </option>
                  ))}
                </Input>
              </FormGroup>
            </Col>
          </FormGroup>
        </Col>

        <Col sm="12">
          {filteredData.map((blockData, index) => (
            <div key={index}>
              <h2>Bloque {blockData.bloque}</h2>
              <Row>
                {(blockData.clases || []).map((classData, idx) => (
                  <Col sm="3" key={idx} className="mb-4">
                    <Card
                      onClick={() => handleClassSelect(classData)}
                      className="card-custom"
                      style={{
                        borderColor:
                          selectedClass?.id_clase === classData.id_clase
                            ? "blue"
                            : "transparent",
                      }}
                    >
                      <div
                        className="card-header-custom"
                        style={{
                          backgroundColor:
                            classData.secciones &&
                            classData.secciones.some(
                              (section) =>
                                section.hora_inicio &&
                                section.catedratico &&
                                section.seccion
                            )
                              ? "lightgreen"
                              : "gray",
                        }}
                      />
                      <CardBody>
                        <CardTitle className="card-title-custom" tag="h5">
                          {classData.nombre_clase}
                        </CardTitle>
                        <CardText>
                          {`ID: ${classData.id_clase || "No asignado"}`}
                        </CardText>
                        {classData.secciones &&
                        classData.secciones.length > 0 ? (
                          classData.secciones.map((section, i) => (
                            <div key={i} className="section-details">
                              <p>{`Sección: ${section.seccion}`}</p>
                              <p>{`Hora de Inicio: ${section.hora_inicio}`}</p>
                              <p>{`Catedrático: ${section.catedratico}`}</p>
                              <hr className="section-divider" />
                            </div>
                          ))
                        ) : (
                          <p>No hay secciones asignadas.</p>
                        )}
                      </CardBody>
                    </Card>
                  </Col>
                ))}
              </Row>
            </div>
          ))}
        </Col>
      </Row>

      <Modal isOpen={modalOpen} toggle={() => setModalOpen(!modalOpen)}>
        <ModalHeader toggle={() => setModalOpen(!modalOpen)}>
          Actualizar Clase
        </ModalHeader>
        <ModalBody>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="horaInicio">Hora de Inicio</Label>
              <Input
                type="text"
                id="horaInicio"
                name="horaInicio"
                value={formData.horaInicio}
                onChange={handleInputChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="idcatedratico">Catedrático</Label>
              <Input
                type="select"
                id="idcatedratico"
                name="idcatedratico"
                value={formData.idcatedratico}
                onChange={handleInputChange}
                required
              >
                <option value="">Seleccione un catedrático</option>
                {catedraticos.map((catedratico) => (
                  <option
                    key={catedratico.id_catedratico}
                    value={catedratico.id_catedratico}
                  >
                    {catedratico.nombre_catedratico}
                  </option>
                ))}
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="seccion">Sección</Label>
              <Input
                type="text"
                placeholder="Solo para eliminar seccion"
                id="seccion"
                name="seccion"
                value={formData.seccion || ""}
                onChange={handleInputChange}
              />
            </FormGroup>
            <Button color="primary" type="submit">
              Agregar
            </Button>{" "}
            <Button
              color="danger"
              onClick={handleDeleteSection}
              disabled={!formData.seccion}
            >
              Eliminar
            </Button>{" "}
            <Button color="secondary" onClick={() => setModalOpen(false)}>
              Cancelar
            </Button>{" "}
            <Button
              color="success"
              onClick={handleUpdateClass} // Nuevo botón para actualizar clase
            >
              Actualizar
            </Button>
          </Form>
          {errorMessage && <p className="text-danger">{errorMessage}</p>}
        </ModalBody>
      </Modal>

      <ToastContainer />
    </Container>
  );
};

export default PSICO;
