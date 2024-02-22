import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import DashboardSidebar from "../components/DashboardSidebar";

// bootstrap
import { Container, Row, Col, Table } from "react-bootstrap";

export default function ProfilePage() {
    // get all relevant profile information on component render
    useEffect(() => {
        axios.get("http://localhost:5000/get-profile-info").then((res) => {
            // const profileInfo = res.data;
            console.log(res.data);

            // Accessing fields from the first profile
            // console.log('First name:', profileInfo[0].first_name);
            // console.log('Last name:', profileInfo[0].last_name);
            // console.log('Email:', profileInfo[0].email);
            // console.log('Grade:', profileInfo[0].grade);
        });
    }, []);

    return (
        <Container fluid>
            <Row>
                <Col id="dashboard-sidebar" xs={3}>
                    <DashboardSidebar />
                </Col>
                <Col id="dashboard-main-content" xs={9}>
                    <h1 className="profile-welcome">Welcome, Sophie</h1>

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
                                    <td className="profile-table-header"><b>Name</b></td>
                                    <td className="profile-table-text">Sophie Yang</td>
                                </tr>
                                <tr>
                                    <td className="profile-table-header"><b>Email</b></td>
                                    <td className="profile-table-text">sophie.wjyang@gmail.com</td>
                                </tr>
                                <tr>
                                    <td className="profile-table-header"><b>Grade</b></td>
                                    <td className="profile-table-text">12</td>
                                </tr>
                                <tr>
                                    <td className="profile-table-header"><b>Gender</b></td>
                                    <td className="profile-table-text">Female</td>
                                </tr>
                                <tr>
                                    <td className="profile-table-header"><b>Location</b></td>
                                    <td className="profile-table-text">Toronto, Canada</td>
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
                                    <td className="profile-table-header"><b>Subjects</b></td>
                                    <td className="profile-table-text">Grade 8 math, Grade 10 english</td>
                                </tr>
                                <tr>
                                    <td className="profile-table-header"><b>Languages</b></td>
                                    <td className="profile-table-text">English, Mandarin</td>
                                </tr>
                                <tr>
                                    <td className="profile-table-header"><b>Availability</b></td>
                                    <td className="profile-table-text">Tuesday, Thursday, Sunday</td>
                                </tr>
                                <tr>
                                    <td className="profile-table-header"><b>Maximum student capacity</b></td>
                                    <td className="profile-table-text">3</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Container>
                </Col>
            </Row>
        </Container>
    );
}
