import React, { useState } from "react"; 
import { useNavigate, Link } from "react-router-dom"; 
import { AiFillApi, AiOutlineSwap } from "react-icons/ai"; 
import { BsShieldLockFill } from "react-icons/bs"; 
import AdminDashboard from "./admindashboard"; 
import video from './Assets/video.mp4'; 
import pic from './Assets/pic.png';
import Signup from "./signup";

const Login = () => { 
  const [loggedInUser, setLoggedInUser] = useState(null);

  const handleLoginSuccess = (user) => {
    setLoggedInUser(user);
  };

  return (
    <>
      {!loggedInUser ? (
        <LoginForm onLoginSuccess={handleLoginSuccess} />
      ) : (
        <AdminDashboard user={loggedInUser} /> 
      )}
    </>
  );
};

const LoginForm = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState(""); 
  const [error, setError] = useState(""); 

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:1235/users/getUsers");

      if (!response.ok) {
        throw new Error("Failed to fetch data from the server.");
      }

      const users = await response.json();

      const matchedUser = users.find(
        (user) => user.email === email && user.password === password
      );

      if (matchedUser) {
        onLoginSuccess(matchedUser);
      } else {
        setError("Invalid email or password.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("An error occurred while logging in. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="flex w-[90%] max-w-[1200px] h-[80%] bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="flex-1 relative">
          <video
            src={video}
            autoPlay
            muted
            loop
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-1/4 left-10 text-white drop-shadow-lg">
            <h2 className="text-4xl font-bold">Log in to my account</h2>
            <p className="text-lg mt-2">Peace of nature</p>
          </div>
          <div className="absolute bottom-10 left-10 flex items-center gap-4">
            <span className="text-white text-sm">Don't have an account?</span>
            <Link to="/signup">
              <button className="bg-[#00df9a] text-white py-2 px-4 rounded-md bg-[#00df9a] transition">
                Sign Up
              </button>
            </Link>
          </div>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center p-8">
          <div className="text-center mb-6">
            <img src={pic} alt="Logo" className="w-24 h-auto mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-gray-800">Welcome back!</h3>
          </div>
          <form
            onSubmit={handleLogin}
            className="w-full max-w-sm grid gap-6"
          >
            {error && (
              <span className="text-red-600 text-center">{error}</span>
            )}
            <div>
              <label htmlFor="email" className="block text-gray-700 mb-1">
                Email
              </label>
              <div className="flex items-center border border-gray-300 rounded-md bg-gray-50 px-3 py-2">
                <AiFillApi className="text-gray-500 mr-2" />
                <input
                  type="email"
                  id="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-transparent focus:outline-none"
                />
              </div>
            </div>
            <div>
              <label htmlFor="password" className="block text-gray-700 mb-1">
                Password
              </label>
              <div className="flex items-center border border-gray-300 rounded-md bg-gray-50 px-3 py-2">
                <BsShieldLockFill className="text-gray-500 mr-2" />
                <input
                  type="password"
                  id="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="flex-1 bg-transparent focus:outline-none"
                />
              </div>
            </div>
            <button
              type="submit"
              className="flex items-center justify-center gap-2 bg-[#00df9a] text-white py-2 px-4 rounded-md hover:bg-blue-800 transition"
            >
              <span>Login</span>
              <AiOutlineSwap />
            </button>
            <span className="text-center text-sm text-gray-600">
              Forgot your password?{" "}
              <Link to="/forgot-password" className="text-blue-600 hover:underline">
                Click here
              </Link>
            </span>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
