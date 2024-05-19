// react hooks
import { useState } from "react";
import { useEffect } from "react";

// routing
import { BrowserRouter, Routes, Route, Link, Switch, Redirect, useLocation, useNavigate } from "react-router-dom";

// fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faCalendarDays } from "@fortawesome/free-regular-svg-icons";
import { faChalkboardUser } from "@fortawesome/free-solid-svg-icons";
import { faFileLines } from "@fortawesome/free-regular-svg-icons";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";

// assets
import Logo from "../assets/logos/logo-full.png";

// pages
import ProfilePage from "./ProfilePage";
import UpcomingSessionsPage from "./UpcomingSessionsPage";
import MyTuteesPage from "./MyTuteesPage";
import VolunteerHoursPage from "./VolunteerHoursPage";
import Editor from "../components/Editor";
import LogOutPage from "./LogOutPage";
import Footer from "../components/Footer";

// bootstrap
import { Container, Row, Col, Nav, Navbar } from "react-bootstrap";

export default function DashboardSidebar() {
    const location = useLocation();
    const navigate = useNavigate();
    
    const [flexDirection, setFlexDirection] = useState(window.outerWidth >= 1200);

    // initial value of activeKey is the value saved in local storage, or "/profile" if there is no saved value
    const [activeKey, setActiveKey] = useState(() => {
        const savedActiveKey = localStorage.getItem("activeKey");
        return savedActiveKey ? savedActiveKey : "/profile";
    });

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

    // when we select a page in the sidebar, set the active key, save it to local storage, and add it to the browser history
    // this is so that when we refresh the page, the selected page is still the same
    const handleSelect = (selectedKey) => {
        setActiveKey(selectedKey);
        localStorage.setItem("activeKey", selectedKey);
        navigate(`/dashboard/${selectedKey}`);
    };

    return (
        <Container fluid className="p-0" style={{ height: "100vh" }}>
            <Row>
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
                                <Nav.Link eventKey="volunteer-hours" className="sidebar-link">
                                    <FontAwesomeIcon icon={faClock} className="sidebar-icon" />
                                    Volunteer hours
                                </Nav.Link>
                                <Nav.Link eventKey="log-out" className="sidebar-link">
                                    <FontAwesomeIcon icon={faArrowRightFromBracket} className="sidebar-icon" />
                                    Log out
                                </Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                </Col>

                {/* main content */}
                <Col id="dashboard-main-content" xl={9}>
                    {/* {activeKey === "/profile" && <ProfilePage />}
                    {activeKey === "/upcoming-sessions" && <UpcomingSessionsPage />}
                    {activeKey === "/my-tutees" && <MyTuteesPage />}
                    {activeKey === "/resources" && <Editor />}
                    {activeKey === "/volunteer-hours" && <VolunteerHoursPage />}
                    {activeKey === "/log-out" && (
                        <LogOutPage
                            resetActiveKey={() => {
                                handleSelect("profile");
                            }}
                        />
                    )} */}
                    <Routes>
                        <Route path="/profile" element={<ProfilePage />} />
                        <Route path="/upcoming-sessions" element={<UpcomingSessionsPage />} />
                        <Route path="/my-tutees" element={<MyTuteesPage />} />
                        <Route path="/resources" element={<Editor />} />
                        <Route path="/volunteer-hours" element={<VolunteerHoursPage />} />
                        <Route path="/log-out" element={<LogOutPage resetActiveKey={() => setActiveKey("/profile")} />} />
                        {/* <Route path="/" element={<Navigate to="/dashboard/profile" />} /> */}
                    </Routes>
                </Col>
            </Row>

            {/* footer */}
            <Row>
                <Footer />
            </Row>
        </Container>
    );
}
