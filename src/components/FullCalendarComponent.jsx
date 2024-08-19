import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import {
  fetchAvailableAppointments,
  fetchApprovedAppointments,
  bookAppointment,
  fetchRequestedAppointments,
} from "../API/patientApi";
import Modal from "react-modal";
import { useAuth } from "../contexts/AuthContext";

Modal.setAppElement("#root");

function FullCalendarComponent({ clinicId }) {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const appointmentDuration = 30; // in minutes
  const patientId = user.userId;

  const loadAppointments = async () => {
    if (clinicId) {
      try {
        const availableAppointments = await fetchAvailableAppointments(
          clinicId
        );
        const approvedAppointments = await fetchApprovedAppointments(clinicId);
        const requestedAppointments = await fetchRequestedAppointments(
          clinicId
        );

        // Mark available appointments that are overlapped by approved appointments as unavailable
        const updatedAvailableAppointments = availableAppointments.filter(
          (available) =>
            !approvedAppointments.some(
              (approved) =>
                new Date(available.StartTimeDate).getTime() ===
                new Date(approved.StartTimeDate).getTime()
            )
        );

        setAppointments([
          ...updatedAvailableAppointments,
          ...approvedAppointments,
          ...requestedAppointments,
        ]);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    }
  };

  useEffect(() => {
    loadAppointments();
  }, [clinicId]); // Reload appointments when clinicId changes

  const handleDateClick = (info) => {
    const selectedDate = new Date(info.date);
    const day = selectedDate.getDay();
    const hours = selectedDate.getHours();

    const isWeekday = day >= 1 && day <= 5;
    const isWithinWorkingHours = hours >= 9 && hours < 16;

    if (isWeekday && isWithinWorkingHours) {
      setSelectedSlot(info.date);
      setIsModalOpen(true);
    } else {
      alert(
        "Please select a time within working hours (9 AM to 4 PM) on weekdays."
      );
    }
  };

  const confirmBooking = async () => {
    try {
      const newAppointment = await bookAppointment({
        clinicId: clinicId,
        patientId: patientId,
        startTime: selectedSlot,
        endTime: new Date(selectedSlot.getTime() + appointmentDuration * 60000),
      });
      setAppointments((prevAppointments) => [
        ...prevAppointments,
        newAppointment,
      ]);
      alert("Appointment booked successfully!");
    } catch (error) {
      console.error("Error booking appointment:", error);
      alert("Failed to book the appointment. Please try again.");
    }
    setIsModalOpen(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-center text-gray-900">
          Book an Appointment
        </h1>
      </header>

      <div className="max-w-5xl mx-auto">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="timeGridWeek"
          selectable={true}
          allDaySlot={false}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          events={appointments.map((appointment) => ({
            title: appointment.Status === "Approved" ? "Approved" : "Available",
            start: appointment.StartTimeDate,
            end: appointment.EndTimeDate,
            backgroundColor:
              appointment.Status === "Approved"
                ? "#ff6347" // Red color for approved appointments (not available)
                : "#28a745", // Green color for available appointments
            borderColor:
              appointment.Status === "Approved" ? "#ff6347" : "#28a745",
            textColor: "#fff",
          }))}
          dateClick={handleDateClick}
          businessHours={{
            daysOfWeek: [1, 2, 3, 4, 5],
            startTime: "09:00",
            endTime: "16:00",
          }}
          height="auto"
          eventBackgroundColor="#f5f5f5"
          eventBorderColor="#ccc"
        />
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Confirm Booking"
        className="bg-white p-8 rounded-lg shadow-lg max-w-md mx-auto relative z-50"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-40"
      >
        {selectedSlot && (
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              Confirm Your Appointment
            </h2>
            <p className="mb-4 text-gray-700">
              You selected the following time slot:
            </p>
            <p className="text-lg font-medium text-gray-900">
              {selectedSlot.toLocaleString()} -{" "}
              {new Date(
                selectedSlot.getTime() + appointmentDuration * 60000
              ).toLocaleString()}
            </p>
            <div className="mt-6 flex justify-between">
              <button
                onClick={confirmBooking}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded transition"
              >
                Confirm
              </button>
              <button
                onClick={closeModal}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded transition"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default FullCalendarComponent;
