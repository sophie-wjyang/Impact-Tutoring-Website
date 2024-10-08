import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

// pages
import Footer from "../components/Footer";

// assets
import Logo from "../assets/logos/logo-full.png";

// bootstrap
import { Container, Row, Col, Nav, Navbar } from "react-bootstrap";

// fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faCalendarDays } from "@fortawesome/free-regular-svg-icons";
import { faChalkboardUser, faUsers } from "@fortawesome/free-solid-svg-icons";
import { faFileLines } from "@fortawesome/free-regular-svg-icons";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";

export function DashboardTutor() {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    // sets the active key to the first item in the array that is found in the path name
    const activeKey = ["profile", "upcoming-sessions", "my-tutees", "resources", "volunteer-hours-request"].find((key) => pathname.includes(key)) || "profile";

    const [flexDirection, setFlexDirection] = useState(window.outerWidth >= 1200);

    // change flex direction based on window width
    useEffect(() => {
        const handleResize = () => {
            setFlexDirection(window.outerWidth >= 1200);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const handleSelect = (selectedKey) => {
        navigate(selectedKey);
    };

    return (
        <Container fluid className="p-0 dashboard-container">
            <Row className="dashboard-content">
                {/* sidebar */}
                <Col id="dashboard-sidebar" xl={3}>
                    <Navbar className={`flex-${flexDirection ? "column" : "row"}`} expand="xl" collapseOnSelect>
                        <Navbar.Brand>
                            <img src={Logo} className="d-inline-block sidebar-logo" alt="Logo" />
                        </Navbar.Brand>

                        <Navbar.Toggle aria-controls="sidebar-nav" />

                        <Navbar.Collapse className="w-100">
                            <Nav className="flex-column sidebar-links w-100" activeKey={activeKey} onSelect={(selectedKey) => handleSelect(selectedKey)}>
                                <Nav.Link eventKey="profile" className="sidebar-link">
                                    <FontAwesomeIcon icon={faUser} className="sidebar-icon" />
                                    Profile
                                </Nav.Link>
                                <Nav.Link eventKey="upcoming-sessions" className="sidebar-link">
                                    <FontAwesomeIcon icon={faCalendarDays} className="sidebar-icon" />
                                    Upcoming sessions
                                </Nav.Link>
                                <Nav.Link eventKey="my-tutees" className="sidebar-link">
                                    <FontAwesomeIcon icon={faChalkboardUser} className="sidebar-icon" />
                                    My tutees
                                </Nav.Link>
                                <Nav.Link eventKey="resources" className="sidebar-link">
                                    <FontAwesomeIcon icon={faFileLines} className="sidebar-icon" />
                                    Resources
                                </Nav.Link>
                                <Nav.Link eventKey="volunteer-hours-request" className="sidebar-link">
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
                    <Outlet />
                </Col>
            </Row>

            {/* footer */}
            <Row>
                <Footer />
            </Row>
        </Container>
    );
}

export function DashboardTutee() {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    // sets the active key to the first item in the array that is found in the path name
    const activeKey = ["profile", "upcoming-sessions", "my-subjects", "resources", "volunteer-hours-request"].find((key) => pathname.includes(key)) || "profile";

    const [flexDirection, setFlexDirection] = useState(window.outerWidth >= 1200);

    // change flex direction based on window width
    useEffect(() => {
        const handleResize = () => {
            setFlexDirection(window.outerWidth >= 1200);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const handleSelect = (selectedKey) => {
        navigate(selectedKey);
    };

    return (
        <Container fluid className="p-0 dashboard-container">
            <Row className="dashboard-content">
                {/* sidebar */}
                <Col id="dashboard-sidebar" xl={3}>
                    <Navbar className={`flex-${flexDirection ? "column" : "row"}`} expand="xl" collapseOnSelect>
                        <Navbar.Brand>
                            <img src={Logo} className="d-inline-block sidebar-logo" alt="Logo" />
                        </Navbar.Brand>

                        <Navbar.Toggle aria-controls="sidebar-nav" />

                        <Navbar.Collapse className="w-100">
                            <Nav className="flex-column sidebar-links w-100" activeKey={activeKey} onSelect={(selectedKey) => handleSelect(selectedKey)}>
                                <Nav.Link eventKey="profile" className="sidebar-link">
                                    <FontAwesomeIcon icon={faUsers} className="sidebar-icon" />
                                    Profile
                                </Nav.Link>
                                <Nav.Link eventKey="upcoming-sessions" className="sidebar-link">
                                    <FontAwesomeIcon icon={faCalendarDays} className="sidebar-icon" />
                                    Upcoming sessions
                                </Nav.Link>
                                <Nav.Link eventKey="my-subjects" className="sidebar-link">
                                    <FontAwesomeIcon icon={faChalkboardUser} className="sidebar-icon" />
                                    My subjects
                                </Nav.Link>
                                <Nav.Link eventKey="resources" className="sidebar-link">
                                    <FontAwesomeIcon icon={faFileLines} className="sidebar-icon" />
                                    Resources
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
                    <Outlet />
                </Col>
            </Row>

            {/* footer */}
            <Row>
                <Footer />
            </Row>
        </Container>
    );
}

export function DashboardAdmin() {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    // sets the active key to the first item in the array that is found in the path name
    const activeKey = ["tutors", "tutees", "pairings", "pending-volunteer-hours-approvals"].find((key) => pathname.includes(key)) || "tutors";

    const [flexDirection, setFlexDirection] = useState(window.outerWidth >= 1200);

    // change flex direction based on window width
    useEffect(() => {
        const handleResize = () => {
            setFlexDirection(window.outerWidth >= 1200);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const handleSelect = (selectedKey) => {
        navigate(selectedKey);
    };

    return (
        <Container fluid className="p-0 dashboard-container">
            <Row className="dashboard-content">
                {/* sidebar */}
                <Col id="dashboard-sidebar" xl={3}>
                    <Navbar className={`flex-${flexDirection ? "column" : "row"}`} expand="xl" collapseOnSelect>
                        <Navbar.Brand>
                            <img src={Logo} className="d-inline-block sidebar-logo" alt="Logo" />
                        </Navbar.Brand>

                        <Navbar.Toggle aria-controls="sidebar-nav" />

                        <Navbar.Collapse className="w-100">
                            <Nav className="flex-column sidebar-links w-100" activeKey={activeKey} onSelect={(selectedKey) => handleSelect(selectedKey)}>
                                <Nav.Link eventKey="tutors" className="sidebar-link">
                                    <FontAwesomeIcon icon={faUser} className="sidebar-icon" />
                                    Tutors
                                </Nav.Link>
                                <Nav.Link eventKey="tutees" className="sidebar-link">
                                    <FontAwesomeIcon icon={faUser} className="sidebar-icon" />
                                    Tutees
                                </Nav.Link>
                                <Nav.Link eventKey="pairings" className="sidebar-link">
                                    <FontAwesomeIcon icon={faUsers} className="sidebar-icon" />
                                    Pairings
                                </Nav.Link>
                                <Nav.Link eventKey="pending-volunteer-hours-approvals" className="sidebar-link">
                                    <FontAwesomeIcon icon={faFileLines} className="sidebar-icon" />
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
                    <Outlet />
                </Col>
            </Row>

            {/* footer */}
            <Row>
                <Footer />
            </Row>
        </Container>
    );
}
