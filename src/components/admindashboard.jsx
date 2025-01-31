import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./Accountsection/sidebar";
import pic2 from "./Assets/pic2.png";
import { TiMessages } from "react-icons/ti";
import { IoIosContact } from "react-icons/io";
import { IoLogoSlack } from "react-icons/io5";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas"; // Import html2canvas

function AdminDashboard({ user }) {
  const [formData, setFormData] = useState(user || {});
  const [subscription, setSubscription] = useState(null); // Subscription details
  const [isLoading, setIsLoading] = useState(false); // To handle loading state
  const [message, setMessage] = useState(""); // To display success/error messages
  const [feedbackText, setFeedbackText] = useState("");
  const [feedbackMessage, setFeedbackMessage] = useState(""); // Feedback response message

  useEffect(() => {
    // Fetch subscription details when the component loads
    const fetchSubscription = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:1235/subscription/getUser?user_id=${user.id}` // Include user_id as a query parameter
        );

        setSubscription(response.data); // Assuming response contains subscription details
      } catch (error) {
        console.error("Error fetching subscription:", error);
        setSubscription({ error: "Failed to load subscription details." });
      } finally {
        setIsLoading(false);
      }
    };

    if (user?.id) {
      fetchSubscription();
    }
  }, [user?.id]);

  const handleFeedbackSubmit = async () => {
    if (!feedbackText.trim()) {
      setFeedbackMessage("Feedback cannot be empty");
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post("http://localhost:1235/feedback/add", {
        user_id: user.id, // Assuming user.id is available
        feedback_text: feedbackText,
      });
      setFeedbackMessage(response.data.message || "Feedback submitted successfully");
      setFeedbackText(""); // Clear the input field
    } catch (error) {
      setFeedbackMessage(error.response?.data?.message || "Failed to submit feedback");
    } finally {
      setIsLoading(false);
    }
  };

  const downloadCardAsPDF = async () => {
    const cardElement = document.getElementById("user-card"); // Target the card element
    if (!cardElement) return;

    const canvas = await html2canvas(cardElement, { scale: 2 }); // Capture the element as a canvas
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF();
    const imgWidth = 190; // Adjust image width to fit in the PDF
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight); // Add the captured image to PDF
    pdf.save("UserCard.pdf"); // Save the PDF
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white h-screen">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-grow p-6 bg-black">
        {/* Welcome Section */}
        <div className="relative w-full h-64">
          <img
            src={pic2}
            alt="Background"
            className="w-full h-full object-cover rounded-lg"
          />
          <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center bg-black bg-opacity-50 text-white">
            <IoIosContact className="absolute top-4 right-4 text-3xl cursor-pointer" />
            <h3 className="text-3xl font-bold mb-2">My account</h3>
            <h4 className="text-xl text-green-400">
              Hello {user.fullnames}, welcome back!
            </h4>
          </div>
        </div>

        {/* Subscriptions Section */}
        <div className="mt-8 p-6 bg-white rounded-lg shadow">
          <h3 className="text-2xl font-bold mb-4 text-gray-800">
            My Subscriptions
          </h3>
          {isLoading ? (
            <p className="text-gray-600">Loading subscription details...</p>
          ) : subscription?.error ? (
            <p className="text-red-500">{subscription.error}</p>
          ) : (
            <div>
              <p className="text-lg font-semibold text-gray-600">
                Package: {subscription?.name || "N/A"}
              </p>
              <p>days: {subscription?.timespan || "N/A"}</p>
            </div>
          )}
        </div>

        {/* Card and Feedback Section */}
        <div className="mt-8 flex gap-6">
          {/* Card Section */}
          <div
            id="user-card" // Add ID to target this element for PDF generation
            className="flex-1 border rounded-lg p-4 shadow hover:shadow-lg bg-slate-500 flex flex-col items-center justify-between h-64"
          >
            {/* Centered Icon */}
            <div className="flex items-center justify-center flex-grow">
              <IoLogoSlack className="text-7xl" />
            </div>

            {/* User Details */}
            <div className="text-center">
              <p className="mb-2">{user?.fullnames || "N/A"}</p>
              <p className="mb-4">
                <strong></strong> {user.id}
              </p>
            </div>

            {/* Download Button at the Bottom */}
            <button
              onClick={downloadCardAsPDF}
              className="px-4 py-2 text-sm text-white bg-green-700 rounded hover:bg-green-600 w-full"
            >
              Download
            </button>
          </div>

          {/* Feedback Section */}
          <div className="flex-1 border rounded-lg p-4 shadow hover:shadow-lg bg-white">
            <h3 className="text-xl font-bold mb-2 text-gray-800">Send Feedback</h3>
            <textarea
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
              placeholder="Write your feedback here..."
              className="w-full p-2 border rounded-lg mb-4"
            ></textarea>
            <button
              onClick={handleFeedbackSubmit}
              className="px-4 py-2 text-sm text-white bg-blue-500 rounded hover:bg-blue-600"
              disabled={isLoading}
            >
              {isLoading ? "Submitting..." : "Submit Feedback"}
            </button>
            {feedbackMessage && (
              <p
                className={`mt-4 text-sm ${
                  feedbackMessage.includes("Failed") ? "text-red-500" : "text-green-500"
                }`}
              >
                {feedbackMessage}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
