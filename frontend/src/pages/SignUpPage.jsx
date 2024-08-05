import React from "react";
import { useState } from "react";
import client from "../axios";

import EmailConfirmationGraphic from "../assets/images/signup-process/email-confirmation-graphic.svg";

// bootstrap components
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
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
    setError("");

    const body = {
      first_name: firstName,
      last_name: lastName,
      user_type: userType,
      email,
      password,
    };

    client
      .post("save-signup-form-data", body)
      .then((result) => {
        console.log(result);
        setIsSignedUp(true);
      })
      .catch((error) => {
        setError(error.response.data.message);
      });
  }

  return isSignedUp ? (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <Container
        id="form-container"
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ maxWidth: "36rem" }}
      >
        <Image
          src={EmailConfirmationGraphic}
          width={120}
          className="d-block mx-auto img-fluid"
          loading="lazy"
        />
        <h2 className="message-heading">
          Thank you for registering for an account with us!
        </h2>

        <p className="mb-3 message-description">
          To complete the signup process, please check your inbox for a link to
          confirm your account. You may close this window.
        </p>
      </Container>
    </div>
  ) : (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <Container id="form-container" style={{ maxWidth: "36rem" }}>
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
              <TextBox
                controlId={"formFirstName"}
                label={"First name"}
                placeholder={"First name"}
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </Col>

            <Col lg={6}>
              <TextBox
                controlId={"formLastName"}
                label={"Last name"}
                placeholder={"Last name"}
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </Col>
          </Row>

          {/* account type */}
          <RadioButtons
            controlId="formAccountType"
            label="Account Type"
            options={[
              { label: "Tutor", id: "radio-tutor", value: "tutor" },
              { label: "Tutee", id: "radio-tutee", value: "tutee" },
            ]}
            radioGroup="account-type"
            onChange={(e) => setUserType(e.target.value)}
          />

          {/* email and password */}
          <TextBox
            type="email"
            controlId="formEmail"
            label="Email address"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextBox
            type="password"
            controlId={"formPassword"}
            label={"Password"}
            placeholder={"Enter password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <p className="invalid-login-message">{error}</p>}

          <Button
            variant="primary"
            size="lg"
            type="submit"
            className="w-100 form-submit-button"
          >
            Sign Up
          </Button>
        </Form>
      </Container>
    </div>
  );
}
