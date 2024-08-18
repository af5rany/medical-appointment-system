import React, { useState, useEffect } from "react";
import db from "../airtableConfig";

function AvailableAppointments({ clinicId }) {
  const [availableSlots, setAvailableSlots] = useState([]);

  useEffect(() => {
    const fetchAvailableSlots = async () => {
      try {
        const records = await db
          .table("Availability")
          .select({
            filterByFormula: `AND({ClinicId} = "${clinicId}")`,
          })
          .all();

        setAvailableSlots(records.map((record) => record.fields));
      } catch (error) {
        console.error("Error fetching available slots:", error);
      }
    };

    fetchAvailableSlots();
  }, [clinicId]);

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">
        Available Appointments
      </h2>
      <ul>
        {availableSlots.map((slot, index) => (
          <li
            key={index}
            className="border-b border-gray-200 py-4 flex justify-between items-center"
          >
            <div>
              <span className="text-lg font-medium text-gray-600">
                {slot.Date} - {slot.StartTime} to {slot.EndTime}
              </span>
            </div>
            <button className="bg-green-500 hover:bg-green-600 text-white font-medium px-4 py-2 rounded transition">
              Book Appointment
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AvailableAppointments;
