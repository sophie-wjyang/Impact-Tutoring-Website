import React from "react";
import { useState } from "react";
import { useEffect } from "react";

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
import client from "../axios";

export default function TutorApplication() {
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
    if (!window.google) return;

    // create a new instance of the google autocomplete class, and bind it to the input field
    const inputBox = document.getElementById("formLocation");
    const autocomplete = new window.google.maps.places.Autocomplete(inputBox);
    autocomplete.setTypes(["(cities)"]);

    // create event listener for the place_changed event
    autocomplete.addListener("place_changed", () => {
      setLocation(autocomplete.getPlace().formatted_address);
    });
  }, [window.google]);

  function saveTutorApplicationData(event) {
    // save data to database
    event.preventDefault();

    const data = {
      grade: grade,
      gender: gender,
      location: location,
      subjects: subjects,
      languages: languages,
      availability: availability,
      studentCapacity: studentCapacity,
      previousExperience: previousExperience,
    };

    client.post("save-tutor-application-data", data);

    // save resume data to S3
    const resumeData = new FormData();
    resumeData.append("resume", resume);

    client.post("save-tutor-application-resume", resumeData);

    // save report card data to S3
    const reportCardData = new FormData();
    reportCardData.append("report-card", reportCard);

    client.post("save-tutor-application-report-card", reportCardData);
  }

  return (
    <div className="d-flex justify-content-center align-items-center">
      <Container id="form-container">
        <h2 className="form-heading">Apply to be a tutor</h2>
        <p className="mb-4 form-description">
          Thank you for making an account with us! Please fill out the following
          fields to apply to be a tutor with Impact Tutoring. If you have any
          questions, please contact us at impacttutoringca@gmail.com.
        </p>

        <Form
          onSubmit={(e) => {
            saveTutorApplicationData(e);
          }}
        >
          {/* grade */}
          <Dropdown
            controlId="formEmail"
            label="Grade"
            placeholder="Grade"
            value={grade}
            options={[
              "Grade 9",
              "Grade 10",
              "Grade 11",
              "Grade 12",
              "University/College",
            ]}
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
          <TextBox
            controlId="formLocation"
            label="Location"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            autocomplete="on"
          />

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
              const selectedOptions = Array.from(
                e.target.selectedOptions,
                (option) => option.value
              );
              setSubjects(selectedOptions);
            }}
            description="Please check all the subjects you would be comfortable tutoring."
          />

          {/* languages */}
          <MultiSelect
            controlId="formLanguages"
            label="Languages"
            value={languages}
            options={["English", "Chinese", "Spanish", "Hindi", "French"]}
            onChange={(e) => {
              // get all selected options, extract the value of each option, turn it into an array, store it in subjects
              const selectedOptions = Array.from(
                e.target.selectedOptions,
                (option) => option.value
              );
              setLanguages(selectedOptions);
            }}
            description="Please check all the languages you would be comfortable tutoring in."
          />

          {/* availability */}
          <MultiSelect
            controlId="formAvailability"
            label="Availability"
            value={availability}
            options={[
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
              "Sunday",
            ]}
            onChange={(e) => {
              const selectedOptions = Array.from(
                e.target.selectedOptions,
                (option) => option.value
              );
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
              setReportCard(e.target.files[0]);
            }}
          />

          {/* resume */}
          <FileUpload
            controlId="formResume"
            label="Resume"
            description=""
            onChange={(e) => {
              setResume(e.target.files[0]);
            }}
          />

          {/* previous experience */}
          <TextArea
            controlId="previousExperience"
            label="Previous experience"
            description="If you have any previous experience with tutoring, or have any additional information you would like to share with us, please do so here."
            placeholder="Additional information"
            value={previousExperience}
            rows={5}
            onChange={(e) => setPreviousExperience(e.target.value)}
          />

          <Button
            variant="primary"
            size="lg"
            type="submit"
            className="w-100 form-submit-button"
          >
            Submit application
          </Button>
        </Form>
      </Container>
    </div>
  );
}
