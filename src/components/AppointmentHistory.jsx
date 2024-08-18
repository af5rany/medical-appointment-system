import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useAuth } from "../contexts/AuthContext";

function AppointmentHistory() {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      const q = query(
        collection(db, "appointments"),
        where("patientId", "==", user.uid)
      );
      const querySnapshot = await getDocs(q);
      const appointmentsData = querySnapshot.docs.map((doc) => doc.data());
      setAppointments(appointmentsData);
    };

    fetchAppointments();
  }, [user.uid]);

  return (
    <div>
      <h2>Your Appointment History</h2>
      <ul>
        {appointments.map((appointment, index) => (
          <li key={index}>
            {appointment.date} - {appointment.time} - {appointment.status}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AppointmentHistory;
