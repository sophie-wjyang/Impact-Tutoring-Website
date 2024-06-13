import React from "react";
import { useLocation } from "react-router-dom";

// bootstrap
import { Container, Table } from "react-bootstrap";

export default function TuteeInformationPage() {
    const l = useLocation();
    const { firstName, lastName, email, grade, gender, location, subjects, languages, availability } = l.state || {};

    return (
        <Container fluid>
            {/* profile picture */}
            <Container className="mb-5">
                {/* profile heading */}
                <h1 className="dashboard-header">{firstName} {lastName}</h1>
            </Container>

            {/* profile table */}
            <Container className="table-container">
                <Table className="tutee-information-table">
                    <thead>
                        <tr>
                            <th className="tutee-information-table-title">Personal information</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="tutee-information-table-header">
                                <b>Email</b>
                            </td>
                            <td className="tutee-information-table-text">{email}</td>
                        </tr>
                        <tr>
                            <td className="tutee-information-table-header">
                                <b>Grade</b>
                            </td>
                            <td className="tutee-information-table-text">{grade}</td>
                        </tr>
                        <tr>
                            <td className="tutee-information-table-header">
                                <b>Gender</b>
                            </td>
                            <td className="tutee-information-table-text">{gender}</td>
                        </tr>
                        <tr>
                            <td className="tutee-information-table-header">
                                <b>Location</b>
                            </td>
                            <td className="tutee-information-table-text">{location}</td>
                        </tr>
                    </tbody>
                </Table>
            </Container>

            <Container className="table-container">
                <Table className="tutee-information-table">
                    <thead>
                        <tr>
                            <th className="tutee-information-table-title">Tutoring information</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="tutee-information-table-header">
                                <b>Subjects</b>
                            </td>
                            <td className="tutee-information-table-text">{Array.isArray(subjects) ? subjects.join(", ") : ""}</td>
                        </tr>
                        <tr>
                            <td className="tutee-information-table-header">
                                <b>Languages</b>
                            </td>
                            <td className="tutee-information-table-text">{Array.isArray(languages) ? languages.join(", ") : ""}</td>
                        </tr>
                        <tr>
                            <td className="tutee-information-table-header">
                                <b>Availability</b>
                            </td>
                            <td className="tutee-information-table-text">{Array.isArray(availability) ? availability.join(", ") : ""}</td>
                        </tr>
                    </tbody>
                </Table>
            </Container>
        </Container>
    );
}
