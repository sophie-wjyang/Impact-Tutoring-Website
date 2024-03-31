import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// bootstrap
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";

// components
import TextBox from "../components/form/TextBox";
import TextArea from "../components/form/TextArea";
import Dropdown from "../components/form/Dropdown";
import FileUpload from "../components/form/FileUpload";
import MultiSelect from "../components/form/MultiSelect";

export default function VolunteerHoursPage() {
    const navigate = useNavigate();

    const [numHours, setNumHours] = useState("");
    const [description, setDescription] = useState("");
    const [volunteerHoursForm, setVolunteerHoursForm] = useState(null);

    function saveVolunteerHoursData(event) {
        // save data to database
        const data = {
            dateSubmitted: new Date(),
            numHours: numHours,
            status: "Pending",
            description: description,
        };

        axios.post("http://localhost:5000/save-volunteer-hours-data", data, { withCredentials: true });

        // save volunteer hours form data to S3
        const volunteerHoursFormData = new FormData();
        volunteerHoursFormData.append("volunteer-hours-form", volunteerHoursForm);

        axios.post("http://localhost:5000/save-volunteer-hours-form", volunteerHoursFormData, { withCredentials: true });
    }

    return (
        <Container fluid>
            {/* heading */}
            <h1 className="dashboard-header">Volunteer hours</h1>

            <Container className="dashboard-form-container">
                <h2 className="form-heading">Request hours</h2>
                <p className="mb-4 form-description">
                    Thank you for making an account with us! Please fill out the following fields to apply to be a tutor with Impact Tutoring. If you have any questions, please contact us at
                    impacttutoringca@gmail.com.
                </p>

                <Form
                    onSubmit={(e) => {
                        saveVolunteerHoursData(e);
                    }}
                >
                    {/* Number of hours */}
                    <TextBox controlId={"numHours"} label={"Number of hours"} placeholder={"Number of hours"} value={numHours} onChange={(e) => setNumHours(e.target.value)} />

                    {/* Description */}
                    <TextArea
                        controlId="description"
                        label="Description"
                        description="Regarding the hours you’re requesting, please include the name of the tutee, the session dates, and any other relevant information."
                        placeholder="Description"
                        value={description}
                        rows={5}
                        onChange={(e) => setDescription(e.target.value)}
                    />

                    {/* Volunteer hours form */}
                    <FileUpload
                        controlId="volunteerHoursForm"
                        label="Volunteer hours form"
                        description="If you have a specific volunteer file you’d like us to sign off on, please upload it here, with all the basic information filled in (your name, number of hours, description, etc.). Otherwise, a default letter will be provided to you."
                        onChange={(e) => {
                            setVolunteerHoursForm(e.target.files[0]);
                        }}
                    />

                    <Button variant="primary" size="lg" type="submit" className="w-100 form-submit-button">
                        Submit application
                    </Button>
                </Form>
            </Container>
        </Container>
    );
}
