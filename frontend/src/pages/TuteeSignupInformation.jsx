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
import MultiSelect from "../components/form/MultiSelect";
import client from "../axios";

export default function TuteeSignupInformation() {
  const [grade, setGrade] = useState("");
  const [gender, setGender] = useState("");
  const [location, setLocation] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [availability, setAvailability] = useState([]);
  const [additionalInformation, setAdditionalInformation] = useState("");

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

  function saveTuteeSignupData(event) {
    // save data to database
    event.preventDefault();

    const data = {
      grade: grade,
      gender: gender,
      location: location,
      subjects: subjects,
      languages: languages,
      availability: availability,
      additionalInformation: additionalInformation,
    };

    client.post("save-tutee-signup-data", data);
  }

  return (
    <div className="d-flex justify-content-center align-items-center">
      <Container id="form-container">
        <h2 className="form-heading">Please fill out your information</h2>
        <p className="mb-4 form-description">
          Thank you for making an account with us! Please fill out the following
          fields to become a tutee with Impact Tutoring. If you have any
          questions, please contact us at impacttutoringca@gmail.com.
        </p>

        <Form
          onSubmit={(e) => {
            saveTuteeSignupData(e);
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
            description="Please check all the subjects you would like to be tutored in."
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
            description="Please check all the languages you would be comfortable being tutored in."
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
            description="Please check all the days you would be available to receive tutoring."
          />

          {/* additional information */}
          <TextArea
            controlId="additionalInformation"
            label="Additional information"
            description="If there's any additional information you would like to share with us, please do so here."
            placeholder="Additional information"
            value={additionalInformation}
            rows={5}
            onChange={(e) => setAdditionalInformation(e.target.value)}
          />

          <Button
            variant="primary"
            size="lg"
            type="submit"
            className="w-100 form-submit-button"
          >
            Submit form
          </Button>
        </Form>
      </Container>
    </div>
  );
}
