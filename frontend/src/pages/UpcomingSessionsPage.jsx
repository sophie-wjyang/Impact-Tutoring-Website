import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// assets
import DashboardSidebar from "../components/DashboardSidebar";
import TutorProfilePicture from '../assets/images/profile-page/tutor-profile-picture.png';
import TuteeProfilePicture from '../assets/images/profile-page/tutee-profile-picture.png';


// bootstrap
import { Container, Row, Col, Table, Image } from "react-bootstrap";

export default function UpcomingSessionsPage() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [grade, setGrade] = useState("");
    const [gender, setGender] = useState("");
    const [location, setLocation] = useState("");
    const [subjects, setSubjects] = useState("");
    const [languages, setLanguages] = useState("");
    const [availability, setAvailability] = useState("");
    const [studentCapacity, setStudentCapacity] = useState("");

    // get all relevant profile information on component render
    useEffect(() => {
        axios.get("http://localhost:5000/get-profile-info", { withCredentials: true }).then((res) => {
            // return the first profile in the list of tuples
            const profileInfo = res.data[0];

            setFirstName(profileInfo[0]);
            setLastName(profileInfo[1]);
            setEmail(profileInfo[2]);
            setGrade(profileInfo[3]);
            setGender(profileInfo[4]);
            setLocation(profileInfo[5]);
            setSubjects(profileInfo[6]);
            setLanguages(profileInfo[7]);
            setAvailability(profileInfo[8]);
            setStudentCapacity(profileInfo[9]);
        });
    }, []);

    return (
        <Container fluid>
            <Row>
                <Col id="dashboard-sidebar" xs={3}>
                    <DashboardSidebar />
                </Col>
                <Col id="dashboard-main-content" xs={9}>
                    {/* profile heading */}
                    <h1 className="profile-welcome">Upcoming sessions</h1>

                    {/* profile table */}
                    <Container className="table-container">
                        <Table className="profile-table">
                            <thead>
                                <tr>
                                    <th className="profile-table-title">Personal information</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="profile-table-header">
                                        <b>Name</b>
                                    </td>
                                    <td className="profile-table-text">
                                        {firstName} {lastName}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="profile-table-header">
                                        <b>Email</b>
                                    </td>
                                    <td className="profile-table-text">{email}</td>
                                </tr>
                                <tr>
                                    <td className="profile-table-header">
                                        <b>Grade</b>
                                    </td>
                                    <td className="profile-table-text">{grade}</td>
                                </tr>
                                <tr>
                                    <td className="profile-table-header">
                                        <b>Gender</b>
                                    </td>
                                    <td className="profile-table-text">{gender}</td>
                                </tr>
                                <tr>
                                    <td className="profile-table-header">
                                        <b>Location</b>
                                    </td>
                                    <td className="profile-table-text">{location}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Container>

                    <Container className="table-container">
                        <Table className="profile-table">
                            <thead>
                                <tr>
                                    <th className="profile-table-title">Tutoring information</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="profile-table-header">
                                        <b>Subjects</b>
                                    </td>
                                    <td className="profile-table-text">{Array.isArray(subjects) ? subjects.join(", ") : ""}</td>
                                </tr>
                                <tr>
                                    <td className="profile-table-header">
                                        <b>Languages</b>
                                    </td>
                                    <td className="profile-table-text">{Array.isArray(languages) ? languages.join(", ") : ""}</td>
                                </tr>
                                <tr>
                                    <td className="profile-table-header">
                                        <b>Availability</b>
                                    </td>
                                    <td className="profile-table-text">{Array.isArray(availability) ? availability.join(", ") : ""}</td>
                                </tr>
                                <tr>
                                    <td className="profile-table-header">
                                        <b>Maximum student capacity</b>
                                    </td>
                                    <td className="profile-table-text">{studentCapacity}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Container>
                </Col>
            </Row>
        </Container>
    );
}
