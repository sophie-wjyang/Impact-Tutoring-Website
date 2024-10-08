import React from "react";
import { useEffect, useState } from "react";

// assets
import TutorProfilePicture from "../assets/images/profile-page/tutor-profile-picture.png";
import TuteeProfilePicture from "../assets/images/profile-page/tutee-profile-picture.png";

// bootstrap
import { Container, Row, Col, Table, Image } from "react-bootstrap";
import client from "../axios";

const toReadableGender = (value) => {
    if (value === "male") return "Male";
    if (value === "female") return "Female";
    if (value === "nonbinary") return "Non-binary";
    if (value === "unspecified") return "Prefer not to say";
};

export function ProfilePageTutor() {
    const [profileInfo, setProfileInfo] = useState({});

    // get all relevant profile information on component render
    useEffect(() => {
        client.get("get-profile-info").then((res) => {
            // profile info goes from dictionary -> object
            setProfileInfo(res.data);
        });
    }, []);

    return (
        <Container fluid>
            {/* profile picture */}
            <Container className="mb-5">
                {/* profile heading */}
                <h1 className="dashboard-header">Welcome, {profileInfo["firstName"]}</h1>

                <Row>
                    <Col xs={6} md={4}>
                        <Image src={TutorProfilePicture} roundedCircle style={{ width: "200px", height: "200px" }} />
                    </Col>
                </Row>
            </Container>

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
                                {profileInfo["firstName"]} {profileInfo["lastName"]}
                            </td>
                        </tr>
                        <tr>
                            <td className="profile-table-header">
                                <b>Email</b>
                            </td>
                            <td className="profile-table-text">{profileInfo["email"]}</td>
                        </tr>
                        <tr>
                            <td className="profile-table-header">
                                <b>Grade</b>
                            </td>
                            <td className="profile-table-text">{profileInfo["grade"]}</td>
                        </tr>
                        <tr>
                            <td className="profile-table-header">
                                <b>Gender</b>
                            </td>
                            <td className="profile-table-text">{toReadableGender(profileInfo["gender"])}</td>
                        </tr>
                        <tr>
                            <td className="profile-table-header">
                                <b>Location</b>
                            </td>
                            <td className="profile-table-text">{profileInfo["location"]}</td>
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
                            <td className="profile-table-text">{Array.isArray(profileInfo["subjects"]) ? profileInfo["subjects"].join(", ") : ""}</td>
                        </tr>
                        <tr>
                            <td className="profile-table-header">
                                <b>Languages</b>
                            </td>
                            <td className="profile-table-text">{Array.isArray(profileInfo["languages"]) ? profileInfo["languages"].join(", ") : ""}</td>
                        </tr>
                        <tr>
                            <td className="profile-table-header">
                                <b>Availability</b>
                            </td>
                            <td className="profile-table-text">{Array.isArray(profileInfo["availability"]) ? profileInfo["availability"].join(", ") : ""}</td>
                        </tr>
                        <tr>
                            <td className="profile-table-header">
                                <b>Maximum student capacity</b>
                            </td>
                            <td className="profile-table-text">{profileInfo["studentCapacity"]}</td>
                        </tr>
                    </tbody>
                </Table>
            </Container>
        </Container>
    );
}

export function ProfilePageTutee() {
    const [profileInfo, setProfileInfo] = useState({});

    // get all relevant profile information on component render
    useEffect(() => {
        client.get("get-profile-info").then((res) => {
            // profile info goes from dictionary -> object
            setProfileInfo(res.data);
        });
    }, []);

    return (
        <Container fluid>
            {/* profile picture */}
            <Container className="mb-5">
                {/* profile heading */}
                <h1 className="dashboard-header">Welcome, {profileInfo["firstName"]}</h1>

                <Row>
                    <Col xs={6} md={4}>
                        <Image src={TuteeProfilePicture} roundedCircle style={{ width: "200px", height: "200px" }} />
                    </Col>
                </Row>
            </Container>

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
                                {profileInfo["firstName"]} {profileInfo["lastName"]}
                            </td>
                        </tr>
                        <tr>
                            <td className="profile-table-header">
                                <b>Email</b>
                            </td>
                            <td className="profile-table-text">{profileInfo["email"]}</td>
                        </tr>
                        <tr>
                            <td className="profile-table-header">
                                <b>Grade</b>
                            </td>
                            <td className="profile-table-text">{profileInfo["grade"]}</td>
                        </tr>
                        <tr>
                            <td className="profile-table-header">
                                <b>Gender</b>
                            </td>
                            <td className="profile-table-text">{toReadableGender(profileInfo["gender"])}</td>
                        </tr>
                        <tr>
                            <td className="profile-table-header">
                                <b>Location</b>
                            </td>
                            <td className="profile-table-text">{profileInfo["location"]}</td>
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
                            <td className="profile-table-text">{Array.isArray(profileInfo["subjects"]) ? profileInfo["subjects"].join(", ") : ""}</td>
                        </tr>
                        <tr>
                            <td className="profile-table-header">
                                <b>Languages</b>
                            </td>
                            <td className="profile-table-text">{Array.isArray(profileInfo["languages"]) ? profileInfo["languages"].join(", ") : ""}</td>
                        </tr>
                        <tr>
                            <td className="profile-table-header">
                                <b>Availability</b>
                            </td>
                            <td className="profile-table-text">{Array.isArray(profileInfo["availability"]) ? profileInfo["availability"].join(", ") : ""}</td>
                        </tr>
                    </tbody>
                </Table>
            </Container>
        </Container>
    );
}
