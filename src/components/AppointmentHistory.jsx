import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { fetchCompletedAppointments } from "../API/patientApi";
import AppointmentCard from "./AppointmentCard";
import AppointmentDetailsModal from "../components/AppointmentDetailsModal";

function AppointmentHistory() {
  const { user } = useAuth();
  const patientId = "recGys7slH9ZmHaSp";

  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const completedAppointments = await fetchCompletedAppointments(
          patientId
        );
        setAppointments(completedAppointments);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchAppointments();
  }, [patientId]);

  const openModal = (appointment) => {
    setSelectedAppointment(appointment);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedAppointment(null);
  };

  return (
    <div className="w-full">
      <h2>Your Completed Appointments</h2>
      {appointments.length > 0 ? (
        <div className="space-y-4 w-full">
          {appointments.map((appointment, index) => (
            <AppointmentCard
              key={index}
              date={appointment.Date}
              time={`${appointment.StartTime} - ${appointment.EndTime}`}
              patientName={user.displayName}
              onViewDetails={() => openModal(appointment)}
            />
          ))}
        </div>
      ) : (
        <p>No completed appointments found.</p>
      )}

      {/* Appointment Details Modal */}
      <AppointmentDetailsModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        appointment={selectedAppointment}
      />
    </div>
  );
}

export default AppointmentHistory;
