// AppointmentDetailsModal.js

import React from "react";
import Modal from "react-modal";

Modal.setAppElement("#root"); // Required for accessibility

function AppointmentDetailsModal({ isOpen, onRequestClose, appointment }) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Appointment Details"
      className="bg-white p-8 rounded-lg shadow-lg max-w-lg mx-auto"
    >
      {appointment && (
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Appointment Details
          </h2>
          <p className="mb-2">
            <strong className="text-gray-700">Date:</strong> {appointment.Date}
          </p>
          <p className="mb-2">
            <strong className="text-gray-700">Time:</strong> {appointment.Time}
          </p>
          <p className="mb-2">
            <strong className="text-gray-700">Patient Name:</strong>{" "}
            {appointment.PatientName}
          </p>
          <p className="mb-2">
            <strong className="text-gray-700">Reason:</strong>{" "}
            {appointment.Reason}
          </p>
          <button
            onClick={onRequestClose}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded mt-4 transition"
          >
            Close
          </button>
        </div>
      )}
    </Modal>
  );
}

export default AppointmentDetailsModal;
