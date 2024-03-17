import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// bootstrap
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import TextBox from "../components/form/TextBox";
import RadioButtons from "../components/form/RadioButtons";
import Dropdown from "../components/form/Dropdown";
import MultiSelect from "../components/form/MultiSelect";

export default function TutorApplication() {
    const [grade, setGrade] = useState("");
    const [gender, setGender] = useState("");
    const [location, setLocation] = useState("");
    const [subjects, setSubjects] = useState([]);
    const [languages, setLanguages] = useState([]);
    const [availability, setAvailability] = useState([]);
    const [studentCapacity, setStudentCapacity] = useState("");
    const [reportCard, setReportCard] = useState("");
    const [resume, setResume] = useState("");
    const [previousExperience, setPreviousExperience] = useState("");

    return (
        <div className="d-flex justify-content-center align-items-center">
            <Container id="form-container">
                <h2 className="form-heading">Apply to be a tutor</h2>
                <p className="mb-4 form-description">
                    Thank you for making an account with us! Please fill out the following fields to apply to be a tutor with Impact Tutoring. If you have any questions, please contact us at
                    impacttutoringca@gmail.com.
                </p>

                <Form>
                    {/* grade */}
                    <Dropdown
                        controlId={"formEmail"}
                        label={"Grade"}
                        placeholder={"Grade"}
                        value={grade}
                        options={["Grade 9", "Grade 10", "Grade 11", "Grade 12", "University/College"]}
                        onChange={(e) => setGrade(e.target.value)}
                        description=""
                    />

                    {/* gender */}
                    <Dropdown
                        controlId={"formGender"}
                        label={"Gender"}
                        placeholder={"Gender"}
                        value={gender}
                        options={["Male", "Female", "Non-binary", "Prefer not to say"]}
                        onChange={(e) => setGender(e.target.value)}
                        description=""
                    />

                    {/* location */}
                    <TextBox controlId={"formLocation"} label={"Location"} placeholder={"Location"} value={location} onChange={(e) => setLocation(e.target.value)} />

                    {/* subjects */}
                    <MultiSelect
                        controlId={"formSubjects"}
                        label={"Subjects"}
                        value={subjects}
                        options={[
                            "Grade 1-8 Mathematics",
                            "Grade 9 Mathematics",
                            "Grade 10 Mathematics",
                            "Grade 1-8 English",
                            "Grade 9 English",
                            "Grade 10 English",
                            "Grade 1-8 Science",
                            "Grade 9 Science",
                            "Grade 10 Science",
                            "Grade 1-8 French",
                            "Grade 9 French",
                            "Grade 10 French",
                        ]}
                        onChange={(e) => {
                            // get all selected options, extract the value of each option, turn it into an array, store it in subjects
                            const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
                            setSubjects(selectedOptions);
                        }}
                        description="Please check all the subjects you would be comfortable tutoring."
                    />

                    {/* languages */}
                    <TextBox controlId={"formLanguages"} label={"Languages"} placeholder={"Languages"} value={languages} onChange={(e) => setLanguages(e.target.value)} />

                    {/* availability */}
                    <MultiSelect
                        controlId={"formAvailability"}
                        label={"Availability"}
                        value={availability}
                        options={["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]}
                        onChange={(e) => {
                            const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
                            setAvailability(selectedOptions);
                        }}
                        description="Please check all the days you would be available to tutor."
                    />

                    {/* student capacity */}
                    <Dropdown
                        controlId={"formStudentCapacity"}
                        label={"Student capacity"}
                        placeholder={"Student capacity"}
                        value={studentCapacity}
                        options={["1", "2", "3"]}
                        onChange={(e) => setStudentCapacity(e.target.value)}
                        description="Please select the maximum number of students you would be comfortable tutoring."
                    />

                    <Button variant="primary" size="lg" type="submit" className="w-100 form-submit-button">
                        Submit application
                    </Button>
                </Form>
            </Container>
        </div>
    );
}
