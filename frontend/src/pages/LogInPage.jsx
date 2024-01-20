import React, { useState, useEffect } from 'react'

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import TextBox from '../components/form/TextBox';

export default function LogInPage() {
    return (
        <div className="d-flex justify-content-center align-items-center">
            <Container id="form-container">
                <h2 className="form-heading">Log In</h2>
                <p className="mb-3 form-description">
                    Don't have an account?&nbsp;
                    <a href="" className="form-link">Sign up.</a>
                </p>

                <Form>
                    {/* email and password */}
                    <TextBox controlId={"formEmail"} label={"Email address"} placeholder={"Enter email"} />
                    <TextBox controlId={"formPassword"} label={"Password"} placeholder={"Enter password"} style={{ marginBottom: 0 }} />

                    <a href="" className="d-flex justify-content-end form-link">Forgot your password?</a>

                    <Button variant="primary" size="lg" type="submit" className="w-100 form-submit-button">
                        Log In
                    </Button>
                </Form>
            </Container>
        </div>
    );
}

