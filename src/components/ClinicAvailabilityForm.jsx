import React, { useState } from "react";
import db from "../airtableConfig"; // Replace with your Airtable configuration

function ClinicAvailabilityForm({ clinicId }) {
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [recurring, setRecurring] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await db.table("Availability").create({
        fields: {
          ClinicId: clinicId,
          Date: date,
          StartTime: startTime,
          EndTime: endTime,
          Recurring: recurring ? "Yes" : "No",
        },
      });

      alert("Availability added successfully!");
      setDate("");
      setStartTime("");
      setEndTime("");
      setRecurring(false);
    } catch (error) {
      console.error("Error adding availability:", error);
      alert("There was an issue adding availability. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-4">
      <h2 className="text-xl font-bold mb-4">Set Availability</h2>
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">
          Start Time
        </label>
        <input
          type="time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">End Time</label>
        <input
          type="time"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">
          Recurring
        </label>
        <input
          type="checkbox"
          checked={recurring}
          onChange={(e) => setRecurring(e.target.checked)}
        />{" "}
        Yes
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded-lg font-medium hover:bg-blue-600 transition duration-200"
      >
        Save Availability
      </button>
    </form>
  );
}

export default ClinicAvailabilityForm;
