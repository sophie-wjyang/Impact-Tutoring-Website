import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

// pages
import UpcomingSessionCard from "../components/UpcomingSessionCard";

// bootstrap
import { Container, Row, Col } from "react-bootstrap";

export default function UpcomingSessions() {
    const [upcomingSessions, setUpcomingSessions] = useState([]);

    // get all relevant profile information on component render
    useEffect(() => {
        axios.get("http://localhost:5000/get-upcoming-sessions", { withCredentials: true })
            .then((res) => {
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
                        <UpcomingSessionCard
                            sessionKey={upcomingSession["sessionID"]}
                            firstName={upcomingSession["tuteeFirstName"]}
                            lastName={upcomingSession["tuteeLastName"]}
                            subject={upcomingSession["subject"]}
                            month={upcomingSession["month"]}
                            day={upcomingSession["day"]}
                            year={upcomingSession["year"]}
                            startTime={upcomingSession["startTime"]}
                            endTime={upcomingSession["endTime"]}
                            lessonPlan={upcomingSession["lessonPlan"]}
                            sessionNotes={upcomingSession["sessionNotes"]}
                            meetingLink={upcomingSession["meetingLink"]}
                        />
                    </Col>
                ))}
            </Row>
        </Container>
    );
}
