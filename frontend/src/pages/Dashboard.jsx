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

// assets
import Logo from "../assets/logos/logo-full.png";

// pages
import ProfilePage from "./ProfilePage";
import UpcomingSessionsPage from "./UpcomingSessionsPage";

// bootstrap
import { Container, Row, Col, Nav } from "react-bootstrap";

export default function DashboardSidebar() {
    const [activeKey, setActiveKey] = useState("/profile");

    return (
        <Container fluid>
            <Row>
                {/* sidebar */}
                <Col id="dashboard-sidebar" xs={3}>
                    <Nav className="flex-column sidebar-links" activeKey={activeKey} onSelect={(selectedKey) => setActiveKey(selectedKey)}>
                        <img src={Logo} width="300" className="d-inline-block sidebar-logo" />
                        <Nav.Link eventKey="/profile" className="sidebar-link">
                            <FontAwesomeIcon icon={faUser} className="sidebar-icon" />
                            Profile
                        </Nav.Link>
                        <Nav.Link eventKey="/upcoming-sessions" className="sidebar-link">
                            <FontAwesomeIcon icon={faCalendarDays} className="sidebar-icon" />
                            Upcoming sessions
                        </Nav.Link>
                        <Nav.Link eventKey="/my-tutees" className="sidebar-link">
                            <FontAwesomeIcon icon={faChalkboardUser} className="sidebar-icon" />
                            My tutees
                        </Nav.Link>
                        <Nav.Link eventKey="/resources" className="sidebar-link">
                            <FontAwesomeIcon icon={faFileLines} className="sidebar-icon" />
                            Resources
                        </Nav.Link>
                        <Nav.Link eventKey="/volunteer-hours" className="sidebar-link">
                            <FontAwesomeIcon icon={faClock} className="sidebar-icon" />
                            Volunteer hours
                        </Nav.Link>
                        <Nav.Link eventKey="/log-out" className="sidebar-link">
                            <FontAwesomeIcon icon={faArrowRightFromBracket} className="sidebar-icon" />
                            Log out
                        </Nav.Link>
                    </Nav>
                </Col>

                {/* main content */}
                <Col id="dashboard-main-content" xs={9}>
                    {activeKey === "/profile" && <ProfilePage /> }
                    {activeKey === "/upcoming-sessions" && <UpcomingSessionsPage /> }
                </Col>
            </Row>
        </Container>
    );
}
