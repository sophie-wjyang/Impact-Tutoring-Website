import React from "react";
import { useNavigate } from "react-router-dom";

// bootstrap
import { Container, Row, Col, Table, Image, Button } from "react-bootstrap";

export default function TuteeCard(props) {
    const { pairingID, firstName, lastName, email, grade, subject, languages, meetingDays } = props;
    const navigate = useNavigate();

    function openTutoringHistory() {
        navigate("tutoring-history", { state: { pairingID } });
    }

    return (
        <Container fluid className="tutee-card">
            <h2 className="tutee-name">{firstName} {lastName}</h2>

            <div className="tutee-information">
                <p>
                    <span>Email:</span> {email}
                </p>
                <p>
                    <span>Grade:</span> {grade}
                </p>
                <p>
                    <span>Subject tutored:</span> {subject}
                </p>
                <p>
                    <span>Languages:</span> {languages.join(", ")}
                </p>
                <p>
                    <span>Meeting days:</span> {meetingDays.join(", ")}
                </p>
            </div>

            <Button size="lg" className="tutoring-history-button" onClick={openTutoringHistory}>
                See tutoring history
            </Button>
        </Container>
    );
}
