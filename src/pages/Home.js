import React, { useState } from 'react';
import { Container, Row, Col, Form, FormGroup, Label, Input } from 'reactstrap';
import '../assets/styles/Home.css'; // Asegúrate de tener un archivo CSS para los estilos adicionales

const Home = () => {
  const [selectedClass, setSelectedClass] = useState(null); // Estado para mantener la clase seleccionada
  const [horaInicio, setHoraInicio] = useState('');
  const [horaFinal, setHoraFinal] = useState('');
  const [seccion, setSeccion] = useState('');

  // Función para manejar la selección de una clase
  const handleClassSelect = (classId) => {
    setSelectedClass(classId === selectedClass ? null : classId);
  };

  // Función para manejar la asignación de hora y sección
  const handleAssign = () => {
    // Encuentra la clase seleccionada
    const classToUpdate = classes.find(clase => clase.id === selectedClass);
    if (classToUpdate) {
      // Actualiza la hora y la sección de la clase seleccionada
      classToUpdate.horaInicio = horaInicio;
      classToUpdate.horaFinal = horaFinal;
      classToUpdate.seccion = seccion;
    }
  };

  // Mock data de clases
  const classes = [
    { id: 'if00', nombre: 'Introducción a la computación', horaInicio: '', horaFinal: '', seccion: '' },
    { id: 'pm01', nombre: 'Programación avanzada', horaInicio: '10:00', horaFinal: '11:30', seccion: '0901A' },
    // Añade más objetos de clase según sea necesario
  ];

  return (
    <Container className="mt-5 pt-5">
      <Row>
        {classes.map((clase) => (
          <Col md="3" key={clase.id} className="class-container">
            <div
              className={`class-status ${clase.horaInicio && clase.horaFinal && clase.seccion ? 'assigned' : ''} ${selectedClass === clase.id ? 'selected' : ''}`}
              onClick={() => handleClassSelect(clase.id)}
            >
              {/* Franja superior con colores */}
            </div>
            <h4>{clase.nombre}</h4>
            <p>Hora inicio: {clase.horaInicio || 'Sin asignar'}</p>
            <p>Hora final: {clase.horaFinal || 'Sin asignar'}</p>
            <p>Sección: {clase.seccion || 'Sin asignar'}</p>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => handleClassSelect(clase.id)}
            >
              Seleccionar
            </button>
          </Col>
        ))}
        <Col md="3">
          <Form className="class-form">
            <FormGroup>
              <Label for="horaInicio">Hora inicio</Label>
              <Input
                type="text"
                name="horaInicio"
                id="horaInicio"
                value={horaInicio}
                onChange={(e) => setHoraInicio(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="horaFinal">Hora final</Label>
              <Input
                type="text"
                name="horaFinal"
                id="horaFinal"
                value={horaFinal}
                onChange={(e) => setHoraFinal(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="seccion">Sección</Label>
              <Input
                type="text"
                name="seccion"
                id="seccion"
                value={seccion}
                onChange={(e) => setSeccion(e.target.value)}
              />
            </FormGroup>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleAssign}
            >
              Asignar
            </button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
