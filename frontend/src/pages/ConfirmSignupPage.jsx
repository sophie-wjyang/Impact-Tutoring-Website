import React from "react";

// assets
import EmailConfirmationGraphic from "../assets/images/volunteer-portal/email-confirmation-graphic.svg";

// bootstrap
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";

export function ConfirmSignupPage() {
    return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
            <Container id="form-container" className="d-flex flex-column justify-content-center align-items-center">
                <Image src={EmailConfirmationGraphic} width={110} className="d-block mx-auto img-fluid" loading="lazy" />
                <h2 className="message-heading">Thank you for registering for an account with us!</h2>
                <p className="mb-3 message-description">To complete the signup process, please check your inbox for a link to confirm your account.</p>
            </Container>
        </div>
    );
}

export function ReconfirmSignupPage() {
    return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
            <Container id="form-container" className="d-flex flex-column justify-content-center align-items-center">
                <Image src={EmailConfirmationGraphic} width={120} className="d-block mx-auto img-fluid" loading="lazy" />
                <h2 className="message-heading">Looks like you've already registered for an account with us.</h2>
                <p className="mb-3 message-description">To complete the signup process, please check your inbox for a link to confirm your account.</p>
            </Container>
        </div>
    );
}
