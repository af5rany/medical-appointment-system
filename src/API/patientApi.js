import db from "../airtableConfig";

export const fetchCompletedAppointments = async (patientId) => {
  try {
    const records = await db
      .table("Appointments")
      .select({
        filterByFormula: `AND({PatientId} = '${patientId}', {Status} = 'Completed')`,
      })
      .all();
    const appointments = await Promise.all(
      records.map(async (record) => {
        const { fields } = record;
        const patientId = fields.PatientId[0];

        const userRecord = await db.table("Users").find(patientId);
        const patientInfo = userRecord.fields;

        return { ...fields, patientInfo };
      })
    );

    return appointments;
  } catch (error) {
    console.error("Error fetching completed appointments:", error);
    throw new Error("Failed to fetch completed appointments.");
  }
};

export const fetchRequestedAppointments = async (clinicId) => {
  try {
    const records = await db
      .table("Appointments")
      .select({
        filterByFormula: `AND({ClinicId} = "${clinicId}", {Status} = "Requested")`,
        expand: ["PatientId"],
      })
      .all();

    const appointments = await Promise.all(
      records.map(async (record) => {
        const { fields } = record;
        const patientId = fields.PatientId[0];

        const userRecord = await db.table("Users").find(patientId);
        const userInfo = userRecord.fields;

        return { ...fields, userInfo };
      })
    );

    return appointments;
  } catch (error) {
    console.error("Error fetching requested appointments:", error);
    throw new Error("Failed to fetch requested appointments.");
  }
};

export const fetchAvailableAppointments = async (clinicId) => {
  try {
    const records = await db
      .table("Appointments")
      .select({
        filterByFormula: `AND({ClinicId} = "${clinicId}", {Status} = "Available")`,
      })
      .all();
    return records.map((record) => record.fields);
  } catch (error) {
    console.error("Error fetching available appointments:", error);
    throw new Error("Failed to fetch available appointments.");
  }
};

export const fetchApprovedAppointments = async (clinicId) => {
  try {
    const records = await db
      .table("Appointments")
      .select({
        filterByFormula: `AND({ClinicId} = "${clinicId}", {Status} = "Approved")`,
        expand: ["PatientId"],
      })
      .all();

    const appointments = await Promise.all(
      records.map(async (record) => {
        const { fields } = record;
        const patientId = fields.PatientId[0];

        const userRecord = await db.table("Users").find(patientId);
        const userInfo = userRecord.fields;

        return { ...fields, userInfo };
      })
    );

    return appointments;
  } catch (error) {
    console.error("Error fetching approved appointments:", error);
    throw new Error("Failed to fetch approved appointments.");
  }
};

export const bookAppointment = async ({
  clinicId,
  patientId,
  startTime,
  endTime,
}) => {
  try {
    const startTimeFormatted = startTime.toISOString().substr(11, 5);
    const endTimeFormatted = endTime.toISOString().substr(11, 5);

    const newRecord = await db.table("Appointments").create([
      {
        fields: {
          ClinicId: [clinicId],
          PatientId: [patientId],
          Date: startTime.toISOString().split("T")[0],
          StartTime: startTimeFormatted,
          EndTime: endTimeFormatted,
          Status: "Requested",
        },
      },
    ]);

    return newRecord[0].fields;
  } catch (error) {
    console.error("Error booking appointment:", error);
    throw new Error("Failed to book appointment.");
  }
};
