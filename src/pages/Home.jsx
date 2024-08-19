// import React from "react";
// import { useAuth } from "../contexts/AuthContext";
// import { auth } from "../firebaseConfig";
// import { signOut } from "firebase/auth";
// import Cookies from "js-cookie";

// function Home() {
//   const { user, setUser } = useAuth();

//   function handleLogout() {
//     signOut(auth)
//       .then(() => {
//         Cookies.remove("authToken");
//         setUser(null);
//       })
//       .catch((error) => {
//         console.error("Error signing out:", error);
//       });
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md text-center">
//         {user ? (
//           <>
//             <p className="text-xl font-semibold mb-4">
//               Welcome, {user.displayName}
//             </p>
//             <button
//               onClick={handleLogout}
//               className="w-full bg-red-500 text-white py-2 rounded-lg font-medium hover:bg-red-600 transition duration-200"
//             >
//               Logout
//             </button>
//           </>
//         ) : (
//           <p className="text-lg">You are not logged in.</p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Home;
