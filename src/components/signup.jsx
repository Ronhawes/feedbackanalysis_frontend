import React, { useState } from "react";
import { AiFillApi } from "react-icons/ai";
import { BsShieldLockFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import video from "./Assets/video.mp4";

const Signup = () => {
  const [showForm, setShowForm] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullnames: "",
  });
  const [result, setResult] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending...");
    setIsSubmitting(true);

    try {
      const apiUrl = "http://localhost:1235/users/add";
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setResult("Registration successful! Now you can log in.");
        setFormData({ email: "", password: "", fullnames: "" });
        setTimeout(() => setShowForm(false), 2000); // Optional: Close form on success
      } else {
        setResult(`Error: ${data.message || "Something went wrong."}`);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setResult("Error submitting form. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="flex w-[90%] max-w-[1000px] h-[80%] bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Left side with video */}
        <div className="flex-1 relative w-[50%]">
          <video
            src={video}
            autoPlay
            muted
            loop
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-1/4 left-10 text-white drop-shadow-lg">
            <h2 className="text-4xl font-bold">Sign up Today</h2>
            <p className="text-lg mt-2">Experience the best</p>
          </div>
          <div className="absolute bottom-10 left-10 flex items-center gap-4">
                      <span className="text-white text-sm">I have an account?</span>
                      <Link to="/login">
                        <button className="bg-[#00df9a] text-white py-2 px-4 rounded-md bg-[#00df9a] transition">
                          Log in
                        </button>
                      </Link>
                    </div>
        </div>

        {/* Right side with form */}
        <div className="flex-1 flex flex-col items-center justify-center p-8 w-[50%]">
          {showForm ? (
            <form onSubmit={onSubmit} className="w-full max-w-sm grid gap-6">
              <h3>Create your account</h3>
              <div>
                <label htmlFor="email" className="block text-gray-700 mb-1">
                  Email
                </label>
                <div className="flex items-center border border-gray-300 rounded-md bg-gray-50 px-3 py-2">
                  <AiFillApi className="text-gray-500 mr-2" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    className="flex-1 bg-transparent focus:outline-none"
                    required
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
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    className="flex-1 bg-transparent focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="fullnames" className="block text-gray-700 mb-1">
                  Full Names
                </label>
                <input
                  type="text"
                  id="fullnames"
                  name="fullnames"
                  placeholder="Enter your full names"
                  value={formData.fullnames}
                  onChange={handleChange}
                  className="w-full bg-transparent border px-3 py-2 rounded-md"
                  required
                />
              </div>

              <button
                type="submit"
                className="flex items-center justify-center gap-2 bg-[#00df9a] text-white py-2 px-4 rounded-md hover:bg-blue-800 transition"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Sign Up"}
              </button>

              <p className="mt-4 text-center text-red-600">{result}</p>
            </form>
          ) : (
            <div className="text-center mt-4">
              <p className="text-lg">{result}</p>
              <Link
                to="/login"
                className="py-4 px-6 bg-slate-400 border bg-transparent text-white rounded-[10px] hover:text-blue-800 mt-4"
              >
                Login Now
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Signup;
