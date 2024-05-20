import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

// pages
import TuteeCard from "../components/TuteeCard";

// bootstrap
import { Container, Row, Col } from "react-bootstrap";

export default function MyTutees() {
    // array of tutees taught by the current tutor
    const [tutees, setTutees] = useState([]);

    // get all relevant profile information on component render
    useEffect(() => {
        axios.get("http://localhost:5000/get-tutees", { withCredentials: true }).then((res) => {
            // tutees goes from list of dictionaries -> array of objects
            setTutees(res.data);
        });
    }, []);

    return (
        <Container fluid>
            {/* heading */}
            <h1 className="dashboard-header">My Tutees</h1>

            {/* tutees */}
            <Row>
                {tutees.map((tutee, index) => (
                    <Col key={index} xs={12} md={6}>
                        <TuteeCard firstName={tutee["firstName"]} lastName={tutee["lastName"]} email={tutee["email"]} grade={tutee["grade"]} subject={tutee["subject"]} languages={tutee["languages"]} meetingDays={tutee["meetingDays"]} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
}
