import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useUser } from "../hooks/useUser";

// bootstrap
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import TextBox from "../components/form/TextBox";

export default function LogInPage(resetActiveKey) {
    const navigate = useNavigate();
    const { setUserType } = useUser();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [invalidLogin, setInvalidLogin] = useState(false);

    // check if their login credentials exist in our database
    function validateLoginFormData(event) {
        event.preventDefault(); // prevents default page reload so that the error message shows up

        const data = {
            email: email,
            password: password,
        };

        axios.post("http://localhost:5000/validate-login-form-data", data, { withCredentials: true }).then((res) => {
            if (res.data.message === "success") {
                setInvalidLogin(false);
                setUserType(res.data.user_type); 

                if(res.data.status === "unverified"){
                    // resend verification email
                    navigate("/reverify-signup");
                }
                else if(res.data.status === "verified"){
                    if(res.data.user_type === "tutor"){
                        navigate("/tutor-application");
                    }
                    if(res.data.user_type === "tutee"){
                        navigate("/tutee-signup-information");
                    }
                }
                else if(res.data.status === "applied"){
                    navigate("/application-applied");
                }
                else if(res.data.status === "rejected"){
                    navigate("/application-rejected");
                }
                else{
                    navigate("/dashboard");
                }
            } else {
                setInvalidLogin(true);
            }
        });
    }

    return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
            <Container id="form-container">
                <h2 className="form-heading">Log In</h2>
                <p className="mb-3 form-description">
                    Don't have an account?&nbsp;
                    <a href="/sign-up" className="form-link">
                        Sign up.
                    </a>
                </p>

                <Form onSubmit={(e) => validateLoginFormData(e)}>
                    {/* email and password */}
                    <TextBox controlId={"formEmail"} label={"Email address"} placeholder={"Enter email"} value={email} onChange={(e) => setEmail(e.target.value)} />
                    <TextBox controlId={"formPassword"} label={"Password"} placeholder={"Enter password"} style={{ marginBottom: 0 }} value={password} onChange={(e) => setPassword(e.target.value)} />

                    <a href="" className="d-flex justify-content-end form-link">
                        Forgot your password?
                    </a>

                    {invalidLogin && <p className="invalid-login-message">We couldn't find an account matching the email and password you entered. Please verify your credentials are correct, or sign up for an account.</p>}

                    <Button variant="primary" size="lg" type="submit" className="w-100 form-submit-button">
                        Log In
                    </Button>
                </Form>
            </Container>
        </div>
    );
}
