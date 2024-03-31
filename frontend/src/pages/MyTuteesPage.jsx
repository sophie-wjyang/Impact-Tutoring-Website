import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

// pages
import TuteeCard from "../components/TuteeCard";

// bootstrap
import { Container, Row, Col, Table, Image } from "react-bootstrap";

export default function MyTutees() {
    // array of tutees taught by the current tutor
    // each tutee is an object
    const [tutees, setTutees] = useState([]);

    // get all relevant profile information on component render
    useEffect(() => {
        axios.get("http://localhost:5000/get-tutees", { withCredentials: true }).then((res) => {
            setTutees(res.data);
        });
    }, []);

    return (
        <Container fluid>
            {/* heading */}
            <h1 className="dashboard-header">My Tutees</h1>

            {/* tutees */}
            <Row>
                {tutees.map((tutee, index) => (
                    <Col key={index} xs={12} md={6}>
                        <TuteeCard firstName={tutee[0]} lastName={tutee[1]} email={tutee[2]} grade={tutee[3]} languages={tutee[4]} availability={tutee[5]} subjects={tutee[6]} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
}
