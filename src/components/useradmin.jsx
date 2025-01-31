import React, { useState } from "react";
import Login from "./Login";
import AdminDashboard from "./admindashboard";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Useradmin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null); // Store user details after login

  const handleLoginSuccess = (loggedInUser) => {
    setUser(loggedInUser);
    setIsAuthenticated(true);
  };

  if (!isAuthenticated) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="bg-gray-600 min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="flex-grow p-8">
        <h1 className="text-4xl font-bold mb-6 text-white">Admin Dashboard</h1>
        <AdminDashboard user={user} />
      </div>

      {/* Footer */}
      <Footer className="bg-black text-white" />
    </div>
  );
};

export default Useradmin;
