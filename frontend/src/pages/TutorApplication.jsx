import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// bootstrap
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import TextBox from '../components/form/TextBox';
import RadioButtons from '../components/form/RadioButtons';
import Dropdown from '../components/form/Dropdown';

export default function TutorApplication() {
    const [grade, setGrade] = useState("");
    const [gender, setGender] = useState("");
    const [location, setLocation] = useState("");
    const [subjects, setSubjects] = useState([]);
    const [languages, setLanguages] = useState([]);
    const [availability, setAvailability] = useState("");
    const [studentCapacity, setStudentCapacity] = useState("");
    const [reportCard, setReportCard] = useState("");
    const [resume, setResume] = useState("");
    const [previousExperience, setPreviousExperience] = useState("");
    

    return (
        <div className="d-flex justify-content-center align-items-center">
            <Container id="form-container">
                <h2 className="form-heading">Apply to be a tutor</h2>
                <p className="mb-4 form-description">
                    Thank you for making an account with us! Please fill out the following fields to apply to be a tutor with Impact Tutoring. If you have any questions, please contact us at impacttutoringca@gmail.com.
                </p>

                <Form>
                    {/* grade */}
                    <Dropdown controlId={"formEmail"} label={"Grade"} placeholder={"Grade"} value={grade} options={[9, 10, 11, 12]} onChange={(e) => setGrade(e.target.value)} />

                    <h4>grade: {grade}</h4>
                    

                    
                    <Button variant="primary" size="lg" type="submit" className="w-100 form-submit-button">
                        Submit application
                    </Button>
                </Form>
            </Container>
        </div>
    );
}

