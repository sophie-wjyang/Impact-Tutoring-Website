import React from "react";
import { useNavigate } from "react-router-dom";

// bootstrap
import { Container, Row, Col, Table, Image, Button } from "react-bootstrap";

export function TuteeCard(props) {
    const { pairingID, subject, meetingDays, firstName, lastName, email, grade, languages } = props;
    const navigate = useNavigate();

    function openTutoringHistory() {
        navigate("tutoring-history", { state: { pairingID } });
    }

    return (
        <Container fluid className="commitment-card">
            <h2 className="commitment-name">{firstName} {lastName}</h2>

            <div className="commitment-information">
                <p>
                    <span>Tutee email:</span> {email}
                </p>
                <p>
                    <span>Tutee grade:</span> {grade}
                </p>
                <p>
                    <span>Subject tutored:</span> {subject}
                </p>
                <p>
                    <span>Tutee languages:</span> {languages.join(", ")}
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

export function SubjectCard(props) {
    const { pairingID, subject, meetingDays, firstName, lastName, email, languages } = props;
    const navigate = useNavigate();

    function openTutoringHistory() {
        navigate("tutoring-history", { state: { pairingID } });
    }

    return (
        <Container fluid className="commitment-card">
            <h2 className="commitment-name">{subject}</h2>

            <div className="commitment-information">
                <p>
                    <span>Tutor:</span> {firstName} {lastName}
                </p>
                <p>
                    <span>Tutor email:</span> {email}
                </p>
                <p>
                    <span>Tutor languages:</span> {languages.join(", ")}
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