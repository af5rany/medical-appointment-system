import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { fetchAvailableAppointments, bookAppointment } from "../API/patientApi";
import Modal from "react-modal";

Modal.setAppElement("#root"); // For accessibility

function FullCalendarComponent() {
  const [availableAppointments, setAvailableAppointments] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const appointmentDuration = 30; // Appointment duration in minutes
  const clinicId = "clinicId"; // Replace with dynamic clinic ID
  const patientId = "patientId"; // Replace with dynamic patient ID

  useEffect(() => {
    const loadAvailableAppointments = async () => {
      try {
        const appointmentsData = await fetchAvailableAppointments(clinicId);
        setAvailableAppointments(appointmentsData);
      } catch (error) {
        console.error("Error fetching available appointments:", error);
      }
    };

    loadAvailableAppointments();
  }, [clinicId]);

  const handleDateClick = (info) => {
    setSelectedSlot(info.date); // Store the clicked date
    setIsModalOpen(true); // Open modal on date click
  };

  const confirmBooking = async () => {
    try {
      await bookAppointment({
        clinicId: clinicId,
        patientId: patientId,
        startTime: selectedSlot, // Using the Date object directly
        endTime: new Date(selectedSlot.getTime() + appointmentDuration * 60000), // Flexible duration
      });
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
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          events={availableAppointments.map((appointment) => ({
            title: "Available",
            start: appointment.StartTime,
            end: appointment.EndTime,
            backgroundColor: "#28a745",
            borderColor: "#28a745",
            textColor: "#fff",
          }))}
          dateClick={handleDateClick}
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
