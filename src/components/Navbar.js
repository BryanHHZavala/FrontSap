import React from 'react';
import { Navbar as RSNavbar, NavbarBrand, Nav, NavItem, NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import logo from '../assets/images/unicahlogo.png'; // Ruta de la imagen ajustada

import '../assets/styles/about.css'; // Ruta del archivo CSS de estilos

const Navbar = () => {
  return (
    <RSNavbar color="light" light expand="md" className="navbar navbar-expand-md navbar-light bg-light sticky-top">
      <NavbarBrand tag={Link} to="/">
        <img src={logo} alt="Logo" className="navbar-brand-img" />
      </NavbarBrand>
      <Nav className="mt-0" navbar>
        <NavItem>
          <NavLink tag={Link} to="/">Inicio</NavLink>
        </NavItem>
        <UncontrolledDropdown nav inNavbar>
          <DropdownToggle nav caret>
            Carreras
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem tag={Link} to="/universidad/carrera1">Carrera 1</DropdownItem>
            <DropdownItem tag={Link} to="/universidad/carrera2">Carrera 2</DropdownItem>
            <DropdownItem tag={Link} to="/universidad/carrera3">Carrera 3</DropdownItem>
            <DropdownItem tag={Link} to="/universidad/carrera3">Carrera 4</DropdownItem>
            <DropdownItem tag={Link} to="/universidad/carrera3">Carrera 5</DropdownItem>
            <DropdownItem tag={Link} to="/universidad/carrera3">Carrera 6</DropdownItem>
            <DropdownItem tag={Link} to="/universidad/carrera3">Carrera 7</DropdownItem>
            {/* Agrega más DropdownItem según sea necesario */}
          </DropdownMenu>
        </UncontrolledDropdown>
        <NavItem>
          <NavLink tag={Link} to="/about">Acerca de</NavLink>
        </NavItem>
      </Nav>
    </RSNavbar>
  );
};

export default Navbar;

