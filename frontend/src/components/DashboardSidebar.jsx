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
import { Container, Row, Col, Nav } from "react-bootstrap";

export default function DashboardSidebar() {
    const [activeKey, setActiveKey] = useState('/profile');

    return (
        <Nav className="flex-column sidebar-links" activeKey={activeKey} onSelect={(selectedKey) => setActiveKey(selectedKey)}>
            <img src={Logo} width="300" className="d-inline-block sidebar-logo" />
            <Nav.Link href="/profile" eventKey="/profile" className="sidebar-link">
                <FontAwesomeIcon icon={faUser} className="sidebar-icon" />
                Profile
            </Nav.Link>
            <Nav.Link href="" eventKey="/upcoming-sessions" className="sidebar-link">
                <FontAwesomeIcon icon={faCalendarDays} className="sidebar-icon" />
                Upcoming sessions
            </Nav.Link>
            <Nav.Link href="" eventKey="/my-tutees" className="sidebar-link">
                <FontAwesomeIcon icon={faChalkboardUser} className="sidebar-icon" />
                My tutees
            </Nav.Link>
            <Nav.Link href="" eventKey="/resources" className="sidebar-link">
                <FontAwesomeIcon icon={faFileLines} className="sidebar-icon" />
                Resources
            </Nav.Link>
            <Nav.Link href="" eventKey="/volunteer-hours" className="sidebar-link">
                <FontAwesomeIcon icon={faClock} className="sidebar-icon" />
                Volunteer hours
            </Nav.Link>
            <Nav.Link href="" eventKey="/log-out" className="sidebar-link">
                <FontAwesomeIcon icon={faArrowRightFromBracket} className="sidebar-icon" />
                Log out
            </Nav.Link>
        </Nav>
    );
}
