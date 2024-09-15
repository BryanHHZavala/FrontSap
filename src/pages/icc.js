import React, { useEffect, useState } from "react"; // Importa React y los hooks useEffect y useState
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
} from "reactstrap"; // Importa componentes de reactstrap para diseño y formularios
import "bootstrap/dist/css/bootstrap.min.css"; // Importa los estilos de Bootstrap
import "../assets/styles/pemsuns.css"; // Importa estilos personalizados
import { ToastContainer, toast } from "react-toastify"; // Importa componentes para notificaciones

const ICC = () => {
  // Define el componente funcional ICC
  const [data, setData] = useState([]); // Estado para almacenar datos de las clases
  const [loading, setLoading] = useState(true); // Estado para manejar el estado de carga
  const [selectedClass, setSelectedClass] = useState(null); // Estado para la clase seleccionada
  const [formData, setFormData] = useState({
    // Estado para los datos del formulario
    horaInicio: "",
    idcatedratico: "",
    id_periodo: "",
  });
  const [modalOpen, setModalOpen] = useState(false); // Estado para controlar la visibilidad del modal
  const [catedraticos, setCatedraticos] = useState([]); // Estado para almacenar catedráticos
  const [errorMessage, setErrorMessage] = useState(""); // Estado para mensajes de error
  const [searchTerm, setSearchTerm] = useState(""); // Estado para el término de búsqueda
  const [periodos, setPeriodos] = useState([]); // Estado para almacenar periodos
  const [selectedPeriodo, setSelectedPeriodo] = useState(""); // Estado para el periodo seleccionado

  // Función para obtener datos de clases desde la API
  //muestra las clases por periodo y por carrera
  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://apiclasessap-lygw.onrender.com/api/carreras/IF01002/${selectedPeriodo}`
      ); // Realiza una solicitud a la API con el periodo seleccionado
      if (!response.ok) throw new Error("Network response was not ok"); // Maneja errores de red
      const result = await response.json(); // Convierte la respuesta en JSON
      console.log("Datos de clases:", result); // Muestra los datos en la consola
      setData(result || []); // Establece los datos obtenidos en el estado
    } catch (error) {
      console.error("Error fetching data:", error); // Maneja errores durante la obtención de datos
    } finally {
      setLoading(false); // Finaliza el estado de carga
    }
  };

  //mustra las clases segun el periodo seleccionado
  useEffect(() => {
    fetchData(); // Llama a fetchData cuando cambia el periodo seleccionado
  }, [selectedPeriodo]);

  //este useEffect obtiene los catedraticos para el modal
  useEffect(() => {
    const fetchCatedraticos = async () => {
      try {
        const response = await fetch("https://apiclasessap-lygw.onrender.com/api/catedraticos"); // Solicita datos de catedráticos
        if (!response.ok) throw new Error("Network response was not ok"); // Maneja errores de red
        const result = await response.json(); // Convierte la respuesta en JSON
        setCatedraticos(result || []); // Establece los datos de catedráticos en el estado
      } catch (error) {
        console.error("Error fetching catedraticos:", error); // Maneja errores durante la obtención de catedráticos
      }
    };
    fetchCatedraticos(); // Llama a fetchCatedraticos al montar el componente
  }, []);

  //obtiene los periodos y los ordena
  useEffect(() => {
    const fetchPeriodos = async () => {
      try {
        const response = await fetch("https://apiclasessap-lygw.onrender.com/api/getPeriodos"); // Solicita datos de periodos
        if (!response.ok) throw new Error("Network response was not ok"); // Maneja errores de red
        const result = await response.json(); // Convierte la respuesta en JSON
        setPeriodos(result || []); // Establece los datos de periodos en el estado
        if (result.length > 0) {
          setSelectedPeriodo(result[0].id_periodo); // Establece el primer periodo como seleccionado por defecto
          setFormData((prevData) => ({
            ...prevData,
            id_periodo: result[0].id_periodo, // Actualiza id_periodo en el estado del formulario
          }));
        }
      } catch (error) {
        console.error("Error fetching periodos:", error); // Maneja errores durante la obtención de periodos
      }
    };
    fetchPeriodos(); // Llama a fetchPeriodos al montar el componente
  }, []);

  // Función para manejar la selección de una clase
  const handleClassSelect = (classData) => {
    setSelectedClass(classData); // Establece la clase seleccionada en el estado
    setFormData({
      horaInicio: classData.hora_inicio || "",
      idcatedratico: classData.id_catedratico || "",
      id_periodo: formData.id_periodo || "",
    }); // Actualiza el estado del formulario con los datos de la clase seleccionada
    setModalOpen(true); // Abre el modal
  };

  // Función para manejar cambios en los inputs del formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target; // Obtiene el nombre y valor del input
    setFormData({ ...formData, [name]: value }); // Actualiza el estado del formulario
  };

  // Función para manejar cambios en el campo de búsqueda
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value); // Actualiza el término de búsqueda en el estado
  };

  // Función para manejar el envío del formulario

  // para agregar una nueva seccion, clases que esten en gris
  const handleSubmit = async (e) => {
    e.preventDefault(); // Previene el comportamiento por defecto del formulario
    setErrorMessage(""); // Limpia el mensaje de error
    if (selectedClass) {
      try {
        const response = await fetch(
          `https://apiclasessap-lygw.onrender.com/api/detalle_periodo`, // Ruta de la API para actualizar detalles
          {
            method: "POST", // Método HTTP para enviar datos
            headers: {
              "Content-Type": "application/json", // Tipo de contenido de la solicitud
            },
            body: JSON.stringify({
              id_clase: selectedClass.id_clase, //al momento de seleccionar una clase
              hora_inicio: formData.horaInicio, //mediante el modal
              id_catedratico: formData.idcatedratico, //mediante el modal
              id_periodo: formData.id_periodo, //por defecto
            }), // Datos a enviar en el cuerpo de la solicitud
          }
        );
        if (!response.ok) {
          const errorData = await response.json(); // Convierte la respuesta de error en JSON
          setErrorMessage(errorData.error || "Error al actualizar la clase."); // Establece el mensaje de error
          throw new Error("Network response was not ok"); // Lanza un error si la respuesta no es correcta
        }
        const result = await response.json(); // Convierte la respuesta en JSON
        console.log("Clase actualizada:", result); // Muestra los datos actualizados en la consola
        toast.success("Clase actualizada correctamente."); // Muestra una notificación de éxito
        await fetchData(); // Actualiza los datos después de la modificación
        setModalOpen(false); // Cierra el modal
      } catch (error) {
        console.error("Error updating class:", error); // Maneja errores durante la actualización
      }
    }
  };

  // Función para manejar la actualización de una clase
  // para clases que esten en verde y se deban actualizar
  const handleUpdateClass = async () => {
    if (selectedClass) {
      try {
        const response = await fetch(
          `https://apiclasessap-lygw.onrender.com/api/actualizar_seccion`, // Ruta de la API para actualizar sección
          {
            method: "PUT", // Método HTTP para actualizar datos
            headers: {
              "Content-Type": "application/json", // Tipo de contenido de la solicitud
            },
            body: JSON.stringify({
              id_clase: selectedClass.id_clase,
              hora_inicio: formData.horaInicio,
              id_catedratico: formData.idcatedratico,
              id_periodo: selectedPeriodo.id_periodo,
              seccion: formData.seccion,
            }), // Datos a enviar en el cuerpo de la solicitud
          }
        );
        if (!response.ok) {
          const errorData = await response.json(); // Convierte la respuesta de error en JSON
          setErrorMessage(errorData.error || "Error al actualizar la clase."); // Establece el mensaje de error
          throw new Error("Network response was not ok"); // Lanza un error si la respuesta no es correcta
        }
        const result = await response.json(); // Convierte la respuesta en JSON
        console.log("Clase actualizada:", result); // Muestra los datos actualizados en la consola
        toast.success("Clase actualizada correctamente."); // Muestra una notificación de éxito
        await fetchData(); // Actualiza los datos después de la modificación
        setModalOpen(false); // Cierra el modal
      } catch (error) {
        console.error("Error updating class:", error); // Maneja errores durante la actualización
      }
    }
  };

  // Función para manejar la eliminación de una sección
  const handleDeleteSection = async () => {
    if (selectedClass && formData.seccion && selectedPeriodo) {
      try {
        const response = await fetch(
          `https://apiclasessap-lygw.onrender.com/api/carreras/${selectedPeriodo}`, // Ruta de la API para eliminar sección
          {
            method: "DELETE", // Método HTTP para eliminar datos
            headers: {
              "Content-Type": "application/json", // Tipo de contenido de la solicitud
            },
            body: JSON.stringify({
              id_clase: selectedClass.id_clase,
              id_seccion: formData.seccion,
            }), // Datos a enviar en el cuerpo de la solicitud
          }
        );
        if (!response.ok) {
          const errorData = await response.json(); // Convierte la respuesta de error en JSON
          setErrorMessage(errorData.error || "Error al eliminar la sección."); // Establece el mensaje de error
          throw new Error("Network response was not ok"); // Lanza un error si la respuesta no es correcta
        }
        toast.success("Sección eliminada correctamente."); // Muestra una notificación de éxito
        await fetchData(); // Actualiza los datos después de la eliminación
        setModalOpen(false); // Cierra el modal
      } catch (error) {
        console.error("Error deleting section:", error); // Maneja errores durante la eliminación
      }
    } else {
      setErrorMessage("Por favor, seleccione una clase y una sección."); // Mensaje de error si no se selecciona clase o sección
    }
  };

  // Filtra los datos según el término de búsqueda
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

  // Muestra un spinner y mensaje de carga mientras se obtienen los datos
  if (loading) {
    return (
      <Container className="text-center spinner-container">
        <Spinner color="primary" /> {/* Spinner de carga */}
        <p>Loading...</p> {/* Mensaje de carga */}
      </Container>
    );
  }

  // Renderiza el componente
  return (
    <Container className="page-container" fluid style={{ marginTop: "6rem" }}>
      <Row>
        <Col sm="12">
          <div className="headerBanner">
            Ingeniería en Ciencias de la Computación
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
                    setSelectedPeriodo(e.target.value); // Actualiza el periodo seleccionado
                    setFormData((prevData) => ({
                      ...prevData,
                      id_periodo: e.target.value, // Actualiza id_periodo en el estado del formulario
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
              <h2>Bloque {blockData.bloque}</h2> {/* Muestra el bloque */}

              <Row>
                {(blockData.clases || []).map((classData, idx) => (
                  <Col sm="3" key={idx} className="mb-4">
                    <Card
                      onClick={() => handleClassSelect(classData)} // Maneja la selección de clase
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
                placeholder="HH:MM:SS"
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
                placeholder="Solo para eliminar y actualizar seccion "
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

            <Button
              color="success"
              onClick={handleUpdateClass} // Nuevo botón para actualizar clase
            >
              Actualizar
            </Button>
            
          </Form>
          {errorMessage && <p className="text-danger">{errorMessage}</p>}{" "}
          {/* Muestra mensaje de error si existe */}
        </ModalBody>
      </Modal>
      <ToastContainer /> {/* Contenedor para notificaciones */}
    </Container>
  );
};

export default ICC; // Exporta el componente ICC
