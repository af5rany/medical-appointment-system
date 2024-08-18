import React, { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { auth } from "../firebaseConfig";
import { onAuthStateChanged, getIdTokenResult } from "firebase/auth";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // To handle the initial loading state

  useEffect(() => {
    const token = Cookies.get("authToken");
    if (token) {
      // Listen for auth state changes
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (user) {
          // Get the ID token result to retrieve custom claims like role
          const tokenResult = await getIdTokenResult(user);

          // Set the user state with additional role information
          setUser({
            ...user,
            role: tokenResult.claims.role || "patient", // default to "patient" if no role is set
          });
        } else {
          // If no user, clear the user state
          setUser(null);
          Cookies.remove("authToken");
        }
        setLoading(false); // End the loading state
      });

      return () => unsubscribe(); // Cleanup subscription on unmount
    } else {
      setLoading(false); // No token found, end loading state
    }
  }, []);

  if (loading) {
    // Optionally, return a loading spinner or similar UI here
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
