import db from "../airtableConfig";

export const saveUserToAirtable = async (user) => {
  try {
    // Check if the user exists
    const records = await db
      .table("Users")
      .select({
        filterByFormula: `{UserId} = "${user.uid}"`,
      })
      .firstPage();

    if (records.length > 0) {
      // User exists, update the record
      const userId = records[0].id;
      await db.table("Users").update(userId, {
        Name: user.displayName,
        Email: user.email,
        ProfilePicture: user.photoURL,
        Role: user.role ? [user.role] : [], // Use an array for multiple select
      });
    } else {
      // User does not exist, create a new record
      await db.table("Users").create([
        {
          fields: {
            UserId: user.uid,
            Name: user.displayName,
            Email: user.email,
            ProfilePicture: user.photoURL,
            // CreatedAt: new Date().toISOString(),
          },
        },
      ]);
    }
  } catch (error) {
    console.error("Error saving user to Airtable:", error);
    throw new Error("Failed to save user to Airtable.");
  }
};

export const fetchUserFromAirtable = async (uid) => {
  try {
    const records = await db
      .table("Users")
      .select({
        filterByFormula: `{UserId} = "${uid}"`,
        maxRecords: 1,
      })
      .firstPage();

    if (records.length > 0) {
      // User exists, return all their data
      const user = records[0].fields;
      return {
        exists: true,
        userData: {
          id: records[0].id,
          userId: user.UserId,
          name: user.Name,
          email: user.Email,
          role: user.Role ? user.Role[0] : null,
          profilePicture: user.ProfilePicture,
          createdAt: user.CreatedAt,
          appointments: user.Appointments || [],
        },
      };
    } else {
      // User does not exist
      return { exists: false, userData: null };
    }
  } catch (error) {
    console.error(`Error fetching user with ID ${uid}:`, error);
    return { exists: false, userData: null };
  }
};

export const updateRoleInAirtable = async (uid, role) => {
  try {
    const records = await db
      .table("Users")
      .select({
        filterByFormula: `{UserId} = "${uid}"`,
      })
      .firstPage();

    if (records.length > 0) {
      // User exists, update the role
      const recordId = records[0].id;
      await db.table("Users").update(recordId, {
        Role: [role],
      });
    } else {
      throw new Error("User not found in Airtable.");
    }
  } catch (error) {
    console.error("Error updating role in Airtable:", error);
    throw error;
  }
};
