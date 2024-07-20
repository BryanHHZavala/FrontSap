import React,{ useState } from "react";
import { Form, FormGroup, Label, Input, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Button } from "reactstrap";
import '../assets/styles/about.css'

const About = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Seleccione un periodo');
  const [textField1, settextField1] = useState('');
  const [textField2, settextField2] = useState('');
  const [textField3, settextField3] = useState('');

  const toggleDropdown = () => setDropdownOpen((prevState) => !prevState);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Datos a Ingresar');
    console.log('dato 1:', textField1);
    console.log('dato 2:', textField2);
    console.log('dato 3:', textField3);
    console.log('Periodo', selectedOption);
    
  };

  const handleSelect = (event) => {
    setSelectedOption(event.target.innerText);
  }

  return (
    <div className="form-container">
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="textfield1"> Ingrese el Año del periodo (solo el año): </Label>
          <Input
            type="number"
            name="textField1"
            placeholder="Año del periodo en números"
            value={textField1}
            onChange={(e) => settextField1(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="textField2"> Ingrese fecha de inicio del periodo: </Label>
          <Input
            type="text"
            name="textField2"
            placeholder="año/mes/dia"
            value={textField2}
            onChange={(e) => settextField2(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="textField3"> Ingrese fecha final del periodo: </Label>
          <Input
            type="text"
            name="textField3"
            placeholder="año/mes/dia"
            value={textField3}
            onChange={(e) => settextField3(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="combobox">Seleccione un periodo</Label>
          <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
            <DropdownToggle caret>{selectedOption}</DropdownToggle>
            <DropdownMenu>
              <DropdownItem onClick={handleSelect}> Periodo I</DropdownItem>
              <DropdownItem onClick={handleSelect}> Periodo II</DropdownItem>
              <DropdownItem onClick={handleSelect}> Periodo III</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </FormGroup>
        <Button type="submit"> Registrar Periodo </Button>
      </Form>
    </div>
  );
};

export default About;
