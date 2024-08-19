import React, { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { auth } from "../firebaseConfig";
import { onAuthStateChanged, getIdTokenResult } from "firebase/auth";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = Cookies.get("authToken");
    if (token) {
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (user) {
          const tokenResult = await getIdTokenResult(user);

          setUser({
            ...user,
            role: tokenResult.claims.role || "patient",
          });
        } else {
          setUser(null);
          Cookies.remove("authToken");
        }
        setLoading(false);
      });

      return () => unsubscribe();
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
