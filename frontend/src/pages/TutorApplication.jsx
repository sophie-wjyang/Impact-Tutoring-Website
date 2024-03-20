import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
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

export default function TutorApplication() {
    const navigate = useNavigate();

    const [grade, setGrade] = useState("");
    const [gender, setGender] = useState("");
    const [location, setLocation] = useState("");
    const [subjects, setSubjects] = useState([]);
    const [languages, setLanguages] = useState([]);
    const [availability, setAvailability] = useState([]);
    const [studentCapacity, setStudentCapacity] = useState("");
    const [reportCard, setReportCard] = useState(null);
    const [resume, setResume] = useState(null);
    const [previousExperience, setPreviousExperience] = useState("");

    // google maps location autocomplete
    useEffect(() => {
        // create a new instance of the google autocomplete class, and bind it to the input field
        const inputBox = document.getElementById("formLocation");
        const autocomplete = new window.google.maps.places.Autocomplete(inputBox);
        autocomplete.setTypes(["(cities)"]);

        // create event listener for the place_changed event
        autocomplete.addListener("place_changed", () => {
            setLocation(autocomplete.getPlace().formatted_address);
        });
    }, []);

    function saveTutorApplicationData(event){
        // event.preventDefault();

        // const data = {
        //     grade: grade,
        //     gender: gender,
        //     location: location,
        //     subjects: subjects,
        //     languages: languages,
        //     availability: availability,
        //     studentCapacity: studentCapacity
        // }

        // console.log(data);

        // axios.post("http://localhost:5000/save-tutor-application-data", data)
        //     .then(() => {
        //         navigate("/login");
        //     })
    }

    function saveTutorApplicationResume(){
        console.log("the file to be uploaded is: ", resume)
        const data = new FormData();
        data.append("resume", resume);

        axios.post("http://localhost:5000/save-tutor-application-resume", data, { withCredentials: true })
            .then(() => {
                console.log("posted to backend")
                // navigate("/login");
            })
    }

    function saveTutorApplicationReportCard(){
        console.log("the file to be uploaded is: ", reportCard)
        const data = new FormData();
        data.append("report-card", reportCard);

        axios.post("http://localhost:5000/save-tutor-application-report-card", data, { withCredentials: true })
            .then(() => {
                console.log("posted to backend")
                // navigate("/login");
            })
    }

    return (
        <div className="d-flex justify-content-center align-items-center">
            <Container id="form-container">
                <h2 className="form-heading">Apply to be a tutor</h2>
                <p className="mb-4 form-description">
                    Thank you for making an account with us! Please fill out the following fields to apply to be a tutor with Impact Tutoring. If you have any questions, please contact us at
                    impacttutoringca@gmail.com.
                </p>

                <Form onSubmit={(e) => {
                        saveTutorApplicationData(e);
                        saveTutorApplicationResume();
                        saveTutorApplicationReportCard();
                    }}>
                    {/* grade */}
                    <Dropdown
                        controlId="formEmail"
                        label="Grade"
                        placeholder="Grade"
                        value={grade}
                        options={["Grade 9", "Grade 10", "Grade 11", "Grade 12", "University/College"]}
                        onChange={(e) => setGrade(e.target.value)}
                        description=""
                    />

                    {/* gender */}
                    <Dropdown
                        controlId="formGender"
                        label="Gender"
                        placeholder="Gender"
                        value={gender}
                        options={["Male", "Female", "Non-binary", "Prefer not to say"]}
                        onChange={(e) => setGender(e.target.value)}
                        description=""
                    />

                    {/* location */}
                    <TextBox controlId="formLocation" label="Location" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} autocomplete="on" />

                    {/* subjects */}
                    <MultiSelect
                        controlId="formSubjects"
                        label="Subjects"
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
                        controlId="formAvailability"
                        label="Availability"
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
                        controlId="formStudentCapacity"
                        label="Student capacity"
                        placeholder="Student capacity"
                        value={studentCapacity}
                        options={["1", "2", "3"]}
                        onChange={(e) => setStudentCapacity(e.target.value)}
                        description="Please select the maximum number of students you would be comfortable tutoring."
                    />

                    {/* report card */}
                    <FileUpload
                        controlId="formReportCard"
                        label="Report card"
                        description="Please upload a copy of your most recent report card."
                        onChange={(e) => {
                            console.log(e.target.files[0]);
                            setReportCard(e.target.files[0])
                        }}
                    />

                    {/* resume */}
                    <FileUpload
                        controlId="formResume"
                        label="Resume"
                        description=""
                        onChange={(e) => {
                            console.log(e.target.files[0]);
                            setResume(e.target.files[0])
                        }}
                    />

                    {/* previous experience */}
                    <TextArea controlId="previousExperience" label="Previous experience" description="If you have any previous experience with tutoring, or have any additional information you would like to share with us, please do so here." placeholder="Additional information" value={previousExperience} rows={5} onChange={(e) => setPreviousExperience(e.target.value)} />

                    <Button variant="primary" size="lg" type="submit" className="w-100 form-submit-button">
                        Submit application
                    </Button>


                </Form>
            </Container>
        </div>
    );
}
