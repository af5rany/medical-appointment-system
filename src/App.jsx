import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import Login from "./pages/Login";
import RoleSelection from "./pages/RoleSelection";
import PatientDashboard from "./pages/PatientDashboard";
import ClinicDashboard from "./pages/ClinicDashboard";

function App() {
  const { user } = useAuth();
  console.log("user", user);
  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/role-selection"
          element={user ? <RoleSelection /> : <Navigate to="/login" />}
        />

        <Route
          path="/patient"
          element={
            user && user.role === "Patient" ? (
              <PatientDashboard />
            ) : (
              <Navigate
                to={
                  user
                    ? user.role === "Patient"
                      ? "/patient"
                      : "/clinic"
                    : "/login"
                }
              />
            )
          }
        />

        {/* Clinic routes */}
        <Route
          path="/clinic"
          element={
            user && user.role === "Clinic" ? (
              <ClinicDashboard />
            ) : (
              <Navigate
                to={
                  user
                    ? user.role === "Clinic"
                      ? "/clinic"
                      : "/patient"
                    : "/login"
                }
              />
            )
          }
        />

        {/* Default route based on user role */}
        <Route
          path="/"
          element={
            user ? (
              <Navigate to={user.role === "Clinic" ? "/clinic" : "/patient"} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* Redirect any unknown routes to the root */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
