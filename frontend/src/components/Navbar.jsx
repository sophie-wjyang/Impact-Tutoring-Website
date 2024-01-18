import React from 'react'
import Logo from '../assets/logos/logo-full.png';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export default function NavBar() {
    return (
        <Navbar expand="md" className="bg-body-tertiary" id="navbar-section" sticky="top">
            <Container>
                {/* logo */}
                <Navbar.Brand href="#banner-section">
                    <img
                        src={Logo}
                        width="200"
                        className="d-inline-block align-top navbar-logo py-2"
                        alt="React Bootstrap logo"
                    />
                </Navbar.Brand>
            </Container>
        </Navbar>
    )
}
