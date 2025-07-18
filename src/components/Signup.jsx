import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";
import { createUserWithEmailAndPassword,onAuthStateChanged } from "firebase/auth";
import Loading from "./common/Loading";
import Navbar from "./common/Navbar";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading,setloading]=useState(false)
  const navigate = useNavigate(); // Hook from React Router for navigation

  const checkuserlogin = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("user Already logged in");
        navigate("/");
      } else {
        console.log("User logged out");
      }
    });
  };

  useEffect(()=>{
    checkuserlogin()
  },[]);

  const handleSubmit = async (e) => {
    setloading(true)
    e.preventDefault();

    // Check if the passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    } else {
      try {
        const user = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        console.log("Account created successfully", user);
        alert("Account Created successfully!")
        setloading(false)
        navigate("/login");
      } catch (err) {
        console.log("Failed to Create", err);
      }
    }

    // Simulate user registration process
    console.log("User registered:", { email, password });
    // After registration, redirect to the login page
    // Replace '/login' with your login page route
  };

  return (
    <>
    {loading?<Loading/>:(<> <Navbar/>
    <div className="flex justify-center items-center  px-5  py-5 md:p-10   bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="p-5 md:p-10  w-full md:w-2/5 bg-white rounded-lg shadow-lg"
        style={{  }}
      >
        <h2 className="text-2xl font-bold mb-5 text-gray-800">Sign In</h2>
        <div className="mb-4">
          <label className="block text-gray-700">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 p-2 w-full border rounded-sm"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1 p-2 w-full border rounded-sm"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Confirm Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="mt-1 p-2 w-full border rounded-sm"
          />
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>
        <p
          className="text-blue-600 cursor-pointer my-2"
          onClick={() => navigate("/login")}
        >
          {" "}
          Already have an account? Login here
        </p>
        <button
          type="submit"
          className="bg-orange-400 text-white py-2 px-4 rounded-sm hover:bg-orange-600 transition duration-200 ease-in-out"
        >
          Register
        </button>
      </form>
    </div> </>)}
    
    </>
  );
}

export default Signup;
