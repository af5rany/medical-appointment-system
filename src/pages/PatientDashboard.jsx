import React, { useEffect, useState } from "react";
import LogOut from "../components/LogOut";
import AppointmentHistory from "../components/AppointmentHistory";
import FullCalendarComponent from "../components/FullCalendarComponent";
import { fetchClinicsFromAirtable } from "../API/patientApi";
import { useAuth } from "../contexts/AuthContext";

function PatientDashboard() {
  const [clinics, setClinics] = useState([]);
  const { clinicId, setClinicId } = useAuth();

  useEffect(() => {
    const loadClinics = async () => {
      const clinicsData = await fetchClinicsFromAirtable();
      setClinics(clinicsData);
    };

    loadClinics();
  }, []);

  const handleClinicSelect = (event) => {
    setClinicId(event.target.value);
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-4">
      <LogOut />
      <h1 className="text-3xl font-bold mb-6">Book an Appointment</h1>

      <div className="mb-6">
        <label className="block text-lg font-medium text-gray-700 mb-2">
          Select a Clinic:
        </label>
        <select
          value={clinicId || ""}
          onChange={handleClinicSelect}
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
        >
          <option value="" disabled>
            Select a clinic
          </option>
          {clinics.map((clinic) => (
            <option key={clinic.id} value={clinic.id}>
              {clinic.name}
            </option>
          ))}
        </select>
      </div>

      {clinicId && (
        <>
          <FullCalendarComponent clinicId={clinicId} />

          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-7xl mt-8">
            <AppointmentHistory clinicId={clinicId} />
          </div>
        </>
      )}
    </div>
  );
}

export default PatientDashboard;
