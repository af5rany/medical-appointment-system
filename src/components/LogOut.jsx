import React from "react";
import { signOut } from "firebase/auth";
import { useAuth } from "../contexts/AuthContext";
import Cookies from "js-cookie";
import { auth } from "../firebaseConfig";

function LogOut() {
  const { setUser, setClinicId } = useAuth();

  async function handleLogout() {
    try {
      await signOut(auth);
      Cookies.remove("authToken");
      setUser(null);
      setClinicId(null);
      console.log("Successfully signed out");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  }

  return (
    <div>
      <button
        onClick={handleLogout}
        className="w-full bg-red-500 text-white py-2 rounded-lg font-medium hover:bg-red-600 transition duration-200"
      >
        Logout
      </button>
    </div>
  );
}

export default LogOut;
