import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

// pages
import TuteeCard from "../components/TuteeCard";

// bootstrap
import { Container, Row, Col, Table, Image } from "react-bootstrap";

export default function MyTutees() {
    // get all relevant profile information on component render
    useEffect(() => {
        axios.get("http://localhost:5000/get-profile-info", { withCredentials: true }).then((res) => {
            // return the first profile in the list of tuples
            const profileInfo = res.data[0];

        });
    }, []);

    return (
        <Container fluid>
            {/* heading */}
            <h1 className="profile-welcome">My Tutees</h1>

            {/* tutees */}
            <Row>
                <Col xs={12} md={6}>
                    <TuteeCard />
                </Col>
                <Col xs={12} md={6}>
                    <TuteeCard />
                </Col>
                <Col xs={12} md={6}>
                    <TuteeCard />
                </Col>
            </Row>

            
            
        </Container>
    );
}
