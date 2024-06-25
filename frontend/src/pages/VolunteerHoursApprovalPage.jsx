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
            requestID: requestID,
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
        const data = {
            requestID: requestID,
        };

        // this will be a custom form if the tutor submitted a custom volunteer hours form to S3
        // or a default form otherwise
        axios.get("http://localhost:5000/get-volunteer-hours-form", { 
                params: data,
                responseType: "blob",
                withCredentials: true 
            }).then((res) => {
                // create a blob URL from the blob response received from the server
                const url = window.URL.createObjectURL(res.data);

                // create a new anchor element that references this link, and append it to the document body
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', `${requestData["tutorFirstName"]}-${requestData["tutorLastName"]}-volunteer-hours-form.pdf`);
                document.body.appendChild(link);

                // use this anchor element to trigger the download
                link.click();

                // clean up 
                document.body.removeChild(link);
                URL.revokeObjectURL(url);
            });
    }

    function submitApproval(event) {
        // save volunteer hours form data to S3
        const volunteerHoursFormData = new FormData();
        volunteerHoursFormData.append("volunteer-hours-form", volunteerHoursForm);
        volunteerHoursFormData.append("requestID", requestID);

        axios.post("http://localhost:5000/save-volunteer-hours-approval-form", volunteerHoursFormData, { withCredentials: true });
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
                        <div>{requestData["description"]}</div>
                    </div>

                    <div>
                        <span>Download blank form:</span>
                        <Button variant="primary" size="lg" type="submit" className="w-100 download-form-button" onClick={downloadForm}>
                            Download volunteer hours form
                        </Button>
                    </div>

                    <div>
                        <FileUpload
                            controlId="approvedVolunteerHoursForm"
                            label="Upload approved form:"
                            onChange={(e) => {
                                setVolunteerHoursForm(e.target.files[0]);
                            }}
                        />
                    </div>

                    <Button variant="primary" size="lg" type="submit" className="w-100 submit-button" onClick={submitApproval}>
                        Submit approval
                    </Button>
                </div>
            </Container>
        </Container>
    );
}
