import React, { useState, useEffect } from "react";
import Airtable from "airtable";

const base = new Airtable({ apiKey: "YOUR_AIRTABLE_API_KEY" }).base(
  "YOUR_BASE_ID"
);

function AppointmentRequests({ clinicId }) {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = () => {
    base("AppointmentRequests")
      .select({
        filterByFormula: `{clinicId} = '${clinicId}' AND {status} = 'pending'`,
        sort: [{ field: "requestedDate", direction: "asc" }],
      })
      .eachPage((records, fetchNextPage) => {
        const fetchedRequests = records.map((record) => ({
          id: record.id,
          ...record.fields,
        }));
        setRequests(fetchedRequests);
        fetchNextPage();
      });
  };

  const handleApproval = (requestId, status) => {
    base("AppointmentRequests").update(
      requestId,
      {
        status: status,
      },
      (err) => {
        if (err) {
          console.error(err);
          return;
        }
        fetchRequests();
      }
    );
  };

  return (
    <div className="appointment-requests">
      <h2>Appointment Requests</h2>
      <ul>
        {requests.map((request) => (
          <li key={request.id}>
            <div>
              <strong>Requested Date:</strong> {request.requestedDate}
            </div>
            <div>
              <strong>Time:</strong> {request.requestedStartTime} -{" "}
              {request.requestedEndTime}
            </div>
            <div>
              <strong>Patient:</strong> {request.patientName}
            </div>
            <button onClick={() => handleApproval(request.id, "approved")}>
              Approve
            </button>
            <button onClick={() => handleApproval(request.id, "declined")}>
              Decline
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AppointmentRequests;
