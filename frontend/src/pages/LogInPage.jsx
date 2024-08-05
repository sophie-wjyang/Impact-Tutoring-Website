import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";

// bootstrap
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import TextBox from "../components/form/TextBox";
import client from "../axios";

export default function LogInPage() {
  const navigate = useNavigate();
  const { setUser } = useUser();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // check if their login credentials exist in our database
  function validateLoginFormData(event) {
    event.preventDefault(); // prevents default page reload so that the error message shows up
    setError("");

    const body = {
      email,
      password,
    };

    client
      .post("validate-login-form-data", body)
      .then(({ data }) => {
        setUser(data);

        if (data.user_status === "verified") {
          if (data.user_type === "tutor") {
            navigate("/tutor-application");
          }
          if (data.user_type === "tutee") {
            navigate("/tutee-signup-information");
          }
        } else if (data.user_status === "applied") {
          navigate("/application-applied");
        } else if (data.user_status === "rejected") {
          navigate("/application-rejected");
        } else {
          navigate("/dashboard");
        }
      })
      .catch((error) => {
        setError(error.response.data.message);
      });
  }

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <Container id="form-container" style={{ maxWidth: "36rem" }}>
        <h2 className="form-heading">Log In</h2>
        <p className="mb-3 form-description">
          Don't have an account?&nbsp;
          <a href="/sign-up" className="form-link">
            Sign up.
          </a>
        </p>

        <Form onSubmit={(e) => validateLoginFormData(e)}>
          {/* email and password */}
          <TextBox
            controlId={"formEmail"}
            label={"Email address"}
            placeholder={"Enter email"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required={true}
          />
          <TextBox
            controlId={"formPassword"}
            label={"Password"}
            placeholder={"Enter password"}
            style={{ marginBottom: 0 }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required={true}
          />

          {/* <a href="" className="d-flex justify-content-end form-link">
                        Forgot your password?
                    </a> */}
          {/* 
          {invalidLogin && (
            <p className="invalid-login-message">
              We couldn't find an account matching the email and password you
              entered. Please verify your credentials are correct, or sign up
              for an account.
            </p>
          )} */}

          {error && <p className="invalid-login-message">{error}</p>}

          <Button
            variant="primary"
            size="lg"
            type="submit"
            className="w-100 form-submit-button"
          >
            Log In
          </Button>
        </Form>
      </Container>
    </div>
  );
}
