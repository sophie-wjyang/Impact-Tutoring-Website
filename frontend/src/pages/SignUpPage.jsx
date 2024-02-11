// bootstrap
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import TextBox from '../components/form/TextBox';
import RadioButtons from '../components/form/RadioButtons';

export default function SignUpPage() {
    return (
        <div className="d-flex justify-content-center align-items-center">
            <Container id="form-container">
                <h2 className="form-heading">Sign Up</h2>
                <p className="mb-3 form-description">
                    Already have an account?&nbsp;
                    <a href="" className="form-link">Log in.</a>
                </p>

                <Form>
                    {/* first and last name */}
                    <Row>
                        <Col lg={6}>
                            <TextBox controlId={"formFirstName"} label={"First name"} placeholder={"First name"} />
                        </Col>

                        <Col lg={6}>
                            <TextBox controlId={"formLastName"} label={"Last name"} placeholder={"Last name"} />
                        </Col>
                    </Row>

                    {/* account type */}
                    <RadioButtons controlId={"formAccountType"} label={"Account Type"} label1={"Tutor"} id1={"radio-tutor"} label2={"Tutee"} id2={"radio-tutee"} radioGroup={"account-type"}/>

                    {/* email and password */}
                    <TextBox controlId={"formEmail"} label={"Email address"} placeholder={"Enter email"} />
                    <TextBox controlId={"formPassword"} label={"Password"} placeholder={"Enter password"} />

                    <Button variant="primary" size="lg" type="submit" className="w-100 form-submit-button">
                        Sign Up
                    </Button>
                </Form>
            </Container>
        </div>
    );
}

