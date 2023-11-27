import React from 'react'
import Logo from '../assets/logos/logo-full.png';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export default function NavBar() {
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                {/* logo */}
                <Navbar.Brand href="#home">
                    <img
                        src={Logo}
                        width="200"
                        className="d-inline-block align-top"
                        alt="React Bootstrap logo"
                    />
                </Navbar.Brand>

                {/* hamburger menu for smaller screen sizes */}
                <Navbar.Toggle aria-controls="basic-navbar-nav" />

                {/* nav links */}
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                    <Nav>
                        <Nav.Link href="#home">Who We Are</Nav.Link>
                        <Nav.Link href="#link">What We Do</Nav.Link>
                        <Nav.Link href="#link">How It Works</Nav.Link>
                        <Nav.Link href="#link">Get Involved</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
