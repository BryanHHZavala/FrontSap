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

const ICC = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedClass, setSelectedClass] = useState(null);
  const [formData, setFormData] = useState({
    horaInicio: "",
    idcatedratico: "",
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [catedraticos, setCatedraticos] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  //const [idCarrera, setIdCarrera] = useState("C001"); // Estado para ID de la carrera

  // Función para obtener datos de clases
  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/clases/C001`);
      if (!response.ok) throw new Error("Network response was not ok");
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Llamar a fetchData con el ID de la carrera
  useEffect(() => {
    fetchData();
  }, []); // Dependencia en idCarrera para que se actualice cuando cambie

  useEffect(() => {
    const fetchCatedraticos = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/catedraticos/");
        if (!response.ok) throw new Error("Network response was not ok");
        const result = await response.json();
        setCatedraticos(result);
      } catch (error) {
       // console.error("Error fetching catedraticos:", error);
      }
    };

    fetchCatedraticos();
  }, []);

  const handleClassSelect = (classData) => {
    setSelectedClass(classData);
    setFormData({
      horaInicio: classData.horaInicio || "",
      idcatedratico: classData.idcatedratico || "",
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
          `http://localhost:5000/api/clases/${selectedClass.id_clase}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );
        if (!response.ok) {
          const errorData = await response.json();
          setErrorMessage(errorData.error || "Error al actualizar la clase.");
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        console.log("Clase actualizada:", result);
        await fetchData(); // Actualiza los datos después de la modificación
        setModalOpen(false);
      } catch (error) {
        console.error("Error updating class:", error);
      }
    }
  };

  const filteredData = data
    .map(blockData => ({
      ...blockData,
      clases: blockData.clases.filter(classData =>
        (classData.nombreclase || "").toLowerCase().includes(searchTerm.toLowerCase())
      ),
    }))
    .filter(blockData => blockData.clases.length > 0);

  if (loading) {
    return (
      <Container className="text-center spinner-container">
        <Spinner color="primary" />
        <p>Loading...</p>
      </Container>
    );
  }

  return (
    <Container fluid style={{ marginTop: "6rem" }}>
      <Row>
        <Col sm="12" className="mb-4">
          <FormGroup>
            <Label for="searchInput">Buscar Clase</Label>
            <Input
              type="text"
              id="searchInput"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Ingrese nombre de clase"
            />
          </FormGroup>
        </Col>

        <Col sm="12">
          {filteredData.map((blockData, index) => (
            <div key={index}>
              <h2>Bloque {blockData.bloque}</h2>
              <Row>
                {blockData.clases.map((classData, idx) => (
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
                          backgroundColor: classData.horaInicio
                            ? "green"
                            : "gray",
                        }}
                      />
                      <CardBody>
                        <CardTitle className="card-title-custom" tag="h5">
                          {classData.nombreclase}
                        </CardTitle>
                        <CardText className="card-text-custom">
                          ID Clase: {classData.id_clase}
                        </CardText>
                        <CardText className="card-text-custom">
                          Créditos: {classData.creditos}
                        </CardText>
                        <CardText className="card-text-custom">
                          Hora Inicio: {classData.horaInicio || "No asignada"}
                        </CardText>
                        <CardText className="card-text-custom">
                          Catedrático: {classData.catedratico || "No asignado"}
                        </CardText>
                        <Button onClick={() => handleClassSelect(classData)}>
                          Seleccionar Clase
                        </Button>
                      </CardBody>
                    </Card>
                  </Col>
                ))}
              </Row>
            </div>
          ))}
        </Col>

        <Modal
          isOpen={modalOpen}
          toggle={() => setModalOpen(false)}
          className="modal-custom"
        >
          <ModalHeader toggle={() => setModalOpen(false)}>
            Actualizar Clase
          </ModalHeader>
          <ModalBody>
            {selectedClass && (
              <Form onSubmit={handleSubmit}>
                <FormGroup>
                  <Label for="horaInicio">Hora de Inicio</Label>
                  <Input
                    type="text"
                    name="horaInicio"
                    id="horaInicio"
                    value={formData.horaInicio}
                    onChange={handleInputChange}
                    placeholder="Ingrese hora de inicio"
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="idcatedratico">Catedrático</Label>
                  <Input
                    type="select"
                    name="idcatedratico"
                    id="idcatedratico"
                    value={formData.idcatedratico}
                    onChange={handleInputChange}
                  >
                    <option value="">Seleccionar Catedrático</option>
                    {catedraticos.map((c) => (
                      <option key={c.idcatedratico} value={c.idcatedratico}>
                        {c.nombrecatedratico}
                      </option>
                    ))}
                  </Input>
                </FormGroup>
                <FormGroup check>
                  <Label check>
                    <Input
                      type="checkbox"
                      name="addSection"
                      checked={formData.addSection || false}
                      onChange={handleInputChange}
                    />
                    Agregar Sección
                  </Label>
                </FormGroup>
                {errorMessage && (
                  <div className="alert alert-danger alert-custom">
                    {errorMessage}
                  </div>
                )}
                <Button type="submit" color="primary">
                  Actualizar
                </Button>
              </Form>
            )}
          </ModalBody>
        </Modal>
      </Row>
    </Container>
  );
};

export default ICC;
