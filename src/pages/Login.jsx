import React, { useState, useEffect } from "react";
import { doc, setDoc } from "firebase/firestore";
import { signInWithPopup } from "firebase/auth";
import { auth, provider, db } from "../firebaseConfig";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function Login() {
  const { user, setUser } = useAuth();
  const [role, setRole] = useState("patient");
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (user) {
  //     navigate(user.role === "clinic" ? "/clinic" : "/patient");
  //   }
  // }, [user, navigate]);

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const handleSignIn = async () => {
    try {
      const { user } = await signInWithPopup(auth, provider);
      const token = await user.getIdToken();
      Cookies.set("authToken", token, {
        expires: 7,
        secure: true,
        sameSite: "strict",
      });

      const userData = {
        uid: user.uid,
        name: user.displayName,
        email: user.email,
        profilePicture: user.photoURL,
        role: role,
        createdAt: new Date(),
      };

      await setDoc(doc(db, "users", user.uid), userData);

      setUser(userData);

      navigate(role === "clinic" ? "/clinic" : "/patient");
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Select your role:
          </label>
          <select
            value={role}
            onChange={handleRoleChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          >
            <option value="patient">Patient</option>
            <option value="clinic">Clinic</option>
          </select>
        </div>
        <button
          onClick={handleSignIn}
          className="w-full bg-blue-500 text-white py-2 rounded-lg font-medium hover:bg-blue-600 transition duration-200"
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
}

export default Login;
