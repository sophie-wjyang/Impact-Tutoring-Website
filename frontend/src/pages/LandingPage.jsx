import React, { useState, useEffect } from 'react'
import axios from 'axios'

import WhatWeDoGraphic from '../assets/images/landing-page/what-we-do-graphic.svg';
import WhoWeAreGraphic from '../assets/images/landing-page/who-we-are-graphic.svg';
import BannerGraphic from '../assets/images/landing-page/banner-graphic.svg';

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';

export default function LandingPage() {
    // const [landingTitle, setLandingTitle] = useState("");

    // useEffect(() => {
    //     // ASYNC AND AWAIT
    //     async function fetchLandingTitle() {
    //         const axiosPromise = axios.get('http://localhost:5000/landing-title')
    //         const { data } = await axiosPromise
    //         setLandingTitle(data)
    //     }

    //     void fetchLandingTitle();

    //     // CALLBACKS
    //     axios.get('http://localhost:5000/landing-title')
    //         .then(({ data }) => { setLandingTitle(data) })

    // }, [])


    return (
        <>
            {/* BANNER */}
            <Container id="banner-section">
                <Row className="flex-lg-row-reverse align-items-center g-5 py-5">
                    {/* graphic */}
                    <Col xs={10} sm={10} md={8} lg={4}>
                        <Image
                            src={BannerGraphic}
                            className="d-block mx-auto img-fluid"
                            loading="lazy"
                        />
                    </Col>

                    <Col lg={1} className="d-none d-lg-block"></Col>

                    {/* text */}
                    <Col>
                        {/* header */}
                        <h1 className="pb-2">
                            Make an impact,
                            <br>
                            </br>
                            No matter how small
                        </h1>

                        {/* description */}
                        <p className="lead pb-4">
                            Gain valuable leadership experience and earn volunteer hours through our in-person and virtual initiatives.
                        </p>

                        {/* buttons */}
                        <div className="d-grid gap-2 d-md-flex justify-content-md-start">
                            <Button size="lg" className="px-4 me-md-2 tutor-button">
                                Become a tutor
                            </Button>
                            <Button size="lg" className="px-4 tutee-button">
                                Become a tutee
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Container>

            {/* WHO WE ARE */}
            <Container id="who-we-are-section">
                <Row className="flex-lg align-items-center g-5 py-5">
                    {/* graphic */}
                    <Col xs={10} sm={10} md={8} lg={4}>
                        <Image
                            src={WhoWeAreGraphic}
                            className="d-block mx-auto img-fluid"
                            loading="lazy"
                        />
                    </Col>

                    <Col lg={1} className="d-none d-lg-block"></Col>


                    {/* text */}
                    <Col md={12} lg={7}>
                        {/* header */}
                        <h1 className="pb-2">
                            We're Impact Tutoring,
                        </h1>

                        {/* description */}
                        <p className="lead pb-4">
                            a student-founded and student-run non-profit organization. Our mission is to make education more accessible by providing free tutoring services, and more customizable by tailoring our lesson plans to each student and their learning needs.
                        </p>
                    </Col>
                </Row>
            </Container>

            {/* WHAT WE DO */}
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

            {/* CALL TO ACTION */}
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

                    <hr className="horizontal-divider d-lg-none" />

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
        </>
    )
}

