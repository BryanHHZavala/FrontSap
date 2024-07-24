import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, CardBody, CardTitle, CardText, Spinner, Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const ICC = () => {
  // Estado para almacenar los datos de las clases
  const [data, setData] = useState([]);
  // Estado para manejar la carga de datos
  const [loading, setLoading] = useState(true);
  // Estado para almacenar la clase seleccionada para edición
  const [selectedClass, setSelectedClass] = useState(null);
  // Estado para manejar los datos del formulario
  const [formData, setFormData] = useState({ horaInicio: '', idcatedratico: '' });
  // Estado para controlar la apertura y cierre del modal
  const [modalOpen, setModalOpen] = useState(false);
  // Estado para almacenar los catedráticos disponibles
  const [catedraticos, setCatedraticos] = useState([]);
  // Estado para manejar mensajes de error
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Función para obtener los datos de las clases
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/clases');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Dependencias vacías, se ejecuta una vez al montar el componente

  useEffect(() => {
    // Función para obtener los catedráticos
    const fetchCatedraticos = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/catedraticos/');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setCatedraticos(result);
      } catch (error) {
        console.error('Error fetching catedraticos:', error);
      }
    };

    fetchCatedraticos();
  }, []); // Dependencias vacías, se ejecuta una vez al montar el componente

  // Maneja la selección de una clase y abre el modal de edición
  const handleClassSelect = (classData) => {
    setSelectedClass(classData);
    setFormData({
      horaInicio: classData.horaInicio || '',
      idcatedratico: classData.idcatedratico || ''
    });
    setModalOpen(true);
  };

  // Maneja los cambios en los campos del formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Maneja el envío del formulario para actualizar la clase
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Limpiar mensaje de error anterior
    if (selectedClass) {
      try {
        const response = await fetch(`http://localhost:5000/api/clases/${selectedClass.id_clase}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });
        if (!response.ok) {
          const errorData = await response.json();
          setErrorMessage(errorData.error || 'Error al actualizar la clase.');
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        console.log('Clase actualizada:', result);
        // Refrescar los datos después de la actualización
        await fetchData();
        setModalOpen(false);
      } catch (error) {
        console.error('Error updating class:', error);
      }
    }
  };

  // Función para obtener los datos de las clases (se reutiliza en handleSubmit)
  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/clases');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Muestra un spinner mientras se cargan los datos
  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner color="primary" />
        <p>Loading...</p>
      </Container>
    );
  }

  return (
    <Container style={{ marginTop: '6rem' }}>
      <Row>
        <Col sm="8">
          {/* Muestra los bloques y clases */}
          {data.map((blockData, index) => (
            <div key={index}>
              <h2>Bloque {blockData.bloque}</h2>
              <Row>
                {blockData.clases.map((classData, idx) => (
                  <Col sm="4" key={idx} className="mb-4">
                    <Card
                      onClick={() => handleClassSelect(classData)}
                      style={{
                        borderColor: selectedClass?.id_clase === classData.id_clase ? 'blue' : 'transparent'
                      }}
                    >
                      <div
                        style={{
                          backgroundColor: classData.horaInicio ? 'green' : 'gray',
                          height: '5px'
                        }}
                      />
                      <CardBody>
                        <CardTitle tag="h5">{classData.nombreclase}</CardTitle>
                        <CardText>ID Clase: {classData.id_clase}</CardText>
                        <CardText>Créditos: {classData.creditos}</CardText>
                        <CardText>Hora Inicio: {classData.horaInicio || 'No asignada'}</CardText>
                        <CardText>Catedrático: {classData.catedratico || 'No asignado'}</CardText>
                        <Button onClick={() => handleClassSelect(classData)}>Seleccionar Clase</Button>
                      </CardBody>
                    </Card>
                  </Col>
                ))}
              </Row>
            </div>
          ))}
        </Col>
        
        {/* Modal para editar clase */}
        <Modal isOpen={modalOpen} toggle={() => setModalOpen(false)}>
          <ModalHeader toggle={() => setModalOpen(false)}>Actualizar Clase</ModalHeader>
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
                    {catedraticos.map(c => (
                      <option key={c.idcatedratico} value={c.idcatedratico}>
                        {c.nombrecatedratico}
                      </option>
                    ))}
                  </Input>
                </FormGroup>
                {errorMessage && <div className="alert alert-danger">{errorMessage}</div>} {/* Mostrar mensaje de error */}
                <Button type="submit" color="primary">Actualizar</Button>
              </Form>
            )}
          </ModalBody>
        </Modal>
      </Row>
    </Container>
  );
};

export default ICC;
