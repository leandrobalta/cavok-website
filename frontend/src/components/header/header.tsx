import React from "react";
import "./header.css";
import CavokWorld from "components/icons/cavok-world";
import CavokTextIcon from "components/icons/cavok-text";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { AiOutlineMenu } from "react-icons/ai";

const MenuDropdownTitle = () => (
    <div className="d-flex align-items-center">
        <AiOutlineMenu />
        <span className="ms-2">Menu</span>
    </div>

)

export function Header() {
    return (
        <Navbar expand="lg" id="navbar">
            <Container id="conteiner">
                <Navbar.Brand href="#home">
                    <CavokTextIcon id="cavok-text-icon" />
                </Navbar.Brand>
                <Nav className="justify-content-end">
                    <Nav.Link className="text-colored" href="#home">Quem Somos</Nav.Link>
                    <Nav.Link className="text-colored" href="#about">Fale Conosco</Nav.Link>
                    <NavDropdown title={ <MenuDropdownTitle/> } id="menu-dropdown">
                        <NavDropdown.Item href="#action/3.1">Usuário</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.2">Meus Pedidos</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.3">Cancelamento/Reembolso</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">Termos e Condições</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.1">Central de Ajuda</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.1">Política de Privacidade</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.1">Dúdivas Frequentes</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Container>
        </Navbar>
    );
}
