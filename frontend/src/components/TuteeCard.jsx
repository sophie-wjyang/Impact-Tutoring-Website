import React from 'react'

// bootstrap
import { Container, Row, Col, Table, Image, Button } from "react-bootstrap";

export default function TuteeCard() {
  return (
    <Container fluid className="tutee-card">
        <h2 className="tutee-name">Gloria Li</h2>

        <div className="tutee-information">
            <p><span>Email:</span> gloriali@gmail.com</p>
            <p><span>Grade:</span> 12</p>
            <p><span>Subjects:</span> Grade 12 math</p>
            <p><span>Languages:</span> English, Mandarin</p>
            <p><span>Availability:</span> Monday, Tuesday, Thursday</p>
        </div>

        <Button size="lg" className="tutoring-history-button">
            See tutoring history
        </Button>
    </Container>
  )
}
