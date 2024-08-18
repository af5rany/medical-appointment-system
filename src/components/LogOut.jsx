import React from "react";

function LogOut() {
  function handleLogout() {
    signOut(auth)
      .then(() => {
        Cookies.remove("authToken");
        setUser(null);
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  }

  return (
    <div>
      {" "}
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
