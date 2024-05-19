import React from "react";

// bootstrap
import { Container, Row, Col, Table, Image, Button } from "react-bootstrap";

export default function UpcomingSessionCard(props) {
    const { firstName, lastName, subject, lessonPlan, sessionNotes } = props;

    function openLessonPlan() {
        
    }

    return (
        <Container fluid className="upcoming-session-card">
            <Row>
                <Col md={4} className="session-date">
                    <p className="session-month">January</p>
                    <p className="session-day">23</p>
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
                            <Button size="lg" className="session-notes-button">
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
