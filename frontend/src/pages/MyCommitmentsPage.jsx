import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

// pages
import { TuteeCard, SubjectCard } from "../components/CommitmentCard";

// bootstrap
import { Container, Row, Col } from "react-bootstrap";

export function MyTuteesPage() {
    // array of tutees taught by the current tutor
    const [tutees, setTutees] = useState([]);

    // get all relevant profile information on component render
    useEffect(() => {
        axios.get("http://localhost:5000/get-commitments", { withCredentials: true }).then((res) => {
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
                        <TuteeCard pairingID={tutee["pairingID"]} subject={tutee["subject"]} meetingDays={tutee["meetingDays"]} firstName={tutee["tuteeFirstName"]} lastName={tutee["tuteeLastName"]} email={tutee["tuteeEmail"]} grade={tutee["tuteeGrade"]} languages={tutee["tuteeLanguages"]} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export function MySubjectsPage() {
    // array of tutees taught by the current tutor
    const [subjects, setSubjects] = useState([]);

    // get all relevant profile information on component render
    useEffect(() => {
        axios.get("http://localhost:5000/get-commitments", { withCredentials: true }).then((res) => {
            // subjects goes from list of dictionaries -> array of objects
            setSubjects(res.data);
        });
    }, []);

    return (
        <Container fluid>
            {/* heading */}
            <h1 className="dashboard-header">My Subjects</h1>

            {/* tutees */}
            <Row>
                {subjects.map((subject, index) => (
                    <Col key={index} xs={12} md={6}>
                        <SubjectCard pairingID={subject["pairingID"]} subject={subject["subject"]} meetingDays={subject["meetingDays"]} firstName={subject["tutorFirstName"]} lastName={subject["tutorLastName"]} email={subject["tutorEmail"]} languages={subject["tutorLanguages"]}  />
                    </Col>
                ))}
            </Row>
        </Container>
    );
}
