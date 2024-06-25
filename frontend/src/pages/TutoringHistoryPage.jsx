import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../UserContext";

// bootstrap
import { Container, Row, Col, Table } from "react-bootstrap";

export default function TutoringHistory() {
    const navigate = useNavigate();
    const location = useLocation();
    const { userType } = useUser();
    const { pairingID } = location.state || {};
    const [pastSessions, setPastSessions] = useState([]);

    // get tutoring history
    useEffect(() => {
        const data = {
            pairingID: pairingID
        }

        axios.get("http://localhost:5000/get-tutoring-history", { 
            params: data,
            withCredentials: true 
        })
        .then((res) => {
            // past sessions goes from list of dictionaries -> array of objects
            setPastSessions(res.data);
        });
    }, []);

    return (
        <Container fluid>
            {/* heading */}
            <h1 className="dashboard-header">Tutoring History</h1>

            <Container className="table-container">
                <Table className="tutoring-history-table">
                    <thead>
                        <tr>
                            <th className="tutoring-history-header">
                                <b>Session date</b>
                            </th>
                            <th className="tutoring-history-header">
                                <b>Lesson plan</b>
                            </th>
                            <th className="tutoring-history-header">
                                <b>Session notes</b>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                            {pastSessions.map((request, index) => (
                            <tr key={index}>
                                <td className="tutoring-history-text">{request["date"]}</td>
                                <td className="tutoring-history-text">
                                    {userType === "tutor" && (<Link className="tutoring-history-link" to="lesson-plan" state={{ sessionID: request["sessionID"], month: request["month"], day: request["day"], year: request["year"], tuteeFirstName: request["tuteeFirstName"], tuteeLastName: request["tuteeLastName"]}}>
                                        Lesson plan
                                    </Link>)}
                                    {userType === "tutee" && (<Link className="tutoring-history-link" to="lesson-plan" state={{ sessionID: request["sessionID"], month: request["month"], day: request["day"], year: request["year"], tutorFirstName: request["tutorFirstName"], tutorLastName: request["tutorLastName"]}}>
                                        Lesson plan
                                    </Link>)}
                                    {userType === "admin" && (<Link className="tutoring-history-link" to="lesson-plan" state={{ sessionID: request["sessionID"], month: request["month"], day: request["day"], year: request["year"], tutorFirstName: request["tutorFirstName"], tutorLastName: request["tutorLastName"], tuteeFirstName: request["tuteeFirstName"], tuteeLastName: request["tuteeLastName"]}}>
                                        Lesson plan
                                    </Link>)}
                                </td>
                                <td className="tutoring-history-text">
                                    {userType === "tutor" && (<Link className="tutoring-history-link" to="session-notes" state={{ sessionID: request["sessionID"], month: request["month"], day: request["day"], year: request["year"], tuteeFirstName: request["tuteeFirstName"], tuteeLastName: request["tuteeLastName"]}}>
                                        Session notes
                                    </Link>)}
                                    {userType === "tutee" && (<Link className="tutoring-history-link" to="session-notes" state={{ sessionID: request["sessionID"], month: request["month"], day: request["day"], year: request["year"], tutorFirstName: request["tutorFirstName"], tutorLastName: request["tutorLastName"]}}>
                                        Session notes
                                    </Link>)}
                                    {userType === "admin" && (<Link className="tutoring-history-link" to="session-notes" state={{ sessionID: request["sessionID"], month: request["month"], day: request["day"], year: request["year"], tutorFirstName: request["tutorFirstName"], tutorLastName: request["tutorLastName"], tuteeFirstName: request["tuteeFirstName"], tuteeLastName: request["tuteeLastName"]}}>
                                        Session notes
                                    </Link>)}
                                </td>
                            </tr>   
                        ))}
                    </tbody>
                </Table>
            </Container>
        </Container>
    );
}
