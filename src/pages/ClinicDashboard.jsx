import React, { useState, useEffect } from "react";
import {
  fetchAppointments,
  fetchAppointmentRequests,
  approveAppointmentRequest,
  declineAppointmentRequest,
} from "../API/clinicApi";
import AppointmentDetailsModal from "../components/AppointmentDetailsModal";

function ClinicDashboard() {
  const [appointments, setAppointments] = useState([]);
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState(null);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const clinicId = "recJjA7419NJAa5j9"; // Example Clinic ID, you might want to fetch this dynamically

  useEffect(() => {
    console.log("appointments", appointments);
  }, [appointments]);

  useEffect(() => {
    const loadAppointments = async () => {
      try {
        const appointmentsData = await fetchAppointments(clinicId);
        setAppointments(appointmentsData);
      } catch (error) {
        setError("Failed to fetch appointments. Please try again later.");
      }
    };

    const loadRequests = async () => {
      try {
        const requestsData = await fetchAppointmentRequests(clinicId);
        setRequests(requestsData);
      } catch (error) {
        setError(
          "Failed to fetch appointment requests. Please try again later."
        );
      }
    };

    loadAppointments();
    loadRequests();
  }, [clinicId]);

  const handleApprove = async (recordId) => {
    try {
      await approveAppointmentRequest(recordId);
      setRequests(requests.filter((request) => request.id !== recordId));
    } catch (error) {
      setError("Failed to approve the request. Please try again later.");
    }
  };

  const handleDecline = async (recordId) => {
    try {
      await declineAppointmentRequest(recordId);
      setRequests(requests.filter((request) => request.id !== recordId));
    } catch (error) {
      setError("Failed to decline the request. Please try again later.");
    }
  };

  const openModal = (appointment) => {
    setSelectedAppointment(appointment);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedAppointment(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-center text-gray-800">
          Clinic Dashboard
        </h1>
      </header>

      {error && (
        <div className="bg-red-500 text-white p-4 rounded mb-4 shadow-md">
          {error}
        </div>
      )}

      {/* Appointments Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Your Appointments
        </h2>
        <div className="bg-white shadow-lg rounded-lg p-6">
          {appointments.length > 0 ? (
            <ul>
              {appointments.map((appointment, index) => (
                <li
                  key={index}
                  className="border-b border-gray-200 py-4 flex justify-between items-center"
                >
                  <div>
                    <span className="text-lg font-medium text-gray-600">
                      {new Date(appointment.Date).toLocaleDateString()} -{" "}
                      {appointment.StartTime}
                    </span>
                    <span className="text-sm text-gray-500 block">
                      {appointment.PatientName}
                    </span>
                  </div>
                  <button
                    onClick={() => openModal(appointment)}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded transition"
                  >
                    View Details
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">No scheduled appointments.</p>
          )}
        </div>
      </section>

      {/* Appointment Details Modal */}
      <AppointmentDetailsModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        appointment={selectedAppointment}
      />

      {/* Appointment Requests Section */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Appointment Requests
        </h2>
        <div className="bg-white shadow-lg rounded-lg p-6">
          {requests.length > 0 ? (
            <ul>
              {requests.map((request, index) => (
                <li
                  key={index}
                  className="border-b border-gray-200 py-4 flex justify-between items-center"
                >
                  <div>
                    <span className="text-lg font-medium text-gray-600">
                      {request.RequestedStartTime} - {request.RequestedEndTime}
                    </span>
                    <span className="text-sm text-gray-500 block">
                      {request.PatientName}
                    </span>
                  </div>
                  <div>
                    <button
                      className="bg-green-500 hover:bg-green-600 text-white font-medium px-4 py-2 rounded mr-2 transition"
                      onClick={() => handleApprove(request.RequestId)}
                    >
                      Approve
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white font-medium px-4 py-2 rounded transition"
                      onClick={() => handleDecline(request.RequestId)}
                    >
                      Decline
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">No pending appointment requests.</p>
          )}
        </div>
      </section>
    </div>
  );
}

export default ClinicDashboard;
