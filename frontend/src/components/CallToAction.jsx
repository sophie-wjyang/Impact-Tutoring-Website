import React from 'react'
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

export default function CallToAction() {
    return (
        <Container id="call-to-action-section">
            <Row> 
                <Col xs={12} sm={12} lg={6} className="mx-auto text-center tutor-section">
                    <h1>Become a tutor</h1>
                    <p className="call-to-action pb-4">
                        Gain valuable leadership and teamwork skills, earn volunteer hours, and give back to your community.
                    </p>

                    <Button size="lg" className="tutor-button">
                        Become a tutor
                    </Button>
                </Col>

                <hr className="horizontal-divider d-lg-none"/>

                <Col xs={12} sm={12} lg={6} className="mx-auto text-center">
                    <h1>Become a tutee</h1>
                    <p className="call-to-action pb-4">
                    Receive personalized lesson plans, designed just for you, to help with schoolwork, personal learning, and more.
                    </p>

                    <Button size="lg" className="tutee-button">
                        Become a tutee
                    </Button>
                </Col>
            </Row>
        </Container>
    )
}
