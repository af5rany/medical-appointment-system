import db from "../airtableConfig";

// Fetch all appointments for a clinic
export const fetchAppointments = async (clinicId) => {
  try {
    const records = await db
      .table("Appointments")
      .select({
        filterByFormula: `AND({ClinicId} = "${clinicId}")`,
      })
      .all();
    return records.map((record) => {
      const fields = record.fields;
      return {
        AppointmentId: record.id,
        Date: fields.Date,
        StartTime: fields.StartTime,
        EndTime: fields.EndTime,
        PatientName: fields.PatientId ? fields.PatientId[0] : "",
        Status: fields.Status,
      };
    });
  } catch (error) {
    console.error("Error fetching appointments:", error);
    throw new Error("Failed to fetch appointments.");
  }
};

// Fetch pending appointment requests for a clinic
export const fetchAppointmentRequests = async (clinicId) => {
  try {
    const records = await db
      .table("AppointmentRequests")
      .select({
        filterByFormula: `AND({ClinicId} = "${clinicId}", {Status} = "Pending")`,
      })
      .all();
    return records.map((record) => record.fields);
  } catch (error) {
    console.error("Error fetching appointment requests:", error);
    throw new Error("Failed to fetch appointment requests.");
  }
};

// Approve an appointment request
export const approveAppointmentRequest = async (recordId) => {
  try {
    console.log("recordId", recordId);

    await db.table("AppointmentRequests").update(recordId, {
      Status: "Approved",
    });
  } catch (error) {
    console.error("Error approving request:", error);
    throw new Error("Failed to approve the request.");
  }
};

// Decline an appointment request
export const declineAppointmentRequest = async (recordId) => {
  try {
    await db.table("AppointmentRequests").update(recordId, {
      Status: "Declined",
    });
  } catch (error) {
    console.error("Error declining request:", error);
    throw new Error("Failed to decline the request.");
  }
};
