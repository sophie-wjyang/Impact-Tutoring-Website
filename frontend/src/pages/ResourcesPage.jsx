import React from "react";

// images
import KhanAcademyImage from "../assets/images/resources-page/khan-academy.png";
import EducationImage from "../assets/images/resources-page/education.webp";

// pages

// bootstrap
import { Container, Row, Col, Card, Button } from "react-bootstrap";

export function ResourcesPageTutor() {
  return (
    <Container fluid>
      {/* heading */}
      <h1 className="dashboard-header">Resources</h1>

      {/* impact tutoring */}
      <div className="resource-section">
        <h3 className="resources-header">Impact tutoring</h3>

        <Row xs={1} sm={2} lg={3} className="g-4">
          <Col>
            <Card className="resource-card">
              <Card.Img
                variant="top"
                src={KhanAcademyImage}
                className="resource-card-image"
              />
              <Card.Body className="resource-card-body">
                <Card.Title className="resource-card-title">
                  Tutor onboarding package
                </Card.Title>
                <Card.Text className="resource-card-text">
                  A quick onboarding pdf that will run you through the matching
                  process, lesson plans, sessions, and more.{" "}
                </Card.Text>
                <Button className="resource-card-button">Visit site</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card className="resource-card">
              <Card.Img
                variant="top"
                src={EducationImage}
                className="resource-card-image"
              />
              <Card.Body className="resource-card-body">
                <Card.Title className="resource-card-title">
                  Tutor onboarding package
                </Card.Title>
                <Card.Text className="resource-card-text">
                  A quick onboarding pdf that will run you through the matching
                  process, lesson plans, sessions, and more.{" "}
                </Card.Text>
                <Button className="resource-card-button">Visit site</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card className="resource-card">
              <Card.Img
                variant="top"
                src={KhanAcademyImage}
                className="resource-card-image"
              />
              <Card.Body className="resource-card-body">
                <Card.Title className="resource-card-title">
                  Tutor onboarding package
                </Card.Title>
                <Card.Text className="resource-card-text">
                  A quick onboarding pdf that will run you through the matching
                  process, lesson plans, sessions, and more.{" "}
                </Card.Text>
                <Button className="resource-card-button">Visit site</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>

      {/* being a tutor */}
      <div className="resource-section">
        <h3 className="resources-header">Being a tutor</h3>

        <Row xs={1} sm={2} lg={3} className="g-4">
          <Col>
            <Card className="resource-card">
              <Card.Img
                variant="top"
                src={KhanAcademyImage}
                className="resource-card-image"
              />
              <Card.Body className="resource-card-body">
                <Card.Title className="resource-card-title">
                  Tutor onboarding package
                </Card.Title>
                <Card.Text className="resource-card-text">
                  A quick onboarding pdf that will run you through the matching
                  process, lesson plans, sessions, and more.{" "}
                </Card.Text>
                <Button className="resource-card-button">Visit site</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card className="resource-card">
              <Card.Img
                variant="top"
                src={EducationImage}
                className="resource-card-image"
              />
              <Card.Body className="resource-card-body">
                <Card.Title className="resource-card-title">
                  Tutor onboarding package
                </Card.Title>
                <Card.Text className="resource-card-text">
                  A quick onboarding pdf that will run you through the matching
                  process, lesson plans, sessions, and more.{" "}
                </Card.Text>
                <Button className="resource-card-button">Visit site</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card className="resource-card">
              <Card.Img
                variant="top"
                src={KhanAcademyImage}
                className="resource-card-image"
              />
              <Card.Body className="resource-card-body">
                <Card.Title className="resource-card-title">
                  Tutor onboarding package
                </Card.Title>
                <Card.Text className="resource-card-text">
                  A quick onboarding pdf that will run you through the matching
                  process, lesson plans, sessions, and more.{" "}
                </Card.Text>
                <Button className="resource-card-button">Visit site</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>

      {/* tools and platforms */}
      <div className="resource-section">
        <h3 className="resources-header">Helpful tools and platforms</h3>

        <Row xs={1} sm={2} lg={3} className="g-4">
          <Col>
            <Card className="resource-card">
              <Card.Img
                variant="top"
                src={KhanAcademyImage}
                className="resource-card-image"
              />
              <Card.Body className="resource-card-body">
                <Card.Title className="resource-card-title">
                  Tutor onboarding package
                </Card.Title>
                <Card.Text className="resource-card-text">
                  A quick onboarding pdf that will run you through the matching
                  process, lesson plans, sessions, and more.{" "}
                </Card.Text>
                <Button className="resource-card-button">Visit site</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card className="resource-card">
              <Card.Img
                variant="top"
                src={EducationImage}
                className="resource-card-image"
              />
              <Card.Body className="resource-card-body">
                <Card.Title className="resource-card-title">
                  Tutor onboarding package
                </Card.Title>
                <Card.Text className="resource-card-text">
                  A quick onboarding pdf that will run you through the matching
                  process, lesson plans, sessions, and more.{" "}
                </Card.Text>
                <Button className="resource-card-button">Visit site</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card className="resource-card">
              <Card.Img
                variant="top"
                src={KhanAcademyImage}
                className="resource-card-image"
              />
              <Card.Body className="resource-card-body">
                <Card.Title className="resource-card-title">
                  Tutor onboarding package
                </Card.Title>
                <Card.Text className="resource-card-text">
                  A quick onboarding pdf that will run you through the matching
                  process, lesson plans, sessions, and more.{" "}
                </Card.Text>
                <Button className="resource-card-button">Visit site</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>

      {/* courses */}
      <div className="resource-section">
        <h3 className="resources-header">Courses</h3>

        <Row xs={1} sm={2} lg={3} className="g-4">
          <Col>
            <Card className="resource-card">
              <Card.Img
                variant="top"
                src={KhanAcademyImage}
                className="resource-card-image"
              />
              <Card.Body className="resource-card-body">
                <Card.Title className="resource-card-title">
                  Tutor onboarding package
                </Card.Title>
                <Card.Text className="resource-card-text">
                  A quick onboarding pdf that will run you through the matching
                  process, lesson plans, sessions, and more.{" "}
                </Card.Text>
                <Button className="resource-card-button">Visit site</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card className="resource-card">
              <Card.Img
                variant="top"
                src={EducationImage}
                className="resource-card-image"
              />
              <Card.Body className="resource-card-body">
                <Card.Title className="resource-card-title">
                  Tutor onboarding package
                </Card.Title>
                <Card.Text className="resource-card-text">
                  A quick onboarding pdf that will run you through the matching
                  process, lesson plans, sessions, and more.{" "}
                </Card.Text>
                <Button className="resource-card-button">Visit site</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card className="resource-card">
              <Card.Img
                variant="top"
                src={KhanAcademyImage}
                className="resource-card-image"
              />
              <Card.Body className="resource-card-body">
                <Card.Title className="resource-card-title">
                  Tutor onboarding package
                </Card.Title>
                <Card.Text className="resource-card-text">
                  A quick onboarding pdf that will run you through the matching
                  process, lesson plans, sessions, and more.{" "}
                </Card.Text>
                <Button className="resource-card-button">Visit site</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </Container>
  );
}

