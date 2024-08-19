import React from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebaseConfig";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function Login() {
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleSignIn = async () => {
    try {
      const { user } = await signInWithPopup(auth, provider);

      // The token is set in the cookie, so the AuthProvider can handle the rest
      const token = await user.getIdToken();
      Cookies.set("authToken", token, {
        expires: 7,
        secure: true,
        sameSite: "strict",
      });

      // The onAuthStateChanged listener in the AuthProvider will handle the rest
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
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
