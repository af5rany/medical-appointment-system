import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { updateRoleInAirtable } from "../API/userAPI";
import { useNavigate } from "react-router-dom";

function RoleSelection() {
  const [role, setRole] = useState("Patient");
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const handleConfirmRole = async () => {
    try {
      await updateRoleInAirtable(user.uid, role);

      setUser({ ...user, role });

      navigate(role === "clinic" ? "/clinic" : "/patient");
    } catch (error) {
      console.error("Error updating role in Airtable:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Select Your Role
        </h2>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Select your role:
          </label>
          <select
            value={role}
            onChange={handleRoleChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          >
            <option value="Patient">Patient</option>
            <option value="Clinic">Clinic</option>
          </select>
        </div>
        <button
          onClick={handleConfirmRole}
          className="w-full bg-blue-500 text-white py-2 rounded-lg font-medium hover:bg-blue-600 transition duration-200"
        >
          Confirm Role
        </button>
      </div>
    </div>
  );
}

export default RoleSelection;
