import React from "react";

// bootstrap
import { Container, Row, Col, Table, Image, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function UpcomingSessionCard(props) {
    const { sessionID, firstName, lastName, subject, month, day, year, startTime, endTime, lessonPlan, sessionNotes, meetingLink } = props;
    const navigate = useNavigate();

    function openLessonPlan() {
        navigate("lesson-plan", { state: { sessionID, month, day, year, firstName, lastName } });
    }

    function openSessionNotes() {
        navigate("session-notes", { state: { sessionID, month, day, year, firstName, lastName } });
    }

    return (
        <Container fluid className="upcoming-session-card">
            <Row>
                <Col md={4} className="session-date">
                    <p className="session-month">{month}</p>
                    <p className="session-day">{day}</p>
                    <p className="session-time">8:00-9:00PM</p>
                </Col>
                <Col md={8} className="session-information">
                    <h2 className="tutee-name">{firstName} {lastName}</h2>

                    <div className="tutee-information">
                        <div>
                            <span>Subject:</span> {subject}
                        </div>
                        <div>
                            <div>Lesson plan:</div> {}
                            <Button size="lg" className="lesson-plan-button" onClick={openLessonPlan}>
                                View/edit lesson plan
                            </Button>
                        </div>
                        <div>
                            <div>Session notes:</div> {}
                            <Button size="lg" className="session-notes-button" onClick={openSessionNotes}>
                                View/edit session notes
                            </Button>
                        </div>
                    </div>
                </Col>
            </Row>
            <Row>
                <Button size="lg" className="join-meeting-button">
                    Join meeting
                </Button>
            </Row>

        </Container>
    );
}
