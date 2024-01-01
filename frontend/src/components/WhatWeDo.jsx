import React from 'react'
import WhatWeDoGraphic from '../assets/images/landing-page/what-we-do-graphic.svg';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';

export default function WhatWeDo() {
  return (
    <Container id="what-we-do-section">
        <Row className="flex-lg-row-reverse align-items-center g-5 py-5">
            {/* graphic */}
            <Col xs={10} sm={10} md={8} lg={4}>
                <Image
                    src={WhatWeDoGraphic}
                    className="d-block mx-auto img-fluid"
                    loading="lazy"
                />
            </Col>

            <Col lg={1} className="d-none d-lg-block"></Col>


            {/* text */}
            <Col md={12} lg={7}>
                {/* header */}
                <h1 className="pb-2">
                    What We Do
                </h1>

                {/* description */}
                <p className="lead pb-4">
                    a student-founded and student-run non-profit organization. Our mission is to make education more accessible by providing free tutoring services, and more customizable by tailoring our lesson plans to each student and their learning needs.
                </p>
            </Col>
        </Row>
    </Container>
  )
}
