import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, CardBody, Form, FormGroup, Label, Input, Button, InputGroup, InputGroupText } from 'reactstrap';

const Login = ({ setAuth }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Estado para mostrar/ocultar la contraseña
  const [rememberMe, setRememberMe] = useState(false); // Estado para recordar los datos del login
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulación de autenticación
    if (username === 'admin' && password === 'p@ssword') {
      setAuth(true);
      localStorage.setItem('auth', 'true');
      if (rememberMe) {
        localStorage.setItem('username', username); // Guardar nombre de usuario si se selecciona recordar
        localStorage.setItem('password', password); // Guardar contraseña si se selecciona recordar
      } else {
        localStorage.removeItem('username');
        localStorage.removeItem('password');
      }
      navigate('/');
    } else {
      alert('Credenciales incorrectas');
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleRememberMe = () => {
    setRememberMe(!rememberMe);
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Row className="justify-content-center">
        <Col md="12">
          <Card>
            <CardBody>
              <h3 className="text-center">Login</h3>
              <Form onSubmit={handleSubmit}>
                <FormGroup>
                  <Label for="username">Usuario</Label>
                  <Input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="password">Contraseña</Label>
                  <InputGroup>
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <InputGroupText onClick={toggleShowPassword} style={{ cursor: 'pointer' }}>
                      {showPassword ? 'Ocultar' : 'Mostrar'}
                    </InputGroupText>
                  </InputGroup>
                </FormGroup>
                <FormGroup check>
                  <Label check>
                    <Input type="checkbox" onChange={handleRememberMe} /> Recuérdame
                  </Label>
                </FormGroup>
                <Button type="submit" color="primary" block>
                  Iniciar sesión
                </Button>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
