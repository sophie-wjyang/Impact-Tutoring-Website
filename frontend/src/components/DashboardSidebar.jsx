import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faCalendarDays } from "@fortawesome/free-regular-svg-icons";
import { faFileLines } from "@fortawesome/free-regular-svg-icons";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { faChalkboardUser } from "@fortawesome/free-solid-svg-icons";

import Logo from "../assets/logos/logo-full.png";

// bootstrap
import { Container, Row, Col, Nav, Navbar } from "react-bootstrap";

export default function DashboardSidebar() {
    return (
        <Nav className="flex-column sidebar-links">
            <img src={Logo} width="300" className="d-inline-block sidebar-logo" />
            <Nav.Link href="" className="sidebar-link active">
                <FontAwesomeIcon icon={faUser} className="sidebar-icon" />
                Profile
            </Nav.Link>
            <Nav.Link href="" className="sidebar-link">
                <FontAwesomeIcon icon={faCalendarDays} className="sidebar-icon" />
                Upcoming sessions
            </Nav.Link>
            <Nav.Link href="" className="sidebar-link">
                <FontAwesomeIcon icon={faChalkboardUser} className="sidebar-icon" />
                My tutees
            </Nav.Link>
            <Nav.Link href="" className="sidebar-link">
                <FontAwesomeIcon icon={faFileLines} className="sidebar-icon" />
                Resources
            </Nav.Link>
            <Nav.Link href="" className="sidebar-link">
                <FontAwesomeIcon icon={faClock} className="sidebar-icon" />
                Volunteer hours
            </Nav.Link>
            <Nav.Link href="" className="sidebar-link">
                <FontAwesomeIcon icon={faArrowRightFromBracket} className="sidebar-icon" />
                Log out
            </Nav.Link>
        </Nav>
    );
}
