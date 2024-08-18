import React from "react";
import LogOut from "../components/LogOut";
import AppointmentHistory from "../components/AppointmentHistory";
import FullCalendarComponent from "../components/FullCalendarComponent"; // Import the FullCalendar component

function PatientDashboard() {
  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-4">
      <LogOut />
      <h1 className="text-3xl font-bold mb-6">Book an Appointment</h1>

      {/* Use the FullCalendar component here */}
      <FullCalendarComponent />

      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md mt-8">
        <AppointmentHistory />
      </div>
    </div>
  );
}

export default PatientDashboard;
