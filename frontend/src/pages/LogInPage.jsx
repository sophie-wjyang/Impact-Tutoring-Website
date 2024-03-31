import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// bootstrap
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import TextBox from '../components/form/TextBox';

export default function LogInPage(resetActiveKey) {    
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [invalidLogin, setInvalidLogin] = useState(false);

    // check if their login credentials exist in our database
    function validateLoginFormData(event){
        event.preventDefault(); // prevents default page reload

        const data = {
            email: email,
            password: password
        }

        axios.post("http://localhost:5000/validate-login-form-data", data, { withCredentials: true })
            .then((res) => {
                if(res.data.message === "success"){
                    setInvalidLogin(false);
                    navigate("/dashboard");
                }
                else{
                    console.log("Invalid login credentials")
                    setInvalidLogin(true);
                }
            })
    }

    return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
            <Container id="form-container">
                <h2 className="form-heading">Log In</h2>
                <p className="mb-3 form-description">
                    Don't have an account?&nbsp;
                    <a href="/signup" className="form-link">Sign up.</a>
                </p>

                <Form onSubmit={(e) => validateLoginFormData(e)}>
                    {/* email and password */}
                    <TextBox controlId={"formEmail"} label={"Email address"} placeholder={"Enter email"} value={email} onChange={(e) => setEmail(e.target.value)}/>
                    <TextBox controlId={"formPassword"} label={"Password"} placeholder={"Enter password"} style={{ marginBottom: 0 }} value={password} onChange={(e) => setPassword(e.target.value)}/>

                    <a href="" className="d-flex justify-content-end form-link">Forgot your password?</a>

                    {invalidLogin && <p className="invalid-login-message">We couldn't find an account matching the email and password you entered. Please try again.</p>}

                    <Button variant="primary" size="lg" type="submit" className="w-100 form-submit-button">
                        Log In
                    </Button>
                </Form>
            </Container>
        </div>
    );
}


