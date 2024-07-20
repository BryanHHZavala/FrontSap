import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, CardBody, CardTitle, CardText, Spinner, Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const ICC = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedClass, setSelectedClass] = useState(null);
  const [formData, setFormData] = useState({ horaInicio: '', idcatedratico: '' });
  const [modalOpen, setModalOpen] = useState(false);
  const [catedraticos, setCatedraticos] = useState([]);

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
  }, []);

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
  }, []);

  const handleClassSelect = (classData) => {
    setSelectedClass(classData);
    setFormData({
      horaInicio: classData.horaInicio || '',
      idcatedratico: classData.idcatedratico || ''
    });
    setModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner color="primary" />
        <p>Loading...</p>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <Row>
        <Col sm="8">
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
