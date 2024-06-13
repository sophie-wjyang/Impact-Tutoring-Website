import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";

// bootstrap
import { Container, Table } from "react-bootstrap";

export default function PairingsPage() {
    const location = useLocation();
    const [pairings, setPairings] = useState([]);

    // get pairings
    useEffect(() => {
        axios.get("http://localhost:5000/get-pairings", { withCredentials: true })
            .then((res) => {
                // pairings goes from list of dictionaries -> array of objects
                setPairings(res.data);
            });
    }, []);

    return (
        <Container fluid>
            {/* heading */}
            <h1 className="dashboard-header">Pairings</h1>

            <Container className="table-container">
                <Table className="tutors-table">
                    <thead>
                        <tr>
                            <th className="tutors-header">
                                <b>Tutor</b>
                            </th>
                            <th className="tutors-header">
                                <b>Tutee</b>
                            </th>
                            <th className="tutors-header">
                                <b>Past sessions</b>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {pairings.map((pairing, index) => (
                            <tr key={index}>
                                <td className="tutors-text">{pairing["tutorFirstName"]} {pairing["tutorLastName"]}</td>
                                <td className="tutors-text">{pairing["tuteeFirstName"]} {pairing["tuteeLastName"]}</td>
                                <td className="tutors-text">
                                    <Link className="tutors-link" to="tutoring-history" state={{ pairingID: pairing["pairingID"] }}>
                                        See tutoring history
                                    </Link>
                                </td>
                            </tr>   
                        ))}
                    </tbody>
                </Table>
            </Container>
        </Container>
    );
}
