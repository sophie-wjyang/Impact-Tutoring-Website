import React from 'react'
import BannerPhoto from '../assets/images/landing-page/banner-graphic.svg';

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';

export default function Banner() {
    return (
        <Container id="banner-section">
            <Row className="flex-lg-row-reverse align-items-center g-5 py-5">
                {/* graphic */}
                <Col xs={10} sm={10} md={8} lg={4}>
                    <Image
                        src={BannerPhoto}
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
                        <br />
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
    )
}
