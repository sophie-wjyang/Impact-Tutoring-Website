import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

// bootstrap
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";

// components
import TextBox from "../components/form/TextBox";
import TextArea from "../components/form/TextArea";
import Dropdown from "../components/form/Dropdown";
import FileUpload from "../components/form/FileUpload";
import MultiSelect from "../components/form/MultiSelect";

export default function VolunteerHoursApprovalPage() {
    const location = useLocation();
    const { requestID } = location.state || {};
    const [requestData, setRequestData] = useState({});
    const [volunteerHoursForm, setVolunteerHoursForm] = useState(null);

    useEffect(() => {
        const data = {
            requestID: requestID
        };

        axios
            .get("http://localhost:5000/get-hours-request-data", {
                params: data,
                withCredentials: true,
            })
            .then((res) => {
                setRequestData(res.data);
            });
    }, []);

    function downloadForm() {
        // save data to database
        // const data = {
        //     dateSubmitted: new Date(),
        //     numHours: numHours,
        //     status: "Pending",
        //     description: description,
        // };

        // axios.post("http://localhost:5000/save-volunteer-hours-data", data, { withCredentials: true });

        // // save volunteer hours form data to S3
        // const volunteerHoursFormData = new FormData();
        // volunteerHoursFormData.append("volunteer-hours-form", volunteerHoursForm);

        // axios.post("http://localhost:5000/save-volunteer-hours-form", volunteerHoursFormData, { withCredentials: true });
    }

    return (
        <Container fluid>
            {/* heading */}
            <h1 className="dashboard-header">Volunteer hours approval</h1>

            {/* volunteer hours request form */}
            <Container className="dashboard-form-container">
                <h2 className="hours-approval-title">Request</h2>

                <div className="hours-approval-text">
                    <div>
                        <span>Requested by:</span> {requestData["tutorFirstName"]} {requestData["tutorLastName"]}
                    </div>

                    <div>
                        <span>Number of hours:</span> {requestData["numHours"]}
                    </div>

                    <div>
                        <span>Description:</span> 
                        <div>
                            {requestData["description"]}
                        </div>
                    </div>

                    <Button variant="primary" size="lg" type="submit" className="w-100 download-form-button" onClick={downloadForm}>
                        Download custom form
                    </Button>
                </div>

            </Container>
        </Container>
    );
}
