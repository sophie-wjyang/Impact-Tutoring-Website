import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import DashboardSidebar from "../components/DashboardSidebar";

// bootstrap
import { Container, Row, Col, Nav, Navbar } from "react-bootstrap";

export default function ProfilePage() {
    return (
        <Container fluid>
            <Row>
                <Col id="dashboard-sidebar" xs={3}>
                    <DashboardSidebar />
                </Col>
                <Col id="dashboard-main-content" xs={9}>
                    <h1>Welcome, {}</h1>
                </Col>
            </Row>
        </Container>
    );
}
