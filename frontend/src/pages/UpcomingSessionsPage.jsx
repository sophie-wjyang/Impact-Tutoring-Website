import React from "react";
import { useState, useEffect } from "react";

// pages
import { UpcomingSessionCardTutor, UpcomingSessionCardTutee } from "../components/UpcomingSessionCard";

// bootstrap
import { Container, Row, Col } from "react-bootstrap";
import client from "../axios";

export function UpcomingSessionsPageTutor() {
    const [upcomingSessions, setUpcomingSessions] = useState([]);

    // get all relevant profile information on component render
    useEffect(() => {
        client.get("get-upcoming-sessions").then((res) => {
            // upcoming sessions goes from list of dictionaries -> array of objects
            console.log("data", res.data);
            setUpcomingSessions(res.data);
        });
    }, []);

    return (
        <Container fluid>
            {/* heading */}
            <h1 className="dashboard-header">Upcoming Sessions</h1>

            {/* upcoming sessions */}
            <Row>
                {upcomingSessions.map((upcomingSession, index) => (
                    <Col xs={12} md={12}>
                        <UpcomingSessionCardTutor
                            sessionID={upcomingSession["sessionID"]}
                            firstName={upcomingSession["tuteeFirstName"]}
                            lastName={upcomingSession["tuteeLastName"]}
                            subject={upcomingSession["subject"]}
                            month={upcomingSession["month"]}
                            day={upcomingSession["day"]}
                            year={upcomingSession["year"]}
                            startTime={upcomingSession["startTime"]}
                            endTime={upcomingSession["endTime"]}
                            meetingLink={upcomingSession["meetingLink"]}
                        />
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export function UpcomingSessionsPageTutee() {
    const [upcomingSessions, setUpcomingSessions] = useState([]);

    // get all relevant profile information on component render
    useEffect(() => {
        client.get("get-upcoming-sessions").then((res) => {
            // upcoming sessions goes from list of dictionaries -> array of objects
            setUpcomingSessions(res.data);
        });
    }, []);

    return (
        <Container fluid>
            {/* heading */}
            <h1 className="dashboard-header">Upcoming Sessions</h1>

            {/* upcoming sessions */}
            <Row>
                {upcomingSessions.map((upcomingSession, index) => (
                    <Col xs={12} md={12}>
                        <UpcomingSessionCardTutee
                            sessionID={upcomingSession["sessionID"]}
                            firstName={upcomingSession["tutorFirstName"]}
                            lastName={upcomingSession["tutorLastName"]}
                            subject={upcomingSession["subject"]}
                            month={upcomingSession["month"]}
                            day={upcomingSession["day"]}
                            year={upcomingSession["year"]}
                            startTime={upcomingSession["startTime"]}
                            endTime={upcomingSession["endTime"]}
                            meetingLink={upcomingSession["meetingLink"]}
                        />
                    </Col>
                ))}
            </Row>
        </Container>
    );
}
