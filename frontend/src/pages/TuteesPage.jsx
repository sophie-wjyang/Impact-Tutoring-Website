import React from "react";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

// bootstrap
import { Container, Table } from "react-bootstrap";
import client from "../axios";

export default function TuteesPage() {
  const [tutees, setTutees] = useState([]);

  // get tutees
  useEffect(() => {
    client.get("get-tutees").then((res) => {
      // tutors goes from list of dictionaries -> array of objects
      setTutees(res.data);
    });
  }, []);

  return (
    <Container fluid>
      {/* heading */}
      <h1 className="dashboard-header">Tutees</h1>

      <Container className="table-container">
        <Table className="admin-table">
          <thead>
            <tr>
              <th className="admin-table-header">
                <b>Tutee name</b>
              </th>
              <th className="admin-table-header">
                <b>Tutee details</b>
              </th>
            </tr>
          </thead>
          <tbody>
            {tutees.map((tutee, index) => (
              <tr key={index}>
                <td className="admin-table-text">
                  {tutee["firstName"]} {tutee["lastName"]}
                </td>
                <td className="admin-table-text">
                  <Link
                    className="admin-table-link"
                    to="tutee-information"
                    state={{
                      firstName: tutee["firstName"],
                      lastName: tutee["lastName"],
                      email: tutee["email"],
                      grade: tutee["grade"],
                      gender: tutee["gender"],
                      location: tutee["location"],
                      subjects: tutee["subjects"],
                      languages: tutee["languages"],
                      availability: tutee["availability"],
                    }}
                  >
                    See tutee profile
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </Container>
  );
}
