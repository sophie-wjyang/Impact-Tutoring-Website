import React from "react";

// assets
import ApplicationStatusGraphic from "../assets/images/signup-process/application-status.svg";

// bootstrap
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";

export function ApplicationStatus(props) {
    const status = props;

    return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
            <Container id="form-container" className="d-flex flex-column justify-content-center align-items-center">
                <Image src={ApplicationStatusGraphic} width={150} className="d-block mx-auto img-fluid" loading="lazy" />
                <h2 className="message-heading">Thank you for applying to be a tutor with us!</h2>
                {status === "applied" && (
                    <p className="mb-3 message-description">We are currently processing your application. If you haven't heard back from us within 2 weeks of your application, please email us at impacttutoringca@gmail.com</p>
                )}

                {status === "rejected" && (
                    <p className="mb-3 message-description">Unfortunately, it looks like your application was denied. We encourage you to apply again in the future, and if you have any inquiries, please email us at impacttutoringca@gmail.com</p>
                )}

            </Container>
        </div>
    );
}
