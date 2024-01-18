import React, { useState, useEffect } from 'react'

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

function SignUpPage() {
    return (
        <div className="d-flex justify-content-center align-items-center">
            <Container id="signup-container">
                <h2 className="signup-heading">Sign Up</h2>
                <p className="mb-3 signup-description">
                    Already have an account?&nbsp;
                    <a href="" className="form-link">Log in.</a>
                </p>

                <Form>
                    <Row>
                        <Col lg={6}>
                            <Form.Group className="mb-3" controlId="formFirstName">
                                <Form.Label>First name</Form.Label>
                                <Form.Control type="text" placeholder="First name" />
                            </Form.Group>
                        </Col>

                        <Col lg={6}>
                            <Form.Group className="mb-3" controlId="formLastName">
                                <Form.Label>Last name</Form.Label>
                                <Form.Control type="text" placeholder="Last name" />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Form.Group className="mb-3" controlId="formFirstName">
                        <Form.Label>Account type</Form.Label>
                        <div>
                            <Form.Check
                                type="radio"
                                label="Tutor"
                                id="tutor-radio"
                                name="account-type"
                                inline
                            />
                            <Form.Check
                                type="radio"
                                label="Tutee"
                                id="tutee-radio"
                                name="account-type"
                                inline
                            />
                        </div>
                    </Form.Group>

                    <Col>
                        <Form.Group className="mb-3" controlId="formEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="text" placeholder="Enter email" />
                        </Form.Group>
                    </Col>

                    <Col>
                        <Form.Group className="mb-3" controlId="formPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="text" placeholder="Enter password" />
                        </Form.Group>
                    </Col>


                    <Button variant="primary" size="lg" type="submit" className="w-100 signup-button">
                        Sign Up
                    </Button>
                </Form>
            </Container>
        </div>
    );
}

export default SignUpPage;