import React from "react";

// bootstrap
import { Container, Row, Col, Table, Image, Button } from "react-bootstrap";

export default function TuteeCard(props) {
    const { firstName, lastName, email, grade, subject, languages, meetingDays } = props;

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

            <Button size="lg" className="tutoring-history-button">
                See tutoring history
            </Button>
        </Container>
    );
}
