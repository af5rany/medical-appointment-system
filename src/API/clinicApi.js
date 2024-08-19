import db from "../airtableConfig";

export const fetchUserById = async (userId) => {
  try {
    const userRecord = await db.table("Users").find(userId);
    return userRecord.fields;
  } catch (error) {
    console.error(`Error fetching user with ID ${userId}:`, error);
    return null;
  }
};

export const fetchApprovedAppointments = async (clinicId) => {
  try {
    const records = await db
      .table("Appointments")
      .select({
        filterByFormula: `AND({ClinicId} = "${clinicId}", {Status} = "Approved")`,
        // expand: ["PatientId"],
      })
      .all();

    const appointmentsWithPatientInfo = await Promise.all(
      records.map(async (record) => {
        const { fields } = record;
        const patientId = fields.PatientId?.[0];

        if (patientId) {
          const patientInfo = await fetchUserById(patientId);
          return { ...fields, patientInfo };
        } else {
          return { ...fields, patientInfo: null };
        }
      })
    );

    return appointmentsWithPatientInfo;
  } catch (error) {
    console.error("Error fetching approved appointments:", error);
    throw new Error("Failed to fetch approved appointments.");
  }
};

export const fetchAppointmentRequests = async (clinicId) => {
  try {
    const records = await db
      .table("Appointments")
      .select({
        filterByFormula: `AND({ClinicId} = '${clinicId}', {Status} = 'Requested')`,
        // expand: ["PatientId"],
      })
      .all();

    const requestsWithPatientInfo = await Promise.all(
      records.map(async (record) => {
        console.log("clinicrecord", record);
        const { fields } = record;

        const patientId = fields.PatientId?.[0];

        if (patientId) {
          const patientInfo = await fetchUserById(patientId);
          return { ...fields, patientInfo };
        } else {
          return { ...fields, patientInfo: null };
        }
      })
    );

    return requestsWithPatientInfo;
  } catch (error) {
    console.error("Error fetching appointment requests:", error);
    throw new Error("Failed to fetch appointment requests.");
  }
};

export const approveAppointmentRequest = async (appointmentId) => {
  try {
    await db.table("Appointments").update(appointmentId, {
      Status: "Approved",
    });
  } catch (error) {
    console.error("Error approving request:", error);
    throw new Error("Failed to approve the request.");
  }
};

export const declineAppointmentRequest = async (appointmentId) => {
  try {
    await db.table("Appointments").update(appointmentId, {
      Status: "Canceled",
    });
  } catch (error) {
    console.error("Error declining request:", error);
    throw new Error("Failed to decline the request.");
  }
};
