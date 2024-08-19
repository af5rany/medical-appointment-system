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

// function ProtectedRoute({ element: Component, allowedRoles, ...rest }) {
//   const { user } = useAuth();

//   if (!user) {
//     return <Navigate to="/login" />;
//   }

//   if (allowedRoles && !allowedRoles.includes(user.role)) {
//     return <Navigate to={user.role === "clinic" ? "/clinic" : "/patient"} />;
//   }

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
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>

      <ClinicDashboard />
      <PatientDashboard />
    </div>
    // <Router>
    // <Routes>
    //     {/* <Route path="/" element={<DefaultRoute />} /> */}

    //     <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />

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

    //     {/* <Route path="/aboutus" element={<AboutUs />} /> */}

    //     <Route path="*" element={<Navigate to="/" />} />
    //   </Routes>
    // </Router>
  );
}

export default App;
