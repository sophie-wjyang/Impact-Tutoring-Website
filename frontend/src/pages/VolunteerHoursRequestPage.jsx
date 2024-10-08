import React from "react";
import { useState } from "react";
import { useEffect } from "react";

// bootstrap
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";

// components
import TextBox from "../components/form/TextBox";
import TextArea from "../components/form/TextArea";
import FileUpload from "../components/form/FileUpload";
import client from "../axios";

export default function VolunteerHoursRequestPage() {
    const [numHours, setNumHours] = useState("");
    const [description, setDescription] = useState("");
    const [volunteerHoursForm, setVolunteerHoursForm] = useState(null);
    const [pastVolunteerRequests, setPastVolunteerRequests] = useState([]);

    function fetchVolunteerRequests() {
        client.get("get-past-volunteer-hours-request-history").then((res) => {
            setPastVolunteerRequests(res.data);
        });
    }

    // get past volunteer hour requests
    useEffect(() => {
        fetchVolunteerRequests();
    }, []);

    function saveVolunteerHoursData(event) {
        event.preventDefault();

        // save data to database
        const data = {
            dateSubmitted: new Date(),
            numHours: numHours,
            status: "Pending",
            description: description,
        };

        // save volunteer hours form data to S3
        const volunteerHoursFormData = new FormData();
        volunteerHoursFormData.append("volunteer-hours-form", volunteerHoursForm);

        client.post("save-volunteer-hours-request-form", volunteerHoursFormData).then(() => {
            client.post("save-volunteer-hours-data", data).then(() => {
                fetchVolunteerRequests();
            });
        });
    }

    return (
        <Container fluid>
            {/* heading */}
            <h1 className="dashboard-header">Volunteer hours</h1>

            {/* volunteer hours request form */}
            <Container className="dashboard-form-container">
                <h2 className="form-heading">Request hours</h2>

                <Form
                    onSubmit={(e) => {
                        saveVolunteerHoursData(e);
                    }}
                >
                    {/* Number of hours */}
                    <TextBox controlId={"numHours"} label={"Number of hours"} placeholder={"Number of hours"} value={numHours} onChange={(e) => setNumHours(e.target.value)} required />

                    {/* Description */}
                    <TextArea
                        controlId="description"
                        label="Description"
                        description="Regarding the hours you're requesting, please include the name of the tutee, the session dates, and any other relevant information."
                        placeholder="Description"
                        value={description}
                        rows={5}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />

                    {/* Volunteer hours form */}
                    <FileUpload
                        controlId="pendingVolunteerHoursForm"
                        label="Volunteer hours form"
                        description="If you have a specific volunteer file you'd like us to sign off on, please upload it here, with all the basic information filled in (your name, number of hours, description, etc.). Otherwise, a default letter will be provided to you."
                        onChange={(e) => {
                            setVolunteerHoursForm(e.target.files[0]);
                        }}
                        required
                    />

                    <Button variant="primary" size="lg" type="submit" className="w-100 form-submit-button">
                        Submit application
                    </Button>
                </Form>
            </Container>

            {/* volunteer hours history */}
            <Container className="table-container">
                <h3 className="past-hours-requests-title">Past hours requests</h3>

                <Table className="past-hours-requests-table">
                    <thead>
                        <tr>
                            <th className="past-hours-requests-header">
                                <b>Date requested</b>
                            </th>
                            <th className="past-hours-requests-header">
                                <b>Number of hours</b>
                            </th>
                            <th className="past-hours-requests-header">
                                <b>Status</b>
                            </th>
                            <th className="past-hours-requests-header">
                                <b>Download form</b>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {pastVolunteerRequests.map((request, index) => (
                            <tr key={index}>
                                <td className="past-hours-requests-text">{request["dateSubmitted"]}</td>
                                <td className="past-hours-requests-text">{request["numHours"]}</td>
                                <td className="past-hours-requests-text">{request["status"]}</td>
                                <td className="past-hours-requests-text">{}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </Container>
    );
}