export function ResourcesPageTutee() {
  return (
    <Container fluid>
      {/* heading */}
      <h1 className="dashboard-header">Resources</h1>

      {/* impact tutoring */}
      <div className="resource-section">
        <h3 className="resources-header">Impact tutoring</h3>

        <Row xs={1} sm={2} lg={3} className="g-4">
          <Col>
            <Card className="resource-card">
              <Card.Img
                variant="top"
                src={KhanAcademyImage}
                className="resource-card-image"
              />
              <Card.Body className="resource-card-body">
                <Card.Title className="resource-card-title">
                  Tutor onboarding package
                </Card.Title>
                <Card.Text className="resource-card-text">
                  A quick onboarding pdf that will run you through the matching
                  process, lesson plans, sessions, and more.{" "}
                </Card.Text>
                <Button className="resource-card-button">Visit site</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card className="resource-card">
              <Card.Img
                variant="top"
                src={EducationImage}
                className="resource-card-image"
              />
              <Card.Body className="resource-card-body">
                <Card.Title className="resource-card-title">
                  Tutor onboarding package
                </Card.Title>
                <Card.Text className="resource-card-text">
                  A quick onboarding pdf that will run you through the matching
                  process, lesson plans, sessions, and more.{" "}
                </Card.Text>
                <Button className="resource-card-button">Visit site</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card className="resource-card">
              <Card.Img
                variant="top"
                src={KhanAcademyImage}
                className="resource-card-image"
              />
              <Card.Body className="resource-card-body">
                <Card.Title className="resource-card-title">
                  Tutor onboarding package
                </Card.Title>
                <Card.Text className="resource-card-text">
                  A quick onboarding pdf that will run you through the matching
                  process, lesson plans, sessions, and more.{" "}
                </Card.Text>
                <Button className="resource-card-button">Visit site</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>

      {/* being a tutor */}
      <div className="resource-section">
        <h3 className="resources-header">Being a tutor</h3>

        <Row xs={1} sm={2} lg={3} className="g-4">
          <Col>
            <Card className="resource-card">
              <Card.Img
                variant="top"
                src={KhanAcademyImage}
                className="resource-card-image"
              />
              <Card.Body className="resource-card-body">
                <Card.Title className="resource-card-title">
                  Tutor onboarding package
                </Card.Title>
                <Card.Text className="resource-card-text">
                  A quick onboarding pdf that will run you through the matching
                  process, lesson plans, sessions, and more.{" "}
                </Card.Text>
                <Button className="resource-card-button">Visit site</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card className="resource-card">
              <Card.Img
                variant="top"
                src={EducationImage}
                className="resource-card-image"
              />
              <Card.Body className="resource-card-body">
                <Card.Title className="resource-card-title">
                  Tutor onboarding package
                </Card.Title>
                <Card.Text className="resource-card-text">
                  A quick onboarding pdf that will run you through the matching
                  process, lesson plans, sessions, and more.{" "}
                </Card.Text>
                <Button className="resource-card-button">Visit site</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card className="resource-card">
              <Card.Img
                variant="top"
                src={KhanAcademyImage}
                className="resource-card-image"
              />
              <Card.Body className="resource-card-body">
                <Card.Title className="resource-card-title">
                  Tutor onboarding package
                </Card.Title>
                <Card.Text className="resource-card-text">
                  A quick onboarding pdf that will run you through the matching
                  process, lesson plans, sessions, and more.{" "}
                </Card.Text>
                <Button className="resource-card-button">Visit site</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>

      {/* tools and platforms */}
      <div className="resource-section">
        <h3 className="resources-header">Helpful tools and platforms</h3>

        <Row xs={1} sm={2} lg={3} className="g-4">
          <Col>
            <Card className="resource-card">
              <Card.Img
                variant="top"
                src={KhanAcademyImage}
                className="resource-card-image"
              />
              <Card.Body className="resource-card-body">
                <Card.Title className="resource-card-title">
                  Tutor onboarding package
                </Card.Title>
                <Card.Text className="resource-card-text">
                  A quick onboarding pdf that will run you through the matching
                  process, lesson plans, sessions, and more.{" "}
                </Card.Text>
                <Button className="resource-card-button">Visit site</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card className="resource-card">
              <Card.Img
                variant="top"
                src={EducationImage}
                className="resource-card-image"
              />
              <Card.Body className="resource-card-body">
                <Card.Title className="resource-card-title">
                  Tutor onboarding package
                </Card.Title>
                <Card.Text className="resource-card-text">
                  A quick onboarding pdf that will run you through the matching
                  process, lesson plans, sessions, and more.{" "}
                </Card.Text>
                <Button className="resource-card-button">Visit site</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card className="resource-card">
              <Card.Img
                variant="top"
                src={KhanAcademyImage}
                className="resource-card-image"
              />
              <Card.Body className="resource-card-body">
                <Card.Title className="resource-card-title">
                  Tutor onboarding package
                </Card.Title>
                <Card.Text className="resource-card-text">
                  A quick onboarding pdf that will run you through the matching
                  process, lesson plans, sessions, and more.{" "}
                </Card.Text>
                <Button className="resource-card-button">Visit site</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>

      {/* courses */}
      <div className="resource-section">
        <h3 className="resources-header">Courses</h3>

        <Row xs={1} sm={2} lg={3} className="g-4">
          <Col>
            <Card className="resource-card">
              <Card.Img
                variant="top"
                src={KhanAcademyImage}
                className="resource-card-image"
              />
              <Card.Body className="resource-card-body">
                <Card.Title className="resource-card-title">
                  Tutor onboarding package
                </Card.Title>
                <Card.Text className="resource-card-text">
                  A quick onboarding pdf that will run you through the matching
                  process, lesson plans, sessions, and more.{" "}
                </Card.Text>
                <Button className="resource-card-button">Visit site</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card className="resource-card">
              <Card.Img
                variant="top"
                src={EducationImage}
                className="resource-card-image"
              />
              <Card.Body className="resource-card-body">
                <Card.Title className="resource-card-title">
                  Tutor onboarding package
                </Card.Title>
                <Card.Text className="resource-card-text">
                  A quick onboarding pdf that will run you through the matching
                  process, lesson plans, sessions, and more.{" "}
                </Card.Text>
                <Button className="resource-card-button">Visit site</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card className="resource-card">
              <Card.Img
                variant="top"
                src={KhanAcademyImage}
                className="resource-card-image"
              />
              <Card.Body className="resource-card-body">
                <Card.Title className="resource-card-title">
                  Tutor onboarding package
                </Card.Title>
                <Card.Text className="resource-card-text">
                  A quick onboarding pdf that will run you through the matching
                  process, lesson plans, sessions, and more.{" "}
                </Card.Text>
                <Button className="resource-card-button">Visit site</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </Container>
  );
}
