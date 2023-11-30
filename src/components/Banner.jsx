import React from 'react'
import BannerPhoto from '../assets/images/landing-page/banner-graphic.svg';

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';

export default function Banner() {
    return (
        <Container>
            <Row>
                <Col md={7}>
                    <h1>
                        Make an impact, 
                        <br />
                        No matter how small
                    </h1>
                    <p>
                        Gain valuable leadership experience and earn volunteer hours through our in-person and virtual initiatives. 
                    </p>
                    <Button variant="primary">Become a tutor</Button>
                    <Button variant="primary">Become a tutee</Button>
                </Col>
                <Col md={5}>
                    <Image src={BannerPhoto} fluid/>
                </Col>
            </Row>
        </Container>
    )
}
