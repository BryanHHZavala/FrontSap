import React from 'react';
import {
  Navbar as RSNavbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import { Link } from 'react-router-dom';
import logo from '../assets/images/unicahlogo.png';
import { carreras, rutasEstáticas } from '../config/routesConfig';

import '../assets/styles/about.css';

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
            {carreras.map((carrera, index) => (
              <DropdownItem key={index} tag={Link} to={carrera.path}>
                {carrera.name}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </UncontrolledDropdown>
        {rutasEstáticas.map((ruta, index) => (
          <NavItem key={index}>
            <NavLink tag={Link} to={ruta.path}>{ruta.name}</NavLink>
          </NavItem>
        ))}
      </Nav>
    </RSNavbar>
  );
};

export default Navbar;
