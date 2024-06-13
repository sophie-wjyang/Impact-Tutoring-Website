import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";

// bootstrap
import { Container, Table } from "react-bootstrap";

export default function TutorsPage() {
    const location = useLocation();
    const [tutors, setTutors] = useState([]);

    // get tutors
    useEffect(() => {
        axios.get("http://localhost:5000/get-tutors", { withCredentials: true })
            .then((res) => {
                // tutors goes from list of dictionaries -> array of objects
                setTutors(res.data);
            });
    }, []);

    return (
        <Container fluid>
            {/* heading */}
            <h1 className="dashboard-header">Tutors</h1>

            <Container className="table-container">
                <Table className="tutors-table">
                    <thead>
                        <tr>
                            <th className="tutors-header">
                                <b>Tutor name</b>
                            </th>
                            <th className="tutors-header">
                                <b>Tutor details</b>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {tutors.map((tutor, index) => (
                            <tr key={index}>
                                <td className="tutors-text">{tutor["firstName"]} {tutor["lastName"]}</td>
                                <td className="tutors-text">
                                    <Link className="tutors-link" to="tutor-information" state={{ firstName: tutor["firstName"], lastName: tutor["lastName"], email: tutor["email"], grade: tutor["grade"], gender: tutor["gender"], location: tutor["location"], subjects: tutor["subjects"], languages: tutor["languages"], availability: tutor["availability"], studentCapacity: tutor["studentCapacity"] }}>
                                        See tutor profile
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
