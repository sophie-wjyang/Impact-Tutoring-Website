import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

// pages
import UpcomingSessionCard from "../components/UpcomingSessionCard";

// bootstrap
import { Container, Row, Col, Table, Image } from "react-bootstrap";

export default function UpcomingSessions() {
    const [upcomingSessions, setUpcomingSessions] = useState([]);

    // get all relevant profile information on component render
    // useEffect(() => {
    //     axios.get("http://localhost:5000/get-tutees", { withCredentials: true })
    //         .then((res) => {
    //             console.log(res.data);
    //             setTutees(res.data);
    //         });
    // }, []);

    return (
        <Container fluid>
            {/* heading */}
            <h1 className="profile-welcome">Upcoming Sessions</h1>

            {/* upcoming sessions */}
            <Row>
                {/* {upcomingSessions.map((upcomingSession, index) => (
                    <Col xs={12} md={6}>
                        <UpcomingSessionCard
                            firstName={upcomingSession[0]}
                            lastName={upcomingSession[1]}
                            email={upcomingSession[2]}
                            grade={upcomingSession[3]}
                            languages={upcomingSession[4]}
                            availability={upcomingSession[5]}
                            subjects={upcomingSession[6]}
                        />
                    </Col>
                ))} */}

                <Col xs={12} md={12}>
                    <UpcomingSessionCard
                        firstName="Gloria"
                        lastName="Li"
                        subject="Grade 10 math"
                        lessonPlan="lesson plan"
                        sessionNotes="session notes"
                    />
                </Col>
                
            </Row>
        </Container>
    );
}
