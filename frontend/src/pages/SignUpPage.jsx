import React from "react";
import { useState } from "react";
import client from "../axios";

// bootstrap components
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import TextBox from "../components/form/TextBox";
import RadioButtons from "../components/form/RadioButtons";

export default function SignUpPage() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [userType, setUserType] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [isSignedUp, setIsSignedUp] = useState(false);
    const [error, setError] = useState("");

    // save sign up form data to database
    function saveSignUpFormData(e) {
        e.preventDefault();

        const body = {
            first_name: firstName,
            last_name: lastName,
            user_type: userType,
            email,
            password,
        };

        try {
            client
                .post("save-signup-form-data", body)
                .then((result) => {
                    console.log(result);
                    setIsSignedUp(true);
                })
                .catch((error) => {
                    console.log("Axios error");
                    setError(error.response.data.message);
                });
        } catch (error) {
            console.log("Caught error");
            setError(error.message);
        }
    }

    return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
            <Container id="form-container">
                <h2 className="form-heading">Sign Up</h2>
                <p className="mb-3 form-description">
                    Already have an account?&nbsp;
                    <a href="/log-in" className="form-link">
                        Log in.
                    </a>
                </p>

                <Form onSubmit={saveSignUpFormData}>
                    <Row>
                        <Col lg={6}>
                            <TextBox controlId={"formFirstName"} label={"First name"} placeholder={"First name"} value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                        </Col>

                        <Col lg={6}>
                            <TextBox controlId={"formLastName"} label={"Last name"} placeholder={"Last name"} value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                        </Col>
                    </Row>

                    {/* account type */}
                    <RadioButtons
                        controlId="formAccountType"
                        label="Account Type"
                        label1="Tutor"
                        id1="radio-tutor"
                        label2="Tutee"
                        id2="radio-tutee"
                        radioGroup="account-type"
                        onChange={(e) => setUserType(e.target.value)}
                    />

                    {/* email and password */}
                    <TextBox type="email" controlId="formEmail" label="Email address" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <TextBox type="password" controlId={"formPassword"} label={"Password"} placeholder={"Enter password"} value={password} onChange={(e) => setPassword(e.target.value)} required />

                    <Button variant="primary" size="lg" type="submit" className="w-100 form-submit-button">
                        Sign Up
                    </Button>
                </Form>
            </Container>
        </div>
    );
}
