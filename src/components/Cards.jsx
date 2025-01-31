import React, { useState, useEffect } from 'react';
import Single from '../assets/single.png';
import Double from '../assets/double.png';
import Triple from '../assets/triple.png';
import { Link } from 'react-router-dom';
import { IoIosCheckmark } from "react-icons/io";

const Cards = () => {
  const [packages, setPackages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = 'http://localhost:1235/packages/getAllPlayers';
        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw new Error('Failed to fetch packages');
        }

        const data = await response.json();
        setPackages(data);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-center text-red-500 py-10">
        Error: {error}
        <button
          onClick={() => window.location.reload()}
          className="block mt-4 mx-auto bg-blue-500 text-white py-2 px-4 rounded-md"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!packages.length) {
    return <div className="text-center py-10">No packages available at the moment.</div>;
  }

  return (
    <div className="w-full py-[10rem] px-4 bg-white">
      <h1 className="text-center text-3xl font-bold mb-8">Our Packages</h1> <br /> <br />
      <div className="max-w-[1240px] mx-auto grid md:grid-cols-3 gap-8">
        {packages.map((pkg, index) => (
          <div
            key={pkg.id || index}
            className="w-full shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300"
          >
            <img
              className="w-20 mx-auto mt-[-3rem] bg-white"
              src={[Single, Double, Triple][index % 3]}
              alt={`Package image for ${pkg.name}`}
            />
            <h2 className="text-2xl font-bold text-center py-8">{pkg.name}</h2>
            <p className="text-center text-4xl font-bold">${pkg.price}</p>
            <ul className="text-center">
              {pkg.user_request && (
                <li className="text-2xl flex items-center justify-center">
                  <IoIosCheckmark className="text-green-500" /> {pkg.user_request}
                </li>
              )}
              {pkg.design_acc && (
                <li className="text-2xl flex items-center justify-center">
                  <IoIosCheckmark className="text-green-500" /> {pkg.design_acc}
                </li>
              )}
              {pkg.support1 && (
                <li className="text-2xl flex items-center justify-center">
                  <IoIosCheckmark className="text-green-500" /> {pkg.support1}
                </li>
              )}
              {pkg.support2 && (
                <li className="text-2xl flex items-center justify-center">
                  <IoIosCheckmark className="text-green-500" /> {pkg.support2}
                </li>
              )}
            </ul>
            <Link
              to="/signup"
              className="py-4 px-8 bg-green-600 text-white text-center rounded-md hover:bg-green-800 mt-4 w-full"
            >
              Choose Plan
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cards;
