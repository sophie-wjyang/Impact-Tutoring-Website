import React from "react";
import { useLocation } from "react-router-dom";

// bootstrap
import { Container, Table, Image } from "react-bootstrap";

export default function TutorInformationPage() {
    const l = useLocation();
    const { firstName, lastName, email, grade, gender, location, subjects, languages, availability, studentCapacity } = l.state || {};

    return (
        <Container fluid>
            {/* profile picture */}
            <Container className="mb-5">
                {/* profile heading */}
                <h1 className="dashboard-header">{firstName} {lastName}</h1>
            </Container>

            {/* profile table */}
            <Container className="table-container">
                <Table className="tutor-information-table">
                    <thead>
                        <tr>
                            <th className="tutor-information-table-title">Personal information</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="tutor-information-table-header">
                                <b>Email</b>
                            </td>
                            <td className="tutor-information-table-text">{email}</td>
                        </tr>
                        <tr>
                            <td className="tutor-information-table-header">
                                <b>Grade</b>
                            </td>
                            <td className="tutor-information-table-text">{grade}</td>
                        </tr>
                        <tr>
                            <td className="tutor-information-table-header">
                                <b>Gender</b>
                            </td>
                            <td className="tutor-information-table-text">{gender}</td>
                        </tr>
                        <tr>
                            <td className="tutor-information-table-header">
                                <b>Location</b>
                            </td>
                            <td className="tutor-information-table-text">{location}</td>
                        </tr>
                    </tbody>
                </Table>
            </Container>

            <Container className="table-container">
                <Table className="tutor-information-table">
                    <thead>
                        <tr>
                            <th className="tutor-information-table-title">Tutoring information</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="tutor-information-table-header">
                                <b>Subjects</b>
                            </td>
                            <td className="tutor-information-table-text">{Array.isArray(subjects) ? subjects.join(", ") : ""}</td>
                        </tr>
                        <tr>
                            <td className="tutor-information-table-header">
                                <b>Languages</b>
                            </td>
                            <td className="tutor-information-table-text">{Array.isArray(languages) ? languages.join(", ") : ""}</td>
                        </tr>
                        <tr>
                            <td className="tutor-information-table-header">
                                <b>Availability</b>
                            </td>
                            <td className="tutor-information-table-text">{Array.isArray(availability) ? availability.join(", ") : ""}</td>
                        </tr>
                        <tr>
                            <td className="tutor-information-table-header">
                                <b>Maximum student capacity</b>
                            </td>
                            <td className="tutor-information-table-text">{studentCapacity}</td>
                        </tr>
                    </tbody>
                </Table>
            </Container>
        </Container>
    );
}
