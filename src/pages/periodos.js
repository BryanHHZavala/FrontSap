import React, { useState } from "react";
import { Form, FormGroup, Label, Input, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Button } from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import '../assets/styles/about.css';

const PERIODO = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Seleccione un periodo');
  const [textField1, setTextField1] = useState('');
  const [textField2, setTextField2] = useState('');
  const [textField3, setTextField3] = useState('');

  const toggleDropdown = () => setDropdownOpen(prevState => !prevState);

  const handleSelect = (event) => {
    const selectedText = event.target.innerText.trim();
    setSelectedOption(selectedText);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!textField1 || !textField2 || !textField3 || selectedOption === 'Seleccione un periodo') {
      toast.error('Por favor, complete todos los campos');
      return;
    }

    const datos = {
      periodo: selectedOption,
      fecha_inicio: textField2,
      fecha_final: textField3,
      anio: textField1
    };

    try {
      const response = await fetch('http://localhost:3300/api/periodos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(datos),
      });

      if (!response.ok) {
        throw new Error('Error en la solicitud');
      }

      const result = await response.json();
      console.log('Success:', result);
      toast.success('Periodo registrado con éxito');

      setTextField1('');
      setTextField2('');
      setTextField3('');
      setSelectedOption('Seleccione un periodo');
    } catch (error) {
      console.error('Error:', error);
      toast.error('Hubo un error al registrar el periodo');
    }
  };

  return (
    <div className="form-container">
      <Form onSubmit={handleSubmit}>
      <div className="warning-container">
          <Label className="warning-label">ADVERTENCIA</Label>
          <div className="warning-message">
            <p>Al momento de ingresar un nuevo periodo, el perido actual pasa a ser historico(es decir que ya no se puede modificar)
              por ende se reinicia el sistema de registro de secciones.
            </p>
          </div>
        </div>
        <FormGroup className="form-group">
          <Label for="textfield1">Ingrese el Año del periodo (solo el año):</Label>
          <div className="input-container">
            <Input
              type="number"
              name="textField1"
              placeholder="Año del periodo en números"
              value={textField1}
              onChange={(e) => setTextField1(e.target.value)}
            />
          </div>
        </FormGroup>

        <FormGroup className="form-group">
          <Label for="textField2">Ingrese fecha de inicio del periodo:</Label>
          <div className="input-container">
            <Input
              type="date"
              name="textField2"
              value={textField2}
              onChange={(e) => setTextField2(e.target.value)}
            />
          </div>
        </FormGroup>

        <FormGroup className="form-group">
          <Label for="textField3">Ingrese fecha final del periodo:</Label>
          <div className="input-container">
            <Input
              type="date"
              name="textField3"
              value={textField3}
              onChange={(e) => setTextField3(e.target.value)}
            />
          </div>
        </FormGroup>

        <FormGroup className="form-group">
          <Label for="combobox">Seleccione un periodo</Label>
          <div className="input-container">
            <div className="dropdown-container">
              <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
                <DropdownToggle caret>{selectedOption}</DropdownToggle>
                <DropdownMenu>
                  <DropdownItem onClick={handleSelect}>Periodo I</DropdownItem>
                  <DropdownItem onClick={handleSelect}>Periodo II</DropdownItem>
                  <DropdownItem onClick={handleSelect}>Periodo III</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
        </FormGroup>

        <div className="button-container">
          <Button type="submit">Registrar Periodo</Button>
        </div>
      </Form>
      <ToastContainer />
    </div>
  );
};

export default PERIODO;
