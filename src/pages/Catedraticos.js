import React, { useEffect, useState } from 'react';
import {
  Container,
  Row,
  Col,
  Input,
  ListGroup,
  ListGroupItem,
  Spinner,
  Card,
  CardBody,
  CardTitle,
  CardText
} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Catedraticos = () => {
  const [catedraticos, setCatedraticos] = useState([]);
  const [filteredCatedraticos, setFilteredCatedraticos] = useState([]);
  const [selectedCatedratico, setSelectedCatedratico] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCatedraticos = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/catedraticos/');
        if (!response.ok) throw new Error('Network response was not ok');
        const result = await response.json();
        setCatedraticos(result);
        setFilteredCatedraticos(result); // Inicialmente, mostrar todos los catedráticos
      } catch (error) {
        console.error('Error fetching catedraticos:', error);
      }
    };

    fetchCatedraticos();
  }, []);

  useEffect(() => {
    if (selectedCatedratico && searchQuery.trim() !== '') {
      const fetchClasses = async () => {
        try {
          setLoading(true);
          const response = await fetch(
            `http://localhost:5000/api/catedraticos/clasecatedratico/${selectedCatedratico.idcatedratico}`
          );
          if (!response.ok) throw new Error('Network response was not ok');
          const result = await response.json();
          setClasses(result);
        } catch (error) {
          console.error('Error fetching classes:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchClasses();
    } else {
      setClasses([]); // Clear classes if no catedratico is selected or search query is empty
    }
  }, [selectedCatedratico, searchQuery]);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim() === '') {
      setFilteredCatedraticos([]);
      setSelectedCatedratico(null);
    } else {
      setFilteredCatedraticos(
        catedraticos.filter(c =>
          c.nombrecatedratico.toLowerCase().includes(query.toLowerCase())
        )
      );
      setSelectedCatedratico(null); // Clear selected catedratico when search query changes
    }
  };

  const handleCatedraticoSelect = (catedratico) => {
    setSelectedCatedratico(catedratico);
    setSearchQuery(catedratico.nombrecatedratico);
    setFilteredCatedraticos([]);
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col sm="12">
          <Input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Buscar catedrático"
            style={{ marginTop: '3rem' }}
          />

          {searchQuery.trim() !== '' && filteredCatedraticos.length > 0 && (
            <ListGroup className="mt-2">
              {filteredCatedraticos.map(c => (
                <ListGroupItem
                  key={c.idcatedratico}
                  onClick={() => handleCatedraticoSelect(c)}
                  style={{ cursor: 'pointer' }}
                >
                  {c.nombrecatedratico}
                </ListGroupItem>
              ))}
            </ListGroup>
          )}

          {loading ? (
            <Spinner color="primary" />
          ) : (
            <Row className="mt-4">
              {classes.length > 0 ? (
                classes.map((classData, index) => (
                  <Col sm="4" key={index} className="mb-4">
                    <Card>
                      <CardBody>
                        <CardTitle tag="h5">{classData.nombreclase}</CardTitle>
                        <CardText>ID Clase: {classData.id_clase}</CardText>
                        <CardText>Créditos: {classData.creditos}</CardText>
                        <CardText>Hora Inicio: {classData.horaInicio}</CardText>
                      </CardBody>
                    </Card>
                  </Col>
                ))
              ) : (
                <Col sm="12">
                  <p>No se encontraron clases.</p>
                </Col>
              )}
            </Row>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Catedraticos;
