import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// bootstrap
import { Container, Table } from "react-bootstrap";
import client from "../axios";

export default function TutorsPage() {
  const [tutors, setTutors] = useState([]);

  // get tutors
  useEffect(() => {
    client.get("get-tutors").then((res) => {
      // tutors goes from list of dictionaries -> array of objects
      setTutors(res.data);
    });
  }, []);

  return (
    <Container fluid>
      {/* heading */}
      <h1 className="dashboard-header">Tutors</h1>

      <Container className="table-container">
        <Table className="admin-table">
          <thead>
            <tr>
              <th className="admin-table-header">
                <b>Tutor name</b>
              </th>
              <th className="admin-table-header">
                <b>Tutor details</b>
              </th>
            </tr>
          </thead>
          <tbody>
            {tutors.map((tutor, index) => (
              <tr key={index}>
                <td className="admin-table-text">
                  {tutor["firstName"]} {tutor["lastName"]}
                </td>
                <td className="admin-table-text">
                  <Link
                    className="admin-table-link"
                    to="tutor-information"
                    state={{
                      firstName: tutor["firstName"],
                      lastName: tutor["lastName"],
                      email: tutor["email"],
                      grade: tutor["grade"],
                      gender: tutor["gender"],
                      location: tutor["location"],
                      subjects: tutor["subjects"],
                      languages: tutor["languages"],
                      availability: tutor["availability"],
                      studentCapacity: tutor["studentCapacity"],
                    }}
                  >
                    See tutor profile
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
