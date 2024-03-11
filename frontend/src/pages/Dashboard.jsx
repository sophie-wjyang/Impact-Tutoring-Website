import { useState } from "react";
import { useEffect } from "react";

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
import MyTuteesPage from "./MyTuteesPage";

// bootstrap
import { Container, Row, Col, Nav, Navbar } from "react-bootstrap";

export default function DashboardSidebar() {
    const [activeKey, setActiveKey] = useState("/profile");
    const [flexDirection, setFlexDirection] = useState(window.innerWidth >= 1200);

    // change flex direction based on window width
    useEffect(() => {
        const handleResize = () => {
            setFlexDirection(window.innerWidth >= 1200);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <Container fluid>
            <Row>
                {/* sidebar */}
                <Col id="dashboard-sidebar" xl={3}>
                    <Navbar className={`flex-${flexDirection ? "column" : "row"}`} expand="xl" activeKey={activeKey} onSelect={(selectedKey) => setActiveKey(selectedKey)} collapseOnSelect>
                        <Navbar.Brand>
                            <img src={Logo} className="d-inline-block sidebar-logo" alt="Logo" />
                        </Navbar.Brand>

                        <Navbar.Toggle aria-controls="sidebar-nav" />

                        <Navbar.Collapse className="w-100">
                            <Nav className="flex-column sidebar-links w-100" activeKey={activeKey} onSelect={(selectedKey) => setActiveKey(selectedKey)}>
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
                        </Navbar.Collapse>
                    </Navbar>
                </Col>

                {/* main content */}
                <Col id="dashboard-main-content" xl={9}>
                    {activeKey === "/profile" && <ProfilePage />}
                    {activeKey === "/upcoming-sessions" && <UpcomingSessionsPage />}
                    {activeKey === "/my-tutees" && <MyTuteesPage />}

                </Col>
            </Row>
        </Container>
    );
}
