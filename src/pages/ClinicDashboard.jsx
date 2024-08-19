import React, { useState, useEffect } from "react";
import {
  fetchApprovedAppointments,
  fetchAppointmentRequests,
  approveAppointmentRequest,
  declineAppointmentRequest,
} from "../API/clinicApi";
import AppointmentDetailsModal from "../components/AppointmentDetailsModal";
import AppointmentCard from "../components/AppointmentCard";
import LogOut from "../components/LogOut";
import { useAuth } from "../contexts/AuthContext";

function ClinicDashboard() {
  const [appointments, setAppointments] = useState([]);
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState(null);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { logout } = useAuth();
  const clinicId = "recJjA7419NJAa5j9";

  useEffect(() => {
    const loadApprovedAppointments = async () => {
      try {
        const appointmentsData = await fetchApprovedAppointments(clinicId);
        setAppointments(appointmentsData);
      } catch (error) {
        setError(
          "Failed to fetch approved appointments. Please try again later."
        );
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

    loadApprovedAppointments();
    loadRequests();
  }, [clinicId]);

  const handleApprove = async (appointmentId) => {
    try {
      await approveAppointmentRequest(appointmentId);
      setRequests(
        requests.filter((request) => request.AppointmentId !== appointmentId)
      );

      setAppointments([
        ...appointments,
        {
          ...appointments.find((app) => app.AppointmentId === appointmentId),
          Status: "Approved",
        },
      ]);
    } catch (error) {
      setError("Failed to approve the request. Please try again later.");
    }
  };

  const handleDecline = async (appointmentId) => {
    try {
      await declineAppointmentRequest(appointmentId);
      setRequests(
        requests.filter((request) => request.AppointmentId !== appointmentId)
      );
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
    <div className="min-h-screen bg-gray-50 p-8 relative">
      <header className="mb-8 flex justify-between items-center">
        <h1 className="text-4xl font-bold text-gray-800">Clinic Dashboard</h1>
        <LogOut />
      </header>

      {error && (
        <div className="bg-red-500 text-white p-4 rounded mb-4 shadow-md">
          {error}
        </div>
      )}

      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Your Appointments
        </h2>
        <div className="bg-white shadow-lg rounded-lg p-6">
          {appointments.length > 0 ? (
            <ul>
              {appointments.map((appointment, index) => (
                <li
                  key={`${appointment.AppointmentId}-${index}`}
                  className="border-b border-gray-200 py-4 flex justify-between items-center"
                >
                  <AppointmentCard
                    date={new Date(appointment.Date).toLocaleDateString()}
                    time={`${appointment.StartTime} - ${appointment.EndTime}`}
                    patientName={
                      appointment.patientInfo?.Name || "Unknown Patient"
                    }
                    onViewDetails={() => openModal(appointment)}
                  />
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">No scheduled appointments.</p>
          )}
        </div>
      </section>

      <AppointmentDetailsModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        appointment={selectedAppointment}
      />

      <section>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Appointment Requests
        </h2>
        <div className="bg-white shadow-lg rounded-lg p-6">
          {requests.length > 0 ? (
            <ul>
              {requests.map((request) => (
                <li
                  key={request.AppointmentId}
                  className="border-b border-gray-200 py-4 flex justify-between items-center"
                >
                  <AppointmentCard
                    date={new Date(request.Date).toLocaleDateString()}
                    time={`${request.StartTime} - ${request.EndTime}`}
                    patientName={request.patientInfo?.Name || "Unknown Patient"}
                    onApprove={() => handleApprove(request.AppointmentId)}
                    onDecline={() => handleDecline(request.AppointmentId)}
                  />
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
