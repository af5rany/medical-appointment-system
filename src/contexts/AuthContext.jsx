import React, { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { auth } from "../firebaseConfig";
import { onAuthStateChanged, getIdTokenResult } from "firebase/auth";
import { fetchUserFromAirtable, saveUserToAirtable } from "../API/userAPI";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [clinicId, setClinicId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = Cookies.get("authToken");
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const tokenResult = await getIdTokenResult(firebaseUser);
          let airtableUser = await fetchUserFromAirtable(firebaseUser.uid);

          if (!airtableUser.exists) {
            // If the user doesn't exist in Airtable, create a new record
            await saveUserToAirtable(firebaseUser);
            airtableUser = await fetchUserFromAirtable(firebaseUser.uid);
          }

          if (airtableUser.exists) {
            setUser({
              ...airtableUser.userData,
              uid: firebaseUser.uid,
              role: airtableUser.userData.role || "Patient",
            });
            setClinicId(
              airtableUser.userData.role === "Clinic"
                ? airtableUser.userData.userId
                : null
            );
          } else {
            console.error("User not found in Airtable");
            setUser(null);
            Cookies.remove("authToken"); // Clear cookie if user not found
          }
        } catch (error) {
          console.error("Error fetching user data from Airtable:", error);
          setUser(null);
          Cookies.remove("authToken");
        }
      } else {
        setUser(null);
        setClinicId(null);
        Cookies.remove("authToken");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ user, setUser, clinicId, setClinicId }}>
      {children}
    </AuthContext.Provider>
  );
};
