import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import Home from "./pages/Home";
import PatientDashboard from "./pages/PatientDashboard";
import ClinicDashboard from "./pages/ClinicDashboard";
import Login from "./pages/Login";
// import AboutUs from "./pages/AboutUs"; // Example non-protected route

// function ProtectedRoute({ element: Component, allowedRoles, ...rest }) {
//   const { user } = useAuth();

//   if (!user) {
//     // If no user, redirect to login
//     return <Navigate to="/login" />;
//   }

//   if (allowedRoles && !allowedRoles.includes(user.role)) {
//     // If the user doesn't have the correct role, redirect to their dashboard
//     return <Navigate to={user.role === "clinic" ? "/clinic" : "/patient"} />;
//   }

//   // If the user is authenticated and has the correct role, render the component
//   return <Component {...rest} />;
// }

// function DefaultRoute() {
//   const { user } = useAuth();

//   if (!user) {
//     return <Navigate to="/login" />;
//   }

//   return <Navigate to={user.role === "clinic" ? "/clinic" : "/patientd"} />;
// }

function App() {
  const { user } = useAuth();

  return (
    <div>
      <ClinicDashboard />
      {/* <PatientDashboard /> */}
    </div>
    // <Router>
    //   <Routes>
    //     {/* Default route - Redirect based on role */}
    //     {/* <Route path="/" element={<DefaultRoute />} /> */}

    //     {/* Prevent access to Login if already authenticated */}
    //     <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />

    //     {/* Protected Routes for Patient and Clinic Dashboards */}
    //     <Route
    //       path="/patient"
    //       element={
    //         <ProtectedRoute
    //           element={PatientDashboard}
    //           allowedRoles={["patient"]}
    //         />
    //       }
    //     />
    //     <Route
    //       path="/clinic"
    //       element={
    //         <ProtectedRoute
    //           element={ClinicDashboard}
    //           allowedRoles={["clinic"]}
    //         />
    //       }
    //     />

    //     {/* Non-Protected Routes */}
    //     {/* <Route path="/aboutus" element={<AboutUs />} /> */}

    //     {/* Fallback route for unknown paths */}
    //     <Route path="*" element={<Navigate to="/" />} />
    //   </Routes>
    // </Router>
  );
}

export default App;
