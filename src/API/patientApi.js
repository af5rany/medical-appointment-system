import db from "../airtableConfig";

// Fetch available appointments for a specific clinic
export const fetchAvailableAppointments = async (clinicId) => {
  try {
    const records = await db
      .table("Appointments")
      .select({
        filterByFormula: `AND({ClinicId} = "${clinicId}", {Status} = "Available")`, // Filter by clinic and status
      })
      .all();
    return records.map((record) => record.fields);
  } catch (error) {
    console.error("Error fetching available appointments:", error);
    throw new Error("Failed to fetch available appointments.");
  }
};

// Book an appointment by creating a new appointment record
export const bookAppointment = async ({
  clinicId,
  patientId,
  startTime,
  endTime,
}) => {
  try {
    const newRecord = await db.table("Appointments").create({
      fields: {
        ClinicId: clinicId,
        PatientId: [patientId], // Airtable requires this to be an array of linked records
        StartTime: startTime.toISOString(), // Ensure correct date format
        EndTime: endTime.toISOString(), // Ensure correct date format
        Status: "Booked", // Update the status to booked
      },
    });
    return newRecord.fields;
  } catch (error) {
    console.error("Error booking appointment:", error);
    throw new Error("Failed to book appointment.");
  }
};
