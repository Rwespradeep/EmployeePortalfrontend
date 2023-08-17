import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";

const HeaderComponent = () => {
  return (
    <div>
      <Navbar className="bg-body-tertiary">
        <Container>
          <Navbar.Brand>Employee Management Portal</Navbar.Brand>
          <Nav className="nav-items gap-2">
            <Nav.Link href="/">Employees</Nav.Link>
            <Nav.Link href="/newEmployee">Add Employee</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
};

export default HeaderComponent;
