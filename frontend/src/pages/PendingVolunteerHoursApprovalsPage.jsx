import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// bootstrap
import { Container, Table } from "react-bootstrap";
import client from "../axios";

export default function PendingVolunteerHoursApprovalsPage() {
  const [requests, setRequests] = useState([]);

  // get requests
  useEffect(() => {
    client.get("get-pending-volunteer-hours-requests").then((res) => {
      // requests goes from list of dictionaries -> array of objects
      setRequests(res.data);
    });
  }, []);

  return (
    <Container fluid>
      {/* heading */}
      <h1 className="dashboard-header">Pending volunteer hours requests</h1>

      <Container className="table-container">
        <Table className="admin-table">
          <thead>
            <tr>
              <th className="admin-table-header">
                <b>Date requested</b>
              </th>
              <th className="admin-table-header">
                <b>Requested by</b>
              </th>
              <th className="admin-table-header">
                <b>Number of hours</b>
              </th>
              <th className="admin-table-header">
                <b>Approve request</b>
              </th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request, index) => (
              <tr key={index}>
                <td className="admin-table-text">{request["dateSubmitted"]}</td>
                <td className="admin-table-text">
                  {request["tutorFirstName"]} {request["tutorLastName"]}
                </td>
                <td className="admin-table-text">{request["numHours"]}</td>
                <td className="admin-table-text">
                  <Link
                    className="admin-table-link"
                    to="volunteer-hours-approval"
                    state={{ requestID: request["requestID"] }}
                  >
                    Upload approval
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
